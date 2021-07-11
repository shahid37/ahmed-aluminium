import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import AppConfig from '../../utils/AppConfig'
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'
import ProcessingMoadl from '../reuseable/ProcessingModal'

const webHandler = new WebHandler()
const myUtils = new Utils()
class CreatePassword extends Component {

    constructor(props) {
        super()
        this.state = {
            password: "",
            confirmPassword: "",
            isPassCreated: false,
            is8Chars: false,
            isUppercase: false,
            isLowercase: false,
            isNumber: false,
            isPunctuation: false,

            isFromSignupProcess: props.route.params?.isFromSignupProcess ?? false,
        }
    }

    renderCheckView(isChecked, txt) {
        let { theme } = this.props
        return (
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <View style={{
                    borderRadius: (25 / 2), width: 25, height: 25, justifyContent: "center",
                    backgroundColor: isChecked ? primaryColor : theme.secondaryBG,
                    alignItems: "center"
                }}>
                    {isChecked &&
                        <FIcons name={"check"} color={"#fff"} size={20} />
                    }
                </View>
                <Text style={{
                    ...textFont, fontSize: 14, marginHorizontal: 10,
                    color: isChecked ? theme.text : theme.secondaryText,
                }}>{txt}</Text>
            </View>
        )
    }

    render() {
        let { password, confirmPassword, isPassCreated } = this.state
        let { is8Chars, isUppercase, isLowercase, isNumber, isPunctuation, isFromSignupProcess } = this.state
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <ProcessingMoadl ref={ref => this.processingModal = ref} />
                <MyHeader navigation={this.props.navigation} />
                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    {!isPassCreated &&
                        <KeyboardAvoidingView behavior="position">
                            <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                                {"Create New Password"}
                            </Text>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                                {"In order to protect your account, make sure your password contains:"}
                            </Text>

                            <View style={{ marginVertical: 10 }}>
                                {this.renderCheckView(is8Chars, "At least 8 chareacters long")}
                                {this.renderCheckView(isUppercase, "Uppercase letters")}
                                {this.renderCheckView(isLowercase, "Lowercase letters")}
                                {this.renderCheckView(isNumber, "Numbers")}
                                {this.renderCheckView(isPunctuation, "Punctuation")}
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Set Your Password"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"lock"} size={24} color={theme.iconsBG} />
                                    <TextInput
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        value={password}
                                        secureTextEntry={true}
                                        keyboardType="default"
                                        onChangeText={(txt) => { this.handleOnPassChange(txt) }}
                                        returnKeyType="done"
                                    />
                                </View>
                            </View>

                            <View style={{ marginVertical: 20 }}>
                                <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                    {"Confirm Password"}
                                </Text>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"lock"} size={24} color={theme.iconsBG} />
                                    <TextInput
                                        style={{
                                            ...textFont, flex: 1, fontSize: 16,
                                            paddingHorizontal: 10, color: theme.text,
                                            paddingVertical: Platform.OS == "ios" ? 15 : 10
                                        }}
                                        value={confirmPassword}
                                        keyboardType="default"
                                        secureTextEntry
                                        onChangeText={(txt) => { this.setState({ confirmPassword: txt }) }}
                                        returnKeyType="done"
                                    />
                                </View>
                            </View>
                            <View style={{ width: "100%", marginTop: 20 }}>
                                <Button
                                    theme={theme}
                                    isFocused={true}
                                    label={"Continue"}
                                    onPress={() => { this.handleOnCreatePassword() }}
                                    bgStyle={{ backgroundColor: AppConfig.primaryColor }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    }
                    {isPassCreated &&
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold", }}>
                                {isFromSignupProcess ? "Password Creation Successful" : "Password Reset Successful"}
                            </Text>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 20 }}>
                                {"You have successfully setup your passwpord. Please use your new password when logging in."}
                            </Text>

                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <View style={{ width: "100%", marginTop: 20 }}>
                                    <Button
                                        theme={theme}
                                        isFocused={true}
                                        label={"Continue"}
                                        onPress={() => { this.handleOnContinue() }}
                                        bgStyle={{ backgroundColor: AppConfig.primaryColor }}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }

    handleOnPassChange(txt) {
        let is8Chars = (txt.length >= 8)
        let isUppercase = false
        let isLowercase = false
        let isNumber = false
        let isPunctuation = myUtils.hasSpecialChar(txt)
        var i = 0;
        var character = '';
        while (i <= txt.length) {
            character = txt.charAt(i);
            if (!myUtils.hasSpecialChar(character)) {
                if (!isNaN(character * 1)) {
                    if (this.isNumeric(character)) {
                        isNumber = true
                    }
                } else {
                    if (character == character.toUpperCase()) {
                        isUppercase = true
                    }
                    if (character == character.toLowerCase()) {
                        isLowercase = true
                    }
                }
            }
            i++;
        }
        this.setState({ is8Chars, isUppercase, isLowercase, isNumber, isPunctuation, password: txt })
    }

    isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    handleOnCreatePassword() {
        let { is8Chars, isUppercase, isLowercase, isNumber, isPunctuation, password, confirmPassword } = this.state
        if (is8Chars && isUppercase && isLowercase && isNumber && isPunctuation) {
            if (password != confirmPassword) {
                myUtils.showSnackbar("Passwords doesn't matched")
                return
            }

            this.processingModal.showModal()
            let bodyParams = { password: password }
            webHandler.postDataRequest(Routes.CREATE_PASSWORD, bodyParams, (resp) => {
                this.processingModal.cancelModal()
                this.setState({ isPassCreated: true })
            }, (errorData) => {
                this.processingModal.cancelModal()
                if (errorData != webHandler.CATCH_ERROR) {
                    myUtils.showMessagePopup("Message", errorData.message)
                }
            })
        }
    }

    handleOnContinue() {
        let { isFromSignupProcess } = this.state
        if (isFromSignupProcess) {
            this.props.navigation.navigate("BasicInfo")
        } else {
            this.props.navigation.navigate("Login")
        }
    }
}

export default connect(ReducersProps, null)(CreatePassword)
