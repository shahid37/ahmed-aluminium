import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import FAIcons from 'react-native-vector-icons/FontAwesome'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import PhoneInput from "react-native-phone-number-input";
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'
import ProcessingModal from '../reuseable/ProcessingModal'
import Prefmanager from '../../data/local/Prefmanager'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import * as RNLocalize from "react-native-localize";

const prefs = new Prefmanager()
const webHandler = new WebHandler()
const myUtils = new Utils()
class Signup extends Component {

    constructor(props) {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            userName: "",
            formattedPhoneNo: "",

            isFNameError: false,
            isLNameError: false,
            isEmailError: false,
            isPhoneError: false,
            isUsernameError: false,
        }
    }

    render() {
        let { language, theme } = this.props
        let { firstName, lastName, email, phoneNo, userName,
            isFNameError, isLNameError, isEmailError, isPhoneError,
            isUsernameError
        } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <ProcessingModal ref={ref => this.processingModal = ref} />
                <MyHeader navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                        {"Sign up"}
                    </Text>
                    <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                        {"Sign up to get started!"}
                    </Text>

                    <View style={{ flex: 1 }}>

                        <View style={{ marginVertical: 10 }}>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Full Name"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4, borderWidth: 1,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10,
                                    borderColor: theme.borderColor,
                                }}>
                                    <FAIcons name={"user-circle-o"} size={24} color={theme.iconsBG} />
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput
                                            style={{
                                                ...textFont, flex: 1, fontSize: 16,
                                                paddingHorizontal: 10, color: theme.text,
                                                paddingVertical: Platform.OS == "ios" ? 15 : 10
                                            }}
                                            value={firstName}
                                            placeholder={"First Name"}
                                            placeholderTextColor={theme.secondaryText}
                                            keyboardType="default"
                                            onChangeText={(txt) => { this.handleOnFNameChange(txt) }}
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.lastNameRef.focus()}
                                        />
                                        <View style={{ width: 1, backgroundColor: "#999", marginVertical: 15 }} />
                                        <TextInput
                                            ref={ref => this.lastNameRef = ref}
                                            style={{
                                                ...textFont, flex: 1, fontSize: 16,
                                                paddingHorizontal: 10, color: theme.text,
                                                paddingVertical: Platform.OS == "ios" ? 15 : 10
                                            }}
                                            value={lastName}
                                            placeholder={"Last Name"}
                                            placeholderTextColor={theme.secondaryText}
                                            keyboardType="default"
                                            onChangeText={(txt) => { this.handleOnLNameChange(txt) }}
                                            returnKeyType="next"
                                            onSubmitEditing={() => { this.userNameRef.focus() }}
                                        />
                                    </View>
                                </View>
                                {isFNameError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {"* Please type valid First Name"}
                                    </Text>
                                }
                                {isLNameError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {"* Please type valid Last Name"}
                                    </Text>
                                }
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Username"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"user"} size={24} color={theme.iconsBG} />
                                    <TextInput
                                        ref={ref => this.userNameRef = ref}
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        value={userName}
                                        autoCapitalize="none"
                                        keyboardType="default"
                                        onChangeText={(txt) => { this.handleOnUsernameChange(txt) }}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { this.emailRef.focus() }}
                                    />
                                </View>
                                {isUsernameError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {`* Please type a valid username`}
                                    </Text>
                                }
                            </View>

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
                                        ref={ref => this.emailRef = ref}
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        value={email}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        onChangeText={(txt) => { this.handleOnEmailChange(txt) }}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { }}
                                    />
                                </View>
                                {isEmailError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {"* Please type valid Email"}
                                    </Text>
                                }
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Phone Number"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FAIcons name={"mobile"} size={30} color={theme.iconsBG} />
                                    <View style={{ flex: 1 }}>
                                        <PhoneInput
                                            ref={(input) => { this.phoneNoRef = input }}
                                            defaultValue={phoneNo}
                                            defaultCode={RNLocalize.getCountry()}
                                            onChangeText={(text) => { this.handleMobileNoChange(text) }}
                                            onChangeFormattedText={(text) => { this.setState({ formattedPhoneNo: text }) }}
                                            containerStyle={{ flex: 1, backgroundColor: "rgba(0,0,0,0)", width: "100%" }}
                                            textContainerStyle={{
                                                flex: 1, backgroundColor: "rgba(0,0,0,0)",
                                                paddingVertical: Platform.OS == "ios" ? 18 : 3,
                                            }}
                                            codeTextStyle={{ ...textFont, color: theme.text }}
                                            textInputStyle={{ ...textFont, color: theme.text }}
                                            placeholder={" "}
                                        />
                                    </View>
                                </View>
                                {isPhoneError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {"* Please type valid Phone No"}
                                    </Text>
                                }
                            </View>

                        </View>

                        <View style={{ width: "100%", marginTop: 20, marginBottom: 10 }}>
                            <Button
                                label={"Next"}
                                isFocused={true}
                                onPress={() => { this.handleOnRegister() }}
                            />
                        </View>

                        <View style={{
                            flexDirection: "row", marginVertical: 15, paddingHorizontal: 10,
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
                            onPress={() => { this.handleOnGoogleSignUp() }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <Image style={{ width: 28, height: 28 }} source={require("../../images/google_icon.png")} />
                                <Text style={[{ paddingHorizontal: 10, ...textFont, fontSize: 15, color: theme.text }]}>
                                    {"Continue with Google"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{ alignItems: "center", marginVertical: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ ...textFont, fontSize: 14, color: theme.text }}>
                                {"Already have an account?"}
                            </Text>
                            <TouchableOpacity style={{ padding: 10 }}
                                onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={{ ...textFont, fontSize: 16, color: primaryColor }}>
                                    {language._2}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }

    handleOnFNameChange(txt) {
        this.setState({
            firstName: txt,
            isFNameError: (myUtils.isEmptyString(txt) ||
                myUtils.hasSpecialChar(txt))
        })
    }

    handleOnLNameChange(txt) {
        this.setState({
            lastName: txt,
            isLNameError: myUtils.isEmptyString(txt) ||
                myUtils.hasSpecialChar(txt)
        })
    }

    handleOnUsernameChange(txt) {
        this.setState({
            userName: txt,
            isUsernameError: myUtils.isEmptyString(txt) ||
                myUtils.hasSpecialChar(txt)
        })
    }

    handleOnEmailChange(txt) {
        this.setState({ email: txt, isEmailError: !myUtils.isValidemail(txt) })
    }

    handleMobileNoChange(txt) {
        this.setState({ phoneNo: txt, isPhoneError: !this.phoneNoRef.isValidNumber(txt) })
    }

    handleOnRegister() {
        // this.props.navigation.navigate("OTPVerification")
        // return
        let { firstName, lastName, email, phoneNo, userName, formattedPhoneNo } = this.state
        let isAnyError = false
        if (myUtils.isEmptyString(firstName) || myUtils.hasSpecialChar(firstName)) {
            this.setState({ isFNameError: true })
            isAnyError = true
        }
        if (myUtils.isEmptyString(lastName) || myUtils.hasSpecialChar(lastName)) {
            this.setState({ isLNameError: true })
            isAnyError = true
        }
        if (myUtils.isEmptyString(userName) || myUtils.hasSpecialChar(userName)) {
            this.setState({ isUsernameError: true })
            isAnyError = true
        }
        if (!myUtils.isValidemail(email)) {
            this.setState({ isEmailError: true })
            isAnyError = true
        }
        if (!this.phoneNoRef.isValidNumber(phoneNo)) {
            this.setState({ isPhoneError: true })
            isAnyError = true
        }
        if (isAnyError) return

        this.processingModal.showModal()
        let bodyParams = {
            firstname: firstName, secondname: lastName,
            email: email, phone: formattedPhoneNo,
            username: userName
        }
        prefs.destroySession(() => {
            webHandler.postDataRequest(Routes.REGISTER_ACCOUNT, bodyParams, (resp) => {
                let sessionData = { data: resp.data, sessionToken: resp.sessionToken }
                prefs.createUserSession(sessionData, false, () => {
                    this.processingModal.cancelModal()
                    this.props.navigation.navigate("OTPVerification")
                })
            }, (errorData) => {
                this.processingModal.cancelModal()
                if (errorData != webHandler.CATCH_ERROR) {
                    myUtils.showMessagePopup("Message", errorData.message)
                }
            })
        })
    }

    async handleOnGoogleSignUp() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // console.log(userInfo)
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
                    this.processingModal.cancelModal()
                    myUtils.resetAndGo(this.props.navigation, "socialTabs")
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

export default connect(ReducersProps, null)(Signup)