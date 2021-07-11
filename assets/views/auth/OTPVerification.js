import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Keyboard, Image } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, mediumTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import Utils from '../../utils/Utils'
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Modal from 'react-native-modal'
import FIcons from 'react-native-vector-icons/Feather'
import Button from '../reuseable/Button'
import ProcessingMoadl from '../reuseable/ProcessingModal'
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'
import Prefmanager from '../../data/local/Prefmanager'

const prefs = new Prefmanager()
const webHandler = new WebHandler()
const myUtils = new Utils()
class OTPVerification extends Component {

    constructor(props) {
        super()
        this.state = {
            otp: "",
            isVerified: false,

            isJustACVerfication: props.route.params?._isJustACVerfication ?? false,
            isFromPassResetProcess: props.route.params?._isFromPassResetProcess ?? false,
        }
    }

    renderVerifiedModal() {
        let { theme } = this.props
        let { isJustACVerfication } = this.state
        return (
            <Modal
                isVisible={this.state.isVerified}
            >
                <View style={{ borderRadius: 5, backgroundColor: theme.background, padding: 10 }}>
                    <Image
                        source={require("../../images/design_pattern_1.png")}
                        style={{ width: "90%", marginTop: -70 }}
                        resizeMode="contain"
                    />
                    <View style={{ alignItems: "center", marginTop: -100 }}>
                        <View style={{
                            borderRadius: 50, width: 100, height: 100, borderColor: theme.secondaryBG,
                            borderWidth: 1, alignItems: "center", justifyContent: "center"
                        }}>
                            <View style={{
                                borderRadius: 40, width: 80, height: 80, alignItems: "center",
                                padding: 10, backgroundColor: theme.secondaryBG, justifyContent: "center",
                                borderWidth: 1, borderColor: theme.secondaryBG,
                            }}>
                                <FIcons style={{}} name={"check"} size={30} color={primaryColor} />
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center", marginVertical: 20 }}>
                        <Text style={[mediumTextFont, { color: theme.text, fontWeight: "bold", fontSize: 22 }]}>
                            {"Verified"}
                        </Text>
                        <Text style={[textFont, { color: theme.secondaryText, fontSize: 16, textAlign: "center", marginTop: 5 }]}>
                            {"You have successfully verified the account"}
                        </Text>

                        <Button
                            label={"Done"}
                            isFocused={true}
                            bgStyle={{ width: 120, marginVertical: 10 }}
                            onPress={() => {
                                this.setState({ isVerified: false })
                                if (isJustACVerfication) {
                                    this.props.route.params.onVerified()
                                } else {
                                    this.props.navigation.navigate("CreatePassword", { isFromSignupProcess: true })
                                }
                            }}
                        />
                    </View>

                </View>
            </Modal>
        )
    }

    render() {
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <ProcessingMoadl ref={ref => this.processingModal = ref} />
                {this.renderVerifiedModal()}
                <MyHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                        {"Enter Your Code"}
                    </Text>
                    <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                        {"A text message with a verification code was sent to your phone"}
                    </Text>

                    <View style={{ marginVertical: 50 }}>
                        <CodeField
                            ref={ref => this.ref = ref}
                            value={this.state.otp}
                            onChangeText={(text) => { this.setState({ otp: text }) }}
                            cellCount={4}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={this.renderCell}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                        />
                    </View>

                    <Button
                        label={"Verify"}
                        isFocused={true}
                        onPress={() => { this.handleOnVerify() }}
                    />

                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ ...textFont, fontSize: 14, color: theme.text }}>
                                {"Didn't recive the OTP Code?"}
                            </Text>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.handleOnResendOTP()}>
                                <Text style={{ ...textFont, fontSize: 16, color: primaryColor }}>
                                    {"Resend"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

            </View>
        )
    }

    renderCell = ({ index, symbol, isFocused }) => {
        let { theme } = this.props
        let textChild = null;
        if (symbol) {
            textChild = symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }
        return (
            <View
                key={index}
                onLayout={this.getCellOnLayoutHandler(index)}
            >
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell,
                    { backgroundColor: theme.secondaryBG, color: theme.text }]}
                // onLayout={this.getCellOnLayoutHandler(index)}
                >
                    {textChild}
                </Text>
            </View>

        );
    };

    getCellOnLayoutHandler = (index) => {
        useClearByFocusCell({
            value: this.state.otp, setValue: (txt) => {
                this.setState({ otp: txt })
            }
        })
    }

    handleOnVerify() {
        let { otp, isFromPassResetProcess } = this.state
        if (!myUtils.isEmptyString(otp)) {
            this.processingModal.showModal()
            let url = Routes.VERIFY_OTP
            let bodyParams = { verification_code: otp }
            if (isFromPassResetProcess) {
                url = Routes.VERIFY_RESET_PASS_CODE
                let { email } = this.props.route.params
                bodyParams = { parametername: "email", parametervalue: email, verificationcode: otp }
            }
            webHandler.postDataRequest(url, bodyParams, (resp) => {
                this.processingModal.cancelModal()
                if (isFromPassResetProcess) {
                    let sData = { data: {}, sessionToken: resp.sessionToken }
                    prefs.createUserSession(sData, false, () => { })
                }
                // prefs.updateSessionToken(resp.sessionToken)
                setTimeout(() => { this.setState({ isVerified: true }) }, 500)
            }, (errorData) => {
                this.processingModal.cancelModal()
                if (errorData != webHandler.CATCH_ERROR) {
                    myUtils.showMessagePopup("Message", errorData.message)
                }
            })
        }
    }

    handleOnResendOTP() {
        this.processingModal.showModal()
        let { isFromPassResetProcess } = this.state
        let url = Routes.RESEND_OTP
        let bodyParams = null
        if (isFromPassResetProcess) {
            url = Routes.RESET_PASSWORD
            let { email } = this.props.route.params
            bodyParams = { parametername: "email", parametervalue: email }
        }
        webHandler.postDataRequest(url, bodyParams, (resp) => {
            this.processingModal.cancelModal()
            setTimeout(() => {
                myUtils.showSnackbar("Successfully sent you the OTP")
            }, 500)
        }, (errorData) => {
            this.processingModal.cancelModal()
            if (errorData != webHandler.CATCH_ERROR) {
                myUtils.showMessagePopup("Message", errorData.message)
            }
        })
    }

}

const styles = StyleSheet.create({
    codeFieldRoot: {},
    cell: {
        width: 80,
        height: 50,
        lineHeight: 50,
        fontSize: 24,
        textAlign: 'center',
        borderRadius: 5
    },
    focusCell: {
        borderColor: primaryColor,
        borderWidth: 2,
    },
});

export default connect(ReducersProps, null)(OTPVerification)