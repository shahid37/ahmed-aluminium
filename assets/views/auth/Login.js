import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, mediumTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import ProcessingMoadl from '../reuseable/ProcessingModal'
import WebHandler from '../../data/remote/WebHandler'
import Prefmanager from '../../data/local/Prefmanager'
import Routes from '../../data/remote/Routes'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

const webHandler = new WebHandler()
const prefs = new Prefmanager()
const myUtils = new Utils()
class Login extends Component {

    constructor(props) {
        super()
        this.state = {
            email: "",
            password: "",

            isEmailError: false,
            isPassError: false,

            isPasswordHidden: true,

        }
    }

    render() {
        let { email, password, isPasswordHidden, isEmailError, isPassError } = this.state
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                 <ImageBackground source={require("../images/welcome.png")} style={styles.backgroungImage}>
                <ProcessingMoadl ref={ref => this.processingModal = ref} />
                <MyHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15, }}>
                    <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                        {"Welcome Back"}
                    </Text>
                    <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                        {"Log in to continue!"}
                    </Text>

                    <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: Height(1.5) }}>

                        <View style={{ flex: 1 }}>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Email"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"mail"} size={24} color={theme.iconsBG} />
                                    <TextInput
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        autoCapitalize="none"
                                        value={email}
                                        keyboardType="email-address"
                                        onChangeText={(txt) => { this.setState({ email: txt, isEmailError: !myUtils.isValidemail(txt) }) }}
                                        returnKeyType="next"
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                    />
                                </View>
                                {isEmailError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {`* Please type valid email`}
                                    </Text>
                                }
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Password"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"lock"} size={24} color={theme.iconsBG} />
                                    <TextInput
                                        ref={ref => this.passwordInput = ref}
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        value={password}
                                        keyboardType="default"
                                        secureTextEntry={isPasswordHidden}
                                        onChangeText={(txt) => { this.setState({ password: txt, isPassError: myUtils.isEmptyString(txt) }) }}
                                    />
                                    <TouchableOpacity
                                        style={{ position: "absolute", right: 0, paddingHorizontal: 10 }}
                                        onPress={() => this.setState({ isPasswordHidden: !isPasswordHidden })}
                                    >
                                        <FIcons name={isPasswordHidden ? "eye-off" : "eye"} size={24} color={theme.iconsBG} />
                                    </TouchableOpacity>
                                </View>
                                {isPassError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {`* Please type valid password`}
                                    </Text>
                                }
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={{
                                        padding: 10
                                    }} onPress={() => { this.props.navigation.navigate("ForgetPassword") }}>
                                        <Text style={{ ...mediumTextFont, color: theme.text, fontSize: 16 }}>
                                            {"Forgot Password?"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1, }}>
                                    <Button
                                        label={language._2}
                                        isFocused={true}
                                        onPress={() => { this.handleOnCredentialsLogin() }}
                                    />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: "row", marginVertical: 30, paddingHorizontal: 10,
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <View style={{ flex: 1, height: 0.5, backgroundColor: theme.secondaryText }} />
                                <Text style={{
                                    ...textFont, color: theme.secondaryText,
                                    fontSize: 14, marginHorizontal: 10
                                }}> {"or"}</Text>
                                <View style={{ flex: 1, height: 0.5, backgroundColor: theme.secondaryText }} />
                            </View>

                            <TouchableOpacity
                                style={[{
                                    backgroundColor: theme.secondaryBG,
                                    borderRadius: 20, alignItems: "center",
                                    padding: 10,
                                }]}
                                onPress={() => { this.handleOnGoogleLogin() }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Image style={{ width: 28, height: 28 }} source={require("../../images/google_icon.png")} />
                                    <Text style={[{ paddingHorizontal: 10, ...textFont, fontSize: 15, color: theme.text }]}>
                                        {"Continue with Google"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ ...textFont, fontSize: 14, color: theme.text }}>
                                    {"Don't have an account?"}
                                </Text>
                                <TouchableOpacity style={{ padding: 10 }}
                                    onPress={() => this.props.navigation.navigate("Signup")}>
                                    <Text style={{ ...textFont, fontSize: 16, color: primaryColor }}>
                                        {language._3}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>

                </View>
 </ImageBackground>
            </View>
        )
    }

    handleOnCredentialsLogin() {
        let { email, password } = this.state
        let isAnyIssue = false
        if (!myUtils.isValidemail(email)) {
            this.setState({ isEmailError: true })
            isAnyIssue = true
        }
        if (myUtils.isEmptyString(password)) {
            this.setState({ isPassError: true })
            isAnyIssue = true
        }
        if (isAnyIssue) { return }
        let bodyParams = { email, password }
        this.handleOnServerLogin(bodyParams)
    }

    async handleOnGoogleLogin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            let bodyParams = { sociallogin: "google", profile: JSON.stringify(userInfo.user) }
            this.handleOnServerLogin(bodyParams)
        } catch (error) {
            let errorMsg = ""
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                errorMsg = "You've cancelled the process"
            } else if (error.code === statusCodes.IN_PROGRESS) {
                errorMsg = "Please wait, already processing the information"
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                errorMsg = "Please make sure your device has installed lastest google play services."
            } else {
                errorMsg = "An unknown error occurred, Please try again or contact to the support."
            }
            myUtils.showMessagePopup("Oops!", errorMsg)
        }
    }

    handleOnServerLogin(bodyParams) {
        this.processingModal.showModal()
        prefs.destroySession(() => {
            webHandler.postDataRequest(Routes.LOGIN, bodyParams, (resp) => {
                let sessionData = { data: resp.data, sessionToken: resp.sessionToken }
                let isVerified = (resp.data.is_verified == 1)
                prefs.createUserSession(sessionData, isVerified, () => {
                    if (isVerified) {
                        this.processingModal.cancelModal()
                        myUtils.resetAndGo(this.props.navigation, "socialTabs")
                        // this.props.navigation.navigate("Followsuggest")
                    } else {
                        let bodyParams = { email }
                        webHandler.postDataRequest(Routes.RESEND_OTP, bodyParams, (resp) => {
                            this.processingModal.cancelModal()
                            this.props.navigation.navigate("OTPVerification", {
                                _isJustACVerfication: true,
                                onVerified: () => {
                                    myUtils.resetAndGo(this.props.navigation, "socialTabs")
                                }
                            })
                        }, (errorData) => {
                            this.processingModal.cancelModal()
                            if (errorData != webHandler.CATCH_ERROR) {
                                myUtils.showMessagePopup("Message", errorData.message)
                            }
                        })
                    }
                })
            }, (errorData) => {
                this.processingModal.cancelModal()
                if (errorData != webHandler.CATCH_ERROR) {
                    myUtils.showMessagePopup("Message", errorData.message)
                }
            })
        })
    }
}

export default connect(ReducersProps, null)(Login)