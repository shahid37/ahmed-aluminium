import React, { Component } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, Modal,ScrollView, ImageBackground, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { boldTextFont, Empty, primaryColor, errorColor, textDefault, textFont, Headingstyle, mediumTextFont, defaultFont } from '../utils/Style';
import ReducersProps from '../data/local/reducers/ReducersProps'
//import FIcons from 'react-native-vector-icons/Feather'
import { FontSize, Height, ScreenWidth, Width, ScreenHeight } from '../utils/Dimensions';
import { connect } from "react-redux"
import AppConfig from '../utils/AppConfig';
import Icon from 'react-native-vector-icons/Feather';
import LIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import firebase from '../views/Firebasedb';

import Button from "../views/reuseable/Button"
import WebHandler from '../data/remote/WebHandler';
import Utils from '../utils/Utils';


const MyUtils = new Utils()


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keepToLoggedIn: false,
            hidePassword: true,
            reEnterHidePassword: true,
            model_1_Visibility: false,
            // username: "",
            // email: "",
            // password: "",
            // reEnterPassword: "",
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
            mobileNo: "",
            isSubmitting: false
        }
    }
    createRoom = () => {
        this.setState({ model_1_Visibility: true })

    }
    modalCall() {
        this.setState({ model_1_Visibility: false,})
        this.props.navigation.navigate('Login')
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    registerUser = () => {

        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    })

                    console.log('User registered successfully!')
                    console.log("USerData=====> ", res)
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.createRoom();
                   
                })
                .catch(error => this.setState({ errorMessage: error.message, isLoading:false }))
                // .catch(error => 
                //     MyUtils.showSnackbar(error.message, errorColor))
                //     this.setState({isLoading:false})
        }
    }
    togglePwdVisibility() {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    togglePwdVisibilityRenter() {
        this.setState({ reEnterHidePassword: !this.state.reEnterHidePassword });
    }

    handleOnSignIn(userId) {
        // MyUtils.resetAndGo(this.props.navigation, "CheckEmail",{id:"300"})
        this.props.navigation.navigate("CheckEmail", { id: userId, screenNo: 0 })
    }

    handleOnSingup() {

        let { username, email, mobileNo, password, reEnterPassword } = this.state

        if (username == "" || username.length < 3) {
            MyUtils.showSnackbar("UserName Must Not be Less Than 3 char", errorColor)
            return
        }
        if (!MyUtils.isNonEmptyString(username)) {
            MyUtils.showSnackbar("Please Enter Valid UserName", errorColor)
            return
        }
        if (mobileNo == "") {
            MyUtils.showSnackbar("ContactNo Must Not be Empty", errorColor)
            return
        }
        if (!MyUtils.isNonEmptyString(mobileNo)) {
            MyUtils.showSnackbar("Please Enter Valid Contact No", errorColor)
            return
        }
        // if (!MyUtils.isValidmobile(mobileNo)) {
        //     MyUtils.showSnackbar("Enter Your Mobile-No Correctly", errorColor)
        //     return
        // }
        if (!MyUtils.isValidemail(email)) {
            MyUtils.showSnackbar("Enter Your Email Correctly", errorColor)
            return
        }

        if (password.length < 6) {
            MyUtils.showSnackbar("Password Must Not be Less Than 6 char", errorColor)
            return
        }

        if (!MyUtils.isNonEmptyString(password)) {
            MyUtils.showSnackbar("Please Don't Use Spaces As A Password", errorColor)
            return
        }

        if (password != reEnterPassword) {
            MyUtils.showSnackbar("Password Not Matched", errorColor)
            return
        }

        this.setState({ isSubmitting: true })
        let data = { username, email, mobileNo, password }
        let webHandler = new WebHandler()
        console.log("=====Sending Request To Server=====")
        webHandler.registerUser(data, (resp) => {
            MyUtils.showSnackbar("Verify Your Emaail Adress", primaryColor)
            console.log(resp)
            this.setState({ isSubmitting: false })
            this.handleOnSignIn(resp)
        }, (reason) => {
            // console.log("i am here")
            MyUtils.showSnackbar(reason, errorColor)
            this.setState({ isSubmitting: false })

        })
    }



    checkPasswordStrength(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/;
        var testCase2 = /[A-Z]+/;
        var testCase3 = /[0-9]+/;
        var testCase4 = /[$@#&!]+/;

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 1;
        }
        if (testCase3.test(password)) {
            strength += 1;
        }

        if (testCase4.test(password)) {
            strength += 1;
        }

        if (password.length > 5) {

            switch (strength) {
                case 0:
                    // console.log("========STRENGTH========", 0)
                    return ("")
                    break;

                case 1:
                    // console.log("========STRENGTH========", 25)
                    return ("       Weak")
                    break;

                case 2:
                    // console.log("========STRENGTH========", 50)
                    return ("        Medium")
                    break;

                case 3:
                    // console.log("========STRENGTH========", 75)
                    return ("        Medium")
                    break;

                case 4:
                    // console.log("========STRENGTH========", 100)
                    return ("        Strong")
                    break;
            }
        }
        else { return ("Min 6 char") }
    }

    setPasswordStrengthColor(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/;
        var testCase2 = /[A-Z]+/;
        var testCase3 = /[0-9]+/;
        var testCase4 = /[$@#&!]+/;

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 1;
        }
        if (testCase3.test(password)) {
            strength += 1;
        }

        if (testCase4.test(password)) {
            strength += 1;
        }
        switch (strength) {
            case 0:
                // console.log("========STRENGTH========", 0)
                return ("#979797")
                break;

            case 1:
                // console.log("========STRENGTH========", 25)
                return ("#F26A6A")
                break;

            case 2:
                // console.log("========STRENGTH========", 50)
                return ("#F2C96A")
                break;

            case 3:
                // console.log("========STRENGTH========", 75)
                return ("#F2C96A")
                break;

            case 4:
                // console.log("========STRENGTH========", 100)
                return (primaryColor)
                break;
        }

    }

    setPasswordStrengthChar(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/; //1
        var testCase2 = /[A-Z]+/;  //2
        var testCase3 = /[0-9]+/;  //4
        var testCase4 = /[$@#&!]+/; //8

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 2;
        }
        if (testCase3.test(password)) {
            strength += 4;
        }

        if (testCase4.test(password)) {
            strength += 8;
        }
        switch (strength) {
            case 0:
                // console.log("========STRENGTH========", 0)
                return ("#A1a@!")
                break;

            case 1:
                // console.log("========STRENGTH========", 25)
                return ("#A1@!")
                break;

            case 2:
                // console.log("========STRENGTH========", 50)
                return ("#1a@!")
                break;

            case 4:
                // console.log("========STRENGTH========", 75)
                return ("#Aa@!")
                break;

            case 8:
                // console.log("========STRENGTH========", 100)
                return ("A1a")
                break;
            case 15:
                // console.log("========STRENGTH========", 100)
                return ("")
                break;
            case 3:
                // console.log("========STRENGTH========", 100)
                return ("#1@!")
                break;
            case 5:
                // console.log("========STRENGTH========", 100)
                return ("#A@!")
                break;
            case 9:
                // console.log("========STRENGTH========", 100)
                return ("A1")
                break;
            case 6:
                // console.log("========STRENGTH========", 100)
                return ("#a@!")
                break;
            case 10:
                // console.log("========STRENGTH========", 100)
                return ("1a")
                break;
            case 12:
                // console.log("========STRENGTH========", 100)
                return ("Aa")
                break;
            case 7:
                // console.log("========STRENGTH========", 100)
                return ("#@!")
                break;
            case 13:
                // console.log("========STRENGTH========", 100)
                return ("A")
                break;

        }
    }



    render() {
        const { language, theme } = this.props
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={{ backgroundColor: theme.dimBackground, flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} />

                <ImageBackground source={require("../images/bg1.jpg")} style={styles.backgroungImage}>
                    <View style={{ width: ScreenWidth, height: Height(35), backgroundColor: "" }}></View>

                    <View style={styles.loginTxtView}>
                        <Text style={styles.loginTxt} >Let's Sign up</Text>
                        <View style={styles.lineStyle} />
                    </View>
                    {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}> */}
                    {/* <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: Height(1.5) }}> */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, marginTop: Height(1.5) }}>

                        <View style={styles.mainView}>
                            <View style={styles.innerMainView}>




                                <View style={styles.txtInputView}>
                                    <IoniconsIcon name="person" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
                                    <TextInput
                                        style={styles.txtInputStyle}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholder="Username *"
                                        onSubmitEditing={() => { this.contactNo.focus(); }}
                                        returnKeyType="next"
                                        value={this.state.displayName}
                                        onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                                        // value={this.state.username}
                                        // onChangeText={(text) => this.setState({ username: text })}
                                        placeholderTextColor='#979797' />
                                </View>

                                {/* <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
                                    <FontAwesomeIcon name="phone" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
                                    <TextInput
                                        style={styles.txtInputStyle}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={this.state.mobileNo}
                                        ref={(input) => { this.contactNo = input; }}
                                        onSubmitEditing={() => { this.email.focus(); }}
                                        returnKeyType="next"
                                        onChangeText={(text) => this.setState({ mobileNo: text })}
                                        keyboardType={"phone-pad"}
                                        placeholder="Contact No *"
                                        placeholderTextColor='#979797' />
                                </View> */}


                                <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
                                    <IoniconsIcon name="mail" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
                                    <TextInput
                                        style={styles.txtInputStyle}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        ref={(input) => { this.email = input; }}
                                        onSubmitEditing={() => { this.password.focus(); }}
                                        returnKeyType="next"
                                        // value={this.state.email}
                                        // onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                                        placeholder="Email *"
                                        placeholderTextColor='#979797' />
                                </View>

                                {/* ----------------------------------------------------------------------------------------------------------------------- */}
                                <View>
                                    <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
                                        <FontAwesomeIcon name="lock" style={styles.txtInputIcon} size={FontSize(13)} color={this.setPasswordStrengthColor(this.state.password)} />
                                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: this.setPasswordStrengthColor(this.state.password), justifyContent: "space-between" }}>
                                            <TextInput
                                                style={{ ...textFont, flex: 1, }}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                secureTextEntry={this.state.hidePassword}
                                                ref={(input) => { this.password = input; }}
                                                onSubmitEditing={() => { this.reEnterpassword.focus(); }}
                                                returnKeyType="next"
                                                // value={this.state.password}
                                                // onChangeText={(text) => this.setState({ password: text })}
                                                value={this.state.password}
                                                onChangeText={(val) => this.updateInputVal(val, 'password')}
                                                placeholder="Password *"
                                                placeholderTextColor='#979797'


                                            />
                                            <TouchableOpacity
                                                onPress={() => this.togglePwdVisibility()}>
                                                <Icon name={this.state.hidePassword ? "eye-off" : "eye"} style={{ top: 5, padding: 11.5, left: 0, }} size={FontSize(13)} color="#797979" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                        <Text style={{ ...textFont, marginRight: 50, color: this.setPasswordStrengthColor(this.state.password) }}>{this.setPasswordStrengthChar(this.state.password)}</Text>

                                        <Text style={{ ...textFont, color: this.state.password.length > 5 ? this.setPasswordStrengthColor(this.state.password) : this.state.password.length < 1 ? "#797979" : "#ec524b" }}>{this.checkPasswordStrength(this.state.password)}</Text>
                                    </View>
                                </View>
                                {/* ----------------------------------------------------------------------------------------------------------------------- */}
                                {/* <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
                                    <FontAwesomeIcon name="lock" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
                                    <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#979797", justifyContent: "space-between" }}>

                                        <TextInput
                                            style={{ ...textFont, flex: 1, }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry={this.state.reEnterHidePassword}
                                            ref={(input) => { this.reEnterpassword = input; }}
                                            value={this.state.reEnterPassword}
                                            onChangeText={(text) => this.setState({ reEnterPassword: text })}
                                            placeholder="Re-Enter Password *"
                                            placeholderTextColor='#979797' />
                                        <TouchableOpacity
                                            onPress={() => this.togglePwdVisibilityRenter()}>
                                            <Icon name={this.state.reEnterHidePassword ? "eye-off" : "eye"} style={{ top: 5, padding: 11.5, left: 0, }} size={FontSize(13)} color="#797979" />
                                        </TouchableOpacity>
                                    </View>
                                </View> */}



                                <View style={{ marginTop: Height(2), alignItems: 'center', }}>
                                    {!this.state.isSubmitting &&
                                        <Button
                                            theme={theme}
                                            isFocused={true}
                                            label={"Sign up"}
                                            // onPress={() => { this.handleOnSingup() }}
                                            onPress={() => { this.registerUser() }}
                                            txtStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
                                            bgStyle={{
                                                backgroundColor: primaryColor,
                                                width: ScreenWidth / 2.5,
                                                height: Height(6),
                                                borderRadius: Width(100), marginLeft: Width(6)
                                            }}
                                        />}
                                    {this.state.isSubmitting &&
                                        <ActivityIndicator size="large" color={primaryColor} />}
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Height(1) }}>
                                    <Text style={[{ fontSize: 14, color: "#979797", ...textFont }]}>Already user? </Text>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate("Login") }}>
                                        <Text style={{ fontSize: 14, color: primaryColor, ...textFont }}>Login Here</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <View style={styles.socailView}>
                                    <View>
                                        <TouchableOpacity onPress={() => alert("Facebook")}>
                                            <Image source={require("../images/facebookIcon.png")} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: Width(3) }}>
                                        <TouchableOpacity onPress={() => alert("Google")}>
                                            <Image source={require("../images/googleIcon.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.model_1_Visibility}
                                onRequestClose={() => {
                                    this.setState({ model_1_Visibility: false })
                                }}>
                                <View style={styles.centeredViewModel1}>
                                    <View style={styles.modalViewModel1}>
                                        <IoniconsIcon name={"md-checkmark-done-sharp"} color="#fff" size={Width(15)} style={{ backgroundColor: primaryColor, borderRadius: 100, top: 3, alignSelf: "center", width: 60, height: 60 }} />

                                        <TouchableOpacity style={{ margin: Width(2), alignSelf: "center", top: 20 }}>
                                            <Text style={{ ...textFont }}>Session Created Successfully</Text>
                                        </TouchableOpacity>
                                        <View style={{ alignSelf: "center",marginTop:Height(3), }}>
                                            <TouchableOpacity style={{backgroundColor:primaryColor,padding:Width(2),borderRadius:10,marginHorizontal:Width(10)}} onPress={() => { this.modalCall() }}>
                                                <Text style={{...mediumTextFont,fontSize:18,textAlign:"center",color:"#fff"}}>Continue...</Text>
                                            </TouchableOpacity>
                                            {/* <Button
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                 
                                                }}
                                                onPress={() => { this.modalCall() }}
                                                title="Continue..."
                                                color={primaryColor}

                                            /> */}
                                        </View>
                                        {/* <TouchableOpacity style={{zIndex:-999,position:"relative",margin: Width(2),left: 55,top:20, backgroundColor: primaryColor, width: Width(35), height: Height(5), borderRadius: 100, alignSelf:"center" }}
              onPress={() => {
                this.setState({ model_1_Visibility: false })
              }}>
              <Text style={{ ...mediumTextFont, color: "#fff", textAlign: "center", fontSize: FontSize(15),top:5 }}>Go Home</Text>
            </TouchableOpacity> */}

                                    </View>
                                </View>
                            </Modal>
                        </View>


                        {/* </KeyboardAvoidingView> */}
                    </ScrollView>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    backgroungImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: ScreenWidth,
        height: ScreenHeight
    },
    mainView: {
        paddingVertical: Height(1),
        flex: 1,
        alignItems: "center",
    },
    innerMainView: {
        // marginTop:Height(32),
        width: '70%'
    },
    loginTxtView: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: Height(1)
    },
    loginTxt: {
        color: '#646464',
        fontSize: 25,
        fontWeight: '700',
        textAlign: "center",
    },
    lineStyle: {
        borderWidth: 2,
        borderColor: primaryColor,
        marginLeft: Width(16),
        width: Width(24),
        borderRadius: Width(7)
    },
    txtInputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    txtInputIcon: { position: 'relative', paddingRight: 10, right: -4 },
    txtInputStyle: {
        flex: 1, borderBottomWidth: 1, borderBottomColor: '#979797', height: Height(6)
    },
    touchView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Height(6),
        width: Width(12),
        backgroundColor: 'white',
        borderRadius: Width(100),
        marginLeft: Width(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

    },
    socailView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Height(1)
    },
    appNameCSS: {
        fontSize: FontSize(24), ...boldTextFont,
        color: "#fff", textAlign: "center",
        // marginVertical: Height(3)
    },
    centeredViewModel1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Height(13)
    },
    modalViewModel1: {
        width: ScreenWidth / 1.3,
        // margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: Width(4),
        height: 200,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})

export default connect(ReducersProps, null)(Signup)





// import React, { Component } from 'react'
// import { View, Text, Image, StatusBar, ActivityIndicator, Modal,ScrollView, ImageBackground, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
// import { boldTextFont, Empty, primaryColor, errorColor, textDefault, textFont, Headingstyle, mediumTextFont, defaultFont } from '../utils/Style';
// import ReducersProps from '../data/local/reducers/ReducersProps'
// //import FIcons from 'react-native-vector-icons/Feather'
// import { FontSize, Height, ScreenWidth, Width, ScreenHeight } from '../utils/Dimensions';
// import { connect } from "react-redux"
// import AppConfig from '../utils/AppConfig';
// import Icon from 'react-native-vector-icons/Feather';
// import LIcon from 'react-native-vector-icons/Fontisto';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import IoniconsIcon from 'react-native-vector-icons/Ionicons';
// import firebase from '../views/Firebasedb';

// import Button from "../views/reuseable/Button"
// import WebHandler from '../data/remote/WebHandler';
// import Utils from '../utils/Utils';


// const MyUtils = new Utils()


// class Signup extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             keepToLoggedIn: false,
//             hidePassword: true,
//             reEnterHidePassword: true,
//             model_1_Visibility: false,
//             // username: "",
//             // email: "",
//             // password: "",
//             // reEnterPassword: "",
//             isLoading: false,
//             displayName: '',
//             email: '',
//             password: '',
//             mobileNo: "",
//             isSubmitting: false
//         }
//     }
//     createRoom = () => {
//         this.setState({ model_1_Visibility: true })

//     }
//     modalCall() {
//         this.setState({ model_1_Visibility: false,})
//         this.props.navigation.navigate('Login')
//     }
//     updateInputVal = (val, prop) => {
//         const state = this.state;
//         state[prop] = val;
//         this.setState(state);
//     }
//     registerUser = () => {

//         if (this.state.email === '' && this.state.password === '') {
//             Alert.alert('Enter details to signup!')
//         } else {
//             this.setState({
//                 isLoading: true,
//             })
//             firebase
//                 .auth()
//                 .createUserWithEmailAndPassword(this.state.email, this.state.password)
//                 .then((res) => {
//                     res.user.updateProfile({
//                         displayName: this.state.displayName
//                     })

//                     console.log('User registered successfully!')
//                     this.setState({
//                         isLoading: false,
//                         displayName: '',
//                         email: '',
//                         password: ''
//                     })
//                     this.createRoom();
                   
//                 })
//                 .catch(error => this.setState({ errorMessage: error.message, isLoading:false }))
//                 // .catch(error => 
//                 //     MyUtils.showSnackbar(error.message, errorColor))
//                 //     this.setState({isLoading:false})
//         }
//     }
//     togglePwdVisibility() {
//         this.setState({ hidePassword: !this.state.hidePassword });
//     }
//     togglePwdVisibilityRenter() {
//         this.setState({ reEnterHidePassword: !this.state.reEnterHidePassword });
//     }

//     handleOnSignIn(userId) {
//         // MyUtils.resetAndGo(this.props.navigation, "CheckEmail",{id:"300"})
//         this.props.navigation.navigate("CheckEmail", { id: userId, screenNo: 0 })
//     }

//     handleOnSingup() {

//         let { username, email, mobileNo, password, reEnterPassword } = this.state

//         if (username == "" || username.length < 3) {
//             MyUtils.showSnackbar("UserName Must Not be Less Than 3 char", errorColor)
//             return
//         }
//         if (!MyUtils.isNonEmptyString(username)) {
//             MyUtils.showSnackbar("Please Enter Valid UserName", errorColor)
//             return
//         }
//         if (mobileNo == "") {
//             MyUtils.showSnackbar("ContactNo Must Not be Empty", errorColor)
//             return
//         }
//         if (!MyUtils.isNonEmptyString(mobileNo)) {
//             MyUtils.showSnackbar("Please Enter Valid Contact No", errorColor)
//             return
//         }
//         // if (!MyUtils.isValidmobile(mobileNo)) {
//         //     MyUtils.showSnackbar("Enter Your Mobile-No Correctly", errorColor)
//         //     return
//         // }
//         if (!MyUtils.isValidemail(email)) {
//             MyUtils.showSnackbar("Enter Your Email Correctly", errorColor)
//             return
//         }

//         if (password.length < 6) {
//             MyUtils.showSnackbar("Password Must Not be Less Than 6 char", errorColor)
//             return
//         }

//         if (!MyUtils.isNonEmptyString(password)) {
//             MyUtils.showSnackbar("Please Don't Use Spaces As A Password", errorColor)
//             return
//         }

//         if (password != reEnterPassword) {
//             MyUtils.showSnackbar("Password Not Matched", errorColor)
//             return
//         }

//         this.setState({ isSubmitting: true })
//         let data = { username, email, mobileNo, password }
//         let webHandler = new WebHandler()
//         console.log("=====Sending Request To Server=====")
//         webHandler.registerUser(data, (resp) => {
//             MyUtils.showSnackbar("Verify Your Emaail Adress", primaryColor)
//             console.log(resp)
//             this.setState({ isSubmitting: false })
//             this.handleOnSignIn(resp)
//         }, (reason) => {
//             // console.log("i am here")
//             MyUtils.showSnackbar(reason, errorColor)
//             this.setState({ isSubmitting: false })

//         })
//     }



//     checkPasswordStrength(password) {
//         var strength = 0;
//         var testCase1 = /[a-z]+/;
//         var testCase2 = /[A-Z]+/;
//         var testCase3 = /[0-9]+/;
//         var testCase4 = /[$@#&!]+/;

//         if (testCase1.test(password)) {
//             strength += 1;
//         }
//         if (testCase2.test(password)) {
//             strength += 1;
//         }
//         if (testCase3.test(password)) {
//             strength += 1;
//         }

//         if (testCase4.test(password)) {
//             strength += 1;
//         }

//         if (password.length > 5) {

//             switch (strength) {
//                 case 0:
//                     // console.log("========STRENGTH========", 0)
//                     return ("")
//                     break;

//                 case 1:
//                     // console.log("========STRENGTH========", 25)
//                     return ("       Weak")
//                     break;

//                 case 2:
//                     // console.log("========STRENGTH========", 50)
//                     return ("        Medium")
//                     break;

//                 case 3:
//                     // console.log("========STRENGTH========", 75)
//                     return ("        Medium")
//                     break;

//                 case 4:
//                     // console.log("========STRENGTH========", 100)
//                     return ("        Strong")
//                     break;
//             }
//         }
//         else { return ("Min 6 char") }
//     }

//     setPasswordStrengthColor(password) {
//         var strength = 0;
//         var testCase1 = /[a-z]+/;
//         var testCase2 = /[A-Z]+/;
//         var testCase3 = /[0-9]+/;
//         var testCase4 = /[$@#&!]+/;

//         if (testCase1.test(password)) {
//             strength += 1;
//         }
//         if (testCase2.test(password)) {
//             strength += 1;
//         }
//         if (testCase3.test(password)) {
//             strength += 1;
//         }

//         if (testCase4.test(password)) {
//             strength += 1;
//         }
//         switch (strength) {
//             case 0:
//                 // console.log("========STRENGTH========", 0)
//                 return ("#979797")
//                 break;

//             case 1:
//                 // console.log("========STRENGTH========", 25)
//                 return ("#F26A6A")
//                 break;

//             case 2:
//                 // console.log("========STRENGTH========", 50)
//                 return ("#F2C96A")
//                 break;

//             case 3:
//                 // console.log("========STRENGTH========", 75)
//                 return ("#F2C96A")
//                 break;

//             case 4:
//                 // console.log("========STRENGTH========", 100)
//                 return (primaryColor)
//                 break;
//         }

//     }

//     setPasswordStrengthChar(password) {
//         var strength = 0;
//         var testCase1 = /[a-z]+/; //1
//         var testCase2 = /[A-Z]+/;  //2
//         var testCase3 = /[0-9]+/;  //4
//         var testCase4 = /[$@#&!]+/; //8

//         if (testCase1.test(password)) {
//             strength += 1;
//         }
//         if (testCase2.test(password)) {
//             strength += 2;
//         }
//         if (testCase3.test(password)) {
//             strength += 4;
//         }

//         if (testCase4.test(password)) {
//             strength += 8;
//         }
//         switch (strength) {
//             case 0:
//                 // console.log("========STRENGTH========", 0)
//                 return ("#A1a@!")
//                 break;

//             case 1:
//                 // console.log("========STRENGTH========", 25)
//                 return ("#A1@!")
//                 break;

//             case 2:
//                 // console.log("========STRENGTH========", 50)
//                 return ("#1a@!")
//                 break;

//             case 4:
//                 // console.log("========STRENGTH========", 75)
//                 return ("#Aa@!")
//                 break;

//             case 8:
//                 // console.log("========STRENGTH========", 100)
//                 return ("A1a")
//                 break;
//             case 15:
//                 // console.log("========STRENGTH========", 100)
//                 return ("")
//                 break;
//             case 3:
//                 // console.log("========STRENGTH========", 100)
//                 return ("#1@!")
//                 break;
//             case 5:
//                 // console.log("========STRENGTH========", 100)
//                 return ("#A@!")
//                 break;
//             case 9:
//                 // console.log("========STRENGTH========", 100)
//                 return ("A1")
//                 break;
//             case 6:
//                 // console.log("========STRENGTH========", 100)
//                 return ("#a@!")
//                 break;
//             case 10:
//                 // console.log("========STRENGTH========", 100)
//                 return ("1a")
//                 break;
//             case 12:
//                 // console.log("========STRENGTH========", 100)
//                 return ("Aa")
//                 break;
//             case 7:
//                 // console.log("========STRENGTH========", 100)
//                 return ("#@!")
//                 break;
//             case 13:
//                 // console.log("========STRENGTH========", 100)
//                 return ("A")
//                 break;

//         }
//     }



//     render() {
//         const { language, theme } = this.props
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.preloader}>
//                     <ActivityIndicator size="large" color="#9E9E9E" />
//                 </View>
//             )
//         }
//         return (
//             <View style={{ backgroundColor: theme.dimBackground, flex: 1 }}>
//                 <StatusBar backgroundColor={primaryColor} />

//                 <ImageBackground source={require("../images/bg1.jpg")} style={styles.backgroungImage}>
//                     <View style={{ width: ScreenWidth, height: Height(35), backgroundColor: "" }}></View>

//                     <View style={styles.loginTxtView}>
//                         <Text style={styles.loginTxt} >Let's Sign up</Text>
//                         <View style={styles.lineStyle} />
//                     </View>
//                     {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}> */}
//                     {/* <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: Height(1.5) }}> */}
//                     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, marginTop: Height(1.5) }}>

//                         <View style={styles.mainView}>
//                             <View style={styles.innerMainView}>




//                                 <View style={styles.txtInputView}>
//                                     <IoniconsIcon name="person" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
//                                     <TextInput
//                                         style={styles.txtInputStyle}
//                                         autoCapitalize="none"
//                                         autoCorrect={false}
//                                         placeholder="Username *"
//                                         onSubmitEditing={() => { this.contactNo.focus(); }}
//                                         returnKeyType="next"
//                                         value={this.state.displayName}
//                                         onChangeText={(val) => this.updateInputVal(val, 'displayName')}
//                                         value={this.state.username}
//                                         onChangeText={(text) => this.setState({ username: text })}
//                                         placeholderTextColor='#979797' />
//                                 </View>

//                                 {/* <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
//                                     <FontAwesomeIcon name="phone" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
//                                     <TextInput
//                                         style={styles.txtInputStyle}
//                                         autoCapitalize="none"
//                                         autoCorrect={false}
//                                         value={this.state.mobileNo}
//                                         ref={(input) => { this.contactNo = input; }}
//                                         onSubmitEditing={() => { this.email.focus(); }}
//                                         returnKeyType="next"
//                                         onChangeText={(text) => this.setState({ mobileNo: text })}
//                                         keyboardType={"phone-pad"}
//                                         placeholder="Contact No *"
//                                         placeholderTextColor='#979797' />
//                                 </View> */}


//                                 <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
//                                     <IoniconsIcon name="mail" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
//                                     <TextInput
//                                         style={styles.txtInputStyle}
//                                         autoCapitalize="none"
//                                         autoCorrect={false}
//                                         ref={(input) => { this.email = input; }}
//                                         onSubmitEditing={() => { this.password.focus(); }}
//                                         returnKeyType="next"
//                                         // value={this.state.email}
//                                         // onChangeText={(text) => this.setState({ email: text })}
//                                         value={this.state.email}
//                                         onChangeText={(val) => this.updateInputVal(val, 'email')}
//                                         placeholder="Email *"
//                                         placeholderTextColor='#979797' />
//                                 </View>

//                                 {/* ----------------------------------------------------------------------------------------------------------------------- */}
//                                 <View>
//                                     <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
//                                         <FontAwesomeIcon name="lock" style={styles.txtInputIcon} size={FontSize(13)} color={this.setPasswordStrengthColor(this.state.password)} />
//                                         <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: this.setPasswordStrengthColor(this.state.password), justifyContent: "space-between" }}>
//                                             <TextInput
//                                                 style={{ ...textFont, flex: 1, }}
//                                                 autoCapitalize="none"
//                                                 autoCorrect={false}
//                                                 secureTextEntry={this.state.hidePassword}
//                                                 ref={(input) => { this.password = input; }}
//                                                 //onSubmitEditing={() => { this.reEnterpassword.focus(); }}
//                                                 returnKeyType="next"
//                                                 // value={this.state.password}
//                                                 // onChangeText={(text) => this.setState({ password: text })}
//                                                 value={this.state.password}
//                                                 onChangeText={(val) => this.updateInputVal(val, 'password')}
//                                                 placeholder="Password *"
//                                                 placeholderTextColor='#979797'


//                                             />
//                                             <TouchableOpacity
//                                                 onPress={() => this.togglePwdVisibility()}>
//                                                 <Icon name={this.state.hidePassword ? "eye-off" : "eye"} style={{ top: 5, padding: 11.5, left: 0, }} size={FontSize(13)} color="#797979" />
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>

//                                     <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
//                                         <Text style={{ ...textFont, marginRight: 50, color: this.setPasswordStrengthColor(this.state.password) }}>{this.setPasswordStrengthChar(this.state.password)}</Text>

//                                         <Text style={{ ...textFont, color: this.state.password.length > 5 ? this.setPasswordStrengthColor(this.state.password) : this.state.password.length < 1 ? "#797979" : "#ec524b" }}>{this.checkPasswordStrength(this.state.password)}</Text>
//                                     </View>
//                                 </View>
//                                 {/* ----------------------------------------------------------------------------------------------------------------------- */}
//                                 {/* <View style={[styles.txtInputView, { marginTop: Height(0) }]}>
//                                     <FontAwesomeIcon name="lock" style={styles.txtInputIcon} size={FontSize(13)} color="#979797" />
//                                     <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#979797", justifyContent: "space-between" }}>

//                                         <TextInput
//                                             style={{ ...textFont, flex: 1, }}
//                                             autoCapitalize="none"
//                                             autoCorrect={false}
//                                             secureTextEntry={this.state.reEnterHidePassword}
//                                             ref={(input) => { this.reEnterpassword = input; }}
//                                             value={this.state.reEnterPassword}
//                                             onChangeText={(text) => this.setState({ reEnterPassword: text })}
//                                             placeholder="Re-Enter Password *"
//                                             placeholderTextColor='#979797' />
//                                         <TouchableOpacity
//                                             onPress={() => this.togglePwdVisibilityRenter()}>
//                                             <Icon name={this.state.reEnterHidePassword ? "eye-off" : "eye"} style={{ top: 5, padding: 11.5, left: 0, }} size={FontSize(13)} color="#797979" />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View> */}



//                                 <View style={{ marginTop: Height(2), alignItems: 'center', }}>
//                                     {!this.state.isSubmitting &&
//                                         <Button
//                                             theme={theme}
//                                             isFocused={true}
//                                             label={"Sign up"}
//                                             // onPress={() => { this.handleOnSingup() }}
//                                             onPress={() => { this.registerUser() }}
//                                             txtStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
//                                             bgStyle={{
//                                                 backgroundColor: primaryColor,
//                                                 width: ScreenWidth / 2.5,
//                                                 height: Height(6),
//                                                 borderRadius: Width(100), marginLeft: Width(6)
//                                             }}
//                                         />}
//                                     {this.state.isSubmitting &&
//                                         <ActivityIndicator size="large" color={primaryColor} />}
//                                 </View>

//                                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Height(1) }}>
//                                     <Text style={[{ fontSize: 14, color: "#979797", ...textFont }]}>Already user? </Text>
//                                     <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate("Login") }}>
//                                         <Text style={{ fontSize: 14, color: primaryColor, ...textFont }}>Login Here</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 {/* <View style={styles.socailView}>
//                                     <View>
//                                         <TouchableOpacity onPress={() => alert("Facebook")}>
//                                             <Image source={require("../images/facebookIcon.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={{ marginLeft: Width(3) }}>
//                                         <TouchableOpacity onPress={() => alert("Google")}>
//                                             <Image source={require("../images/googleIcon.png")} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View> */}
//                             </View>
//                             <Modal
//                                 animationType="slide"
//                                 transparent={true}
//                                 visible={this.state.model_1_Visibility}
//                                 onRequestClose={() => {
//                                     this.setState({ model_1_Visibility: false })
//                                 }}>
//                                 <View style={styles.centeredViewModel1}>
//                                     <View style={styles.modalViewModel1}>
//                                         <IoniconsIcon name={"md-checkmark-done-sharp"} color="#fff" size={Width(15)} style={{ backgroundColor: primaryColor, borderRadius: 100, top: 3, alignSelf: "center", width: 60, height: 60 }} />

//                                         <TouchableOpacity style={{ margin: Width(2), alignSelf: "center", top: 20 }}>
//                                             <Text style={{ ...textFont }}>Session Created Successfully</Text>
//                                         </TouchableOpacity>
//                                         <View style={{ alignSelf: "center",marginTop:Height(3), }}>
//                                             <TouchableOpacity style={{backgroundColor:primaryColor,padding:Width(2),borderRadius:10,marginHorizontal:Width(10)}} onPress={() => { this.modalCall() }}>
//                                                 <Text style={{...mediumTextFont,fontSize:18,textAlign:"center",color:"#fff"}}>Continue...</Text>
//                                             </TouchableOpacity>
//                                             {/* <Button
//                                                 style={{
//                                                     justifyContent: 'center',
//                                                     alignItems: 'center',
                                                 
//                                                 }}
//                                                 onPress={() => { this.modalCall() }}
//                                                 title="Continue..."
//                                                 color={primaryColor}

//                                             /> */}
//                                         </View>
//                                         {/* <TouchableOpacity style={{zIndex:-999,position:"relative",margin: Width(2),left: 55,top:20, backgroundColor: primaryColor, width: Width(35), height: Height(5), borderRadius: 100, alignSelf:"center" }}
//               onPress={() => {
//                 this.setState({ model_1_Visibility: false })
//               }}>
//               <Text style={{ ...mediumTextFont, color: "#fff", textAlign: "center", fontSize: FontSize(15),top:5 }}>Go Home</Text>
//             </TouchableOpacity> */}

//                                     </View>
//                                 </View>
//                             </Modal>
//                         </View>


//                         {/* </KeyboardAvoidingView> */}
//                     </ScrollView>

//                 </ImageBackground>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//     },
//     backgroungImage: {
//         flex: 1,
//         resizeMode: "cover",
//         justifyContent: "center",
//         width: ScreenWidth,
//         height: ScreenHeight
//     },
//     mainView: {
//         paddingVertical: Height(1),
//         flex: 1,
//         alignItems: "center",
//     },
//     innerMainView: {
//         // marginTop:Height(32),
//         width: '70%'
//     },
//     loginTxtView: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         // marginBottom: Height(1)
//     },
//     loginTxt: {
//         color: '#646464',
//         fontSize: 25,
//         fontWeight: '700',
//         textAlign: "center",
//     },
//     lineStyle: {
//         borderWidth: 2,
//         borderColor: primaryColor,
//         marginLeft: Width(16),
//         width: Width(24),
//         borderRadius: Width(7)
//     },
//     txtInputView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     txtInputIcon: { position: 'relative', paddingRight: 10, right: -4 },
//     txtInputStyle: {
//         flex: 1, borderBottomWidth: 1, borderBottomColor: '#979797', height: Height(6)
//     },
//     touchView: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: Height(6),
//         width: Width(12),
//         backgroundColor: 'white',
//         borderRadius: Width(100),
//         marginLeft: Width(4),
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,
//         elevation: 6,

//     },
//     socailView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: Height(1)
//     },
//     appNameCSS: {
//         fontSize: FontSize(24), ...boldTextFont,
//         color: "#fff", textAlign: "center",
//         // marginVertical: Height(3)
//     },
//     centeredViewModel1: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: Height(13)
//     },
//     modalViewModel1: {
//         width: ScreenWidth / 1.3,
//         // margin: 20,
//         backgroundColor: "#fff",
//         borderRadius: 20,
//         padding: Width(4),
//         height: 200,
//         alignItems: "flex-start",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5
//     },
// })

// export default connect(ReducersProps, null)(Signup)
