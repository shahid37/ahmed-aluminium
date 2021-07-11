import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, mediumTextFont, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'
import ProcessingMoadl from '../reuseable/ProcessingModal'

const myUtils = new Utils()
class ForgetPassword extends Component {

    constructor(props) {
        super()
        this.state = {
            email: "",
            isEmailFError: false,
            isEmailSent: false
        }
    }

    render() {
        let { email, isEmailSent, isEmailFError } = this.state
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <ProcessingMoadl ref={ref => this.processingModal = ref} />
                <MyHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    {!isEmailSent &&
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                                {"Forgot Password?"}
                            </Text>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                                {"Don’t worry, happens to the best of us. Please confirm your email and we will send the instructions."}
                            </Text>

                            <View style={{ marginVertical: 40 }}>
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
                                        value={email}
                                        keyboardType="email-address"
                                        onChangeText={(txt) => { this.handleOnEmailTextChange(txt) }}
                                        returnKeyType="done"
                                    />
                                </View>
                                {isEmailFError &&
                                    <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                        {"* Please type valid Email"}
                                    </Text>
                                }
                            </View>

                            <Button
                                label={"Send Me Instructions"}
                                isFocused={true}
                                onPress={() => { this.handleOnSendEmail() }}
                            />
                        </View>
                    }
                    {isEmailSent &&
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold", }}>
                                {"Instructions sent!"}
                            </Text>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 10 }}>
                                {"Instructions for resetting your password have been sent to "}
                                <Text style={{ ...mediumTextFont, fontWeight: "bold", color: theme.text, fontSize: 16 }}>
                                    {email}
                                </Text>
                            </Text>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 20 }}>
                                {"You’ll receive this email within 5 minutes. Be sure to check your spam folder, too."}
                            </Text>

                            <Button
                                label={"Continue"}
                                isFocused={true}
                                bgStyle={{ marginTop: 30 }}
                                onPress={() => {
                                    this.props.navigation.navigate("OTPVerification", {
                                        _isJustACVerfication: true,
                                        _isFromPassResetProcess: true,
                                        email: email,
                                        onVerified: () => {
                                            this.props.navigation.navigate("CreatePassword")
                                        }
                                    })
                                }}
                            />
                        </View>
                    }
                </View>
            </View>
        )
    }

    handleOnEmailTextChange(txt) {
        this.setState({ email: txt, isEmailFError: !myUtils.isValidemail(txt) })
    }

    handleOnSendEmail() {
        let { email } = this.state
        if (!myUtils.isValidemail(email)) {
            this.setState({ isEmailFError: true })
            return
        }

        this.processingModal.showModal()
        let webHandler = new WebHandler()
        let bodyParams = { parametername: "email", parametervalue: email }
        webHandler.postDataRequest(Routes.RESET_PASSWORD, bodyParams, (resp) => {
            this.processingModal.cancelModal()
            this.setState({ isEmailSent: true })
        }, (errorData) => {
            this.processingModal.cancelModal()
            if (errorData != webHandler.CATCH_ERROR) {
                myUtils.showMessagePopup("Message", errorData.message)
            }
        })
    }
}

export default connect(ReducersProps, null)(ForgetPassword)