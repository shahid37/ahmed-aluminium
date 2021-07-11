import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {
  boldTextFont,
  Empty,
  primaryColor,
  errorColor,
  textDefault,
  mediumTextFont,
  textFont,
  Headingstyle,
} from '../utils/Style';
import ReducersProps from '../data/local/reducers/ReducersProps';
//import FIcons from 'react-native-vector-icons/Feather'
import {
  FontSize,
  Height,
  ScreenWidth,
  Width,
  ScreenHeight,
} from '../utils/Dimensions';
import {connect} from 'react-redux';
import AppConfig from '../utils/AppConfig';
import Icon from 'react-native-vector-icons/Feather';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../views/reuseable/Button';
import WebHandler from '../data/remote/WebHandler';
import Prefmanager from '../data/local/prefManager';
import Utils from '../utils/Utils';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../views/Firebasedb';
const MyUtils = new Utils();
const prefs = new Prefmanager();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepToLoggedIn: false,
      hidePassword: true,
      isfingerprint: true,
      model_1_Visibility: false,
      // email: "weloka1888@laklica.com",
      // password: "asdfgh",
      dataImp: [],
      // email: "",
      // password: "",
      email: '',
      password: '',
      isLoading: false,
      isSubmitting: false,
      showFingerPrint: false,
    };
  }
  createRoom = () => {
    // this.setState({ model_1_Visibility: true })
    this.props.navigation.navigate('BottomNavigation');
  };
  // modalCall() {
  //     this.setState({ model_1_Visibility: false, })
  //     this.props.navigation.navigate('BottomNavigation')
  // }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    let {email, password, keepToLoggedIn} = this.state;

    if (!MyUtils.isValidemail(email)) {
      MyUtils.showSnackbar('Enter Your Email Correctly', errorColor);
      return;
    }
    if (password == '') {
      MyUtils.showSnackbar('Password Must Not be Empty', errorColor);
      return;
    }

    if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          // let userInfo = [this.state.email, this.state.password]
          // this.setState({ userData: JSON.stringify(res.user) });
          console.log('===============>', res.user.email);
          let obj = {
            email: res.user.email,
            password: res.user.password,
            displayName: res.user.displayName,
          };
          AsyncStorage.setItem('user', JSON.stringify(obj));
          console.log('User logged-in successfully!');
          console.log('Login Data ', res);
          console.log('User Data ', obj);
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          this.createRoom();
        })
        .catch((error) =>
          this.setState({errorMessage: error.message, isLoading: false}),
        );
      // .catch(error =>
      //MyUtils.showSnackbar("Wrong credential", errorColor)
      //     this.setState({isLoading:false})
    }
  };
  checkFingerPrintAvailability() {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        console.log('>>>>>>>>', biometryType);
        this.setState({showFingerPrint: true});
      })
      .catch((error) => {
        if (error.biometric == undefined) {
          console.log('FingerPrint is not Available in This device');
          this.setState({showFingerPrint: false});
        }
        if (error.biometric == 'Biometrics') {
          // show message
          console.log(error.name);
        }
      });
  }

  getUserEmailPassword() {
    prefs.getSaveEmailPassword((emailPass) => {
      if (emailPass) {
        const email = emailPass[0];
        const password = emailPass[1];
        console.log('Email Retrive as: ', emailPass[0]);
        console.log('Password Retrive as: ', emailPass[1]);

        this.setState({isSubmitting: true});
        let data = {email, password};
        let webHandler = new WebHandler();
        console.log('=====Sending Request To Server=====');
        webHandler.loginUser(
          data,
          (resp) => {
            MyUtils.showSnackbar('Successfully loged In', primaryColor);
            this.setState({isSubmitting: false});
            prefs.saveUserSessionDataTEMP(resp, 'true');
            this.startAfterDelay(100, 'BottomNavigation');
          },
          (reason) => {
            MyUtils.showSnackbar(reason, errorColor);
            this.setState({isSubmitting: false});
          },
        );
      }
    });
  }

  fingerPrintModelPopUp() {
    FingerprintScanner.release();
    prefs.checkFingerPrintStatus((isLoggedIn) => {
      if (isLoggedIn) {
        FingerprintScanner.authenticate({
          title: 'Log In',
          description: 'Scan Your FingerPrint To Continue...',
        })
          .then(() => {
            //   this.props.handlePopupDismissed();
            console.log('Authenticated successfully');
            this.getUserEmailPassword();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
      }
    });
  }

  // componentDidMount() {

  //     this.checkFingerPrintAvailability()
  //     this.fingerPrintModelPopUp()

  // }

  togglePwdVisibility() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  startAfterDelay(delay, routeName) {
    setTimeout(() => {
      MyUtils.resetAndGo(this.props.navigation, routeName);
    }, delay);
  }

  handleOnSingIN() {
    this.startAfterDelay(100, 'BottomNavigation');
    // let { email, password, keepToLoggedIn } = this.state

    // if (!MyUtils.isValidemail(email)) {
    //     MyUtils.showSnackbar("Enter Your Email Correctly", errorColor)
    //     return
    // }
    // if (password == "") {
    //     MyUtils.showSnackbar("Password Must Not be Empty", errorColor)
    //     return
    // }
    // var userInfo = [email, password]
    // prefs.saveEmailPassword(userInfo)

    // this.setState({ isSubmitting: true })
    // let data = { email, password }
    // let webHandler = new WebHandler()
    // console.log("=====Sending Request To Server=====")
    // webHandler.loginUser(data, (resp) => {
    //     MyUtils.showSnackbar("Successfully loged In", primaryColor)
    //     this.setState({ isSubmitting: false })
    //     if (keepToLoggedIn == true) {
    //         prefs.saveUserSessionData(resp)
    //         prefs.saveUserSessionDataTEMP(resp,'false')
    //         this.startAfterDelay(100, 'BottomNavigation')
    //         // MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation')
    //         //  prefs.isUserLoggedIn(isLoggedIn => {
    //         //     if (isLoggedIn) {
    //         //         console.log("user data saved for next login")
    //         //         MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation')
    //         //     }
    //         // })
    //     }
    //     else {
    //         // console.log("user data not saved")
    //         prefs.saveUserSessionDataTEMP(resp,'false')
    //         this.startAfterDelay(100, 'BottomNavigation')
    //         // MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation')
    //     }
    //     // prefs.saveUserSessionDataTEMP(resp)
    //     // console.log(">>>>>>>>runiinggggggg")

    // }, (reason) => {
    //     MyUtils.showSnackbar(reason, errorColor)
    //     this.setState({ isSubmitting: false })

    // })
  }

  render() {
    const {language, theme} = this.props;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={{backgroundColor: theme.dimBackground, flex: 1}}>
        <StatusBar backgroundColor={primaryColor} />

        <ImageBackground
          source={require('../images/bg1.jpg')}
          style={styles.backgroungImage}>
          <View
            style={{
              width: ScreenWidth,
              height: Height(35),
              backgroundColor: '',
            }}></View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, marginTop: Height(1.5)}}>
            {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}> */}

            <View style={styles.mainView}>
              <View style={styles.innerMainView}>
                <View style={styles.loginTxtView}>
                  <Text style={styles.loginTxt}>Let's Login</Text>
                  <View style={styles.lineStyle} />
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  <View style={styles.txtInputView}>
                    <Icon
                      name="user"
                      style={styles.txtInputIcon}
                      size={15}
                      color="#979797"
                    />
                    <TextInput
                      style={styles.txtInputStyle}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Email *"
                      onSubmitEditing={() => {
                        this.password.focus();
                      }}
                      returnKeyType="next"
                      // value={this.state.email}
                      // onChangeText={(text) => this.setState({ email: text })}
                      value={this.state.email}
                      onChangeText={(val) => this.updateInputVal(val, 'email')}
                      placeholderTextColor="#979797"
                    />
                  </View>
                  <View style={[styles.txtInputView, {marginTop: Height(1.3)}]}>
                    <Icon
                      name="lock"
                      style={styles.txtInputIcon}
                      size={15}
                      color="#979797"
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: '#979797',
                        justifyContent: 'space-between',
                      }}>
                      <TextInput
                        style={{...textFont, flex: 1}}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={this.state.hidePassword}
                        // value={this.state.password}
                        ref={(input) => {
                          this.password = input;
                        }}
                        // onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        onChangeText={(val) =>
                          this.updateInputVal(val, 'password')
                        }
                        placeholder="Password *"
                        placeholderTextColor="#979797"
                      />
                      <TouchableOpacity
                        onPress={() => this.togglePwdVisibility()}>
                        <Icon
                          name={this.state.hidePassword ? 'eye-off' : 'eye'}
                          style={{top: 5, padding: 11, left: 0}}
                          size={16}
                          color="#797979"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.txtInputView,
                      {marginTop: Height(2.5), alignSelf: 'center'},
                    ]}>
                    <TouchableOpacity
                      style={{padding: 1}}
                      onPress={() =>
                        this.setState({
                          keepToLoggedIn: !this.state.keepToLoggedIn,
                        })
                      }>
                      <CIcon
                        name={
                          this.state.keepToLoggedIn
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        style={{
                          position: 'relative',
                          paddingRight: 10,
                          right: -4,
                          top: -1,
                        }}
                        size={15}
                        color={primaryColor}
                      />
                    </TouchableOpacity>
                    <Text style={{...textFont, color: '#979797'}}>
                      Keep me logged in
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.txtInputView,
                      {marginTop: Height(3), alignSelf: 'center'},
                    ]}>
                    {!this.state.isSubmitting && (
                      <Button
                        theme={theme}
                        isFocused={true}
                        label={'Login'}
                        // onPress={() => this.handleOnSingIN()}
                        onPress={() => this.userLogin()}
                        txtStyle={{paddingVertical: 0, paddingHorizontal: 0}}
                        bgStyle={{
                          backgroundColor: primaryColor,
                          width: ScreenWidth / 2.5,
                          height: Height(6),

                          borderRadius: Width(100),
                          marginLeft: Width(6),
                        }}
                      />
                    )}

                    {this.state.isSubmitting && (
                      <ActivityIndicator
                        size="large"
                        color={primaryColor}
                        style={{marginLeft: Width(25), marginRight: Width(5)}}
                      />
                    )}

                    {/* {this.state.showFingerPrint &&
                                            <View style={styles.touchView}>
                                                <TouchableOpacity 
                                                onPress={()=>{
                                                    this.fingerPrintModelPopUp()
                                                    // this.componentDidMount()
                                                }}
                                                >
                                                    <Image source={require("../images/touch.png")} />
                                                </TouchableOpacity>
                                            </View>} */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: Height(2),
                    }}>
                    <Text
                      style={[{fontSize: 14, color: '#979797', ...textFont}]}>
                      Forgot Password?{' '}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        this.props.navigation.navigate('ForgetPassword');
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: primaryColor,
                          ...textFont,
                        }}>
                        Click Here
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: Height(1),
                    }}>
                    <Text
                      style={[{fontSize: 14, color: '#979797', ...textFont}]}>
                      Not a user?{' '}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        this.props.navigation.navigate('Signup');
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: primaryColor,
                          ...textFont,
                        }}>
                        Register Here
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={styles.socailView}>
                                    <View>
                                    <TouchableOpacity  onPress={() => alert("Facebook")}>
                                    <Image source={require("../images/facebookIcon.png")}  />
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{marginLeft:Width(3)}}>
                                    <TouchableOpacity  onPress={() => alert("Google")}>
                                    <Image source={require("../images/googleIcon.png")}  />
                                    </TouchableOpacity>
                                    </View>
                            </View> */}
                </ScrollView>
              </View>
            </View>

            {/* </KeyboardAvoidingView> */}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.model_1_Visibility}
            onRequestClose={() => {
              this.setState({model_1_Visibility: false});
            }}>
            <View style={styles.centeredViewModel1}>
              <View style={styles.modalViewModel1}>
                <Ionicons
                  name={'md-checkmark-done-sharp'}
                  color="#fff"
                  size={Width(15)}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 100,
                    top: 3,
                    alignSelf: 'center',
                    width: 60,
                    height: 60,
                  }}
                />

                <TouchableOpacity
                  style={{margin: Width(2), alignSelf: 'center', top: 20}}>
                  <Text style={{...textFont}}>Login Successfully</Text>
                </TouchableOpacity>
                <View style={{alignSelf: 'center', marginTop: Height(3)}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      borderRadius: 10,
                      marginHorizontal: Width(10),
                    }}
                    onPress={() => {
                      this.modalCall();
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Continue...
                    </Text>
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
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroungImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  mainView: {
    paddingVertical: Height(2),
    flex: 1,
    alignItems: 'center',
  },
  innerMainView: {
    // marginTop: Height(32),
    width: '70%',
  },
  loginTxtView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Height(2),
  },
  loginTxt: {
    color: '#646464',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  lineStyle: {
    borderWidth: 2,
    marginLeft: Width(18),
    borderColor: primaryColor,
    width: Width(20),
    borderRadius: Width(7),
  },
  txtInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  txtInputIcon: {position: 'relative', paddingRight: 10, right: -4},
  txtInputStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    ...textFont,
    //  backgroundColor:"#000",
    //  marginTop:0
    //  height: Height(5)
  },
  touchView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Height(6),
    width: Width(12),
    backgroundColor: 'white',
    borderRadius: Width(100),
    marginLeft: Width(4),
    shadowColor: '#000',
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
    marginTop: Height(1),
  },
  appNameCSS: {
    fontSize: FontSize(24),
    ...boldTextFont,
    color: '#fff',
    textAlign: 'center',
    // marginVertical: Height(3)
  },
  centeredViewModel1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Height(13),
  },
  modalViewModel1: {
    width: ScreenWidth / 1.3,
    // margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: Width(4),
    height: 200,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default connect(ReducersProps, null)(Login);
