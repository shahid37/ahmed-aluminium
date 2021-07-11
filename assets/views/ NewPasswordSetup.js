import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {
  boldTextFont,
  Empty,
  errorColor,
  primaryColor,
  textDefault,
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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../views/reuseable/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import WebHandler from '../data/remote/WebHandler';
import Utils from '../utils/Utils';
import Prefmanager from '../data/local/prefManager';

const MyUtils = new Utils();
const prefs = new Prefmanager();

class NewPasswordSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      keepToLoggedIn: false,
      hidePassword: true,
      reEnterHidePassword: true,
      //id: props.route.params.userID,
      // id: 41,
      password: '',
      reEnterPassword: '',
    };
  }
  togglePwdVisibility() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  togglePwdVisibilityRenter() {
    this.setState({reEnterHidePassword: !this.state.reEnterHidePassword});
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
          return '';
          break;

        case 1:
          // console.log("========STRENGTH========", 25)
          return '       Weak';
          break;

        case 2:
          // console.log("========STRENGTH========", 50)
          return '        Medium';
          break;

        case 3:
          // console.log("========STRENGTH========", 75)
          return '        Medium';
          break;

        case 4:
          // console.log("========STRENGTH========", 100)
          return '        Strong';
          break;
      }
    } else {
      return 'Min 6 char';
    }
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
        return '#979797';
        break;

      case 1:
        // console.log("========STRENGTH========", 25)
        return '#F26A6A';
        break;

      case 2:
        // console.log("========STRENGTH========", 50)
        return '#F2C96A';
        break;

      case 3:
        // console.log("========STRENGTH========", 75)
        return '#F2C96A';
        break;

      case 4:
        // console.log("========STRENGTH========", 100)
        return primaryColor;
        break;
    }
  }

  setPasswordStrengthChar(password) {
    var strength = 0;
    var testCase1 = /[a-z]+/; //1
    var testCase2 = /[A-Z]+/; //2
    var testCase3 = /[0-9]+/; //4
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
        return '#A1a@!';
        break;

      case 1:
        // console.log("========STRENGTH========", 25)
        return '#A1@!';
        break;

      case 2:
        // console.log("========STRENGTH========", 50)
        return '#1a@!';
        break;

      case 4:
        // console.log("========STRENGTH========", 75)
        return '#Aa@!';
        break;

      case 8:
        // console.log("========STRENGTH========", 100)
        return 'A1a';
        break;
      case 15:
        // console.log("========STRENGTH========", 100)
        return '';
        break;
      case 3:
        // console.log("========STRENGTH========", 100)
        return '#1@!';
        break;
      case 5:
        // console.log("========STRENGTH========", 100)
        return '#A@!';
        break;
      case 9:
        // console.log("========STRENGTH========", 100)
        return 'A1';
        break;
      case 6:
        // console.log("========STRENGTH========", 100)
        return '#a@!';
        break;
      case 10:
        // console.log("========STRENGTH========", 100)
        return '1a';
        break;
      case 12:
        // console.log("========STRENGTH========", 100)
        return 'Aa';
        break;
      case 7:
        // console.log("========STRENGTH========", 100)
        return '#@!';
        break;
      case 13:
        // console.log("========STRENGTH========", 100)
        return 'A';
        break;
    }
  }

  handleOnVerify() {
    MyUtils.resetAndGo(this.props.navigation, 'Login');
    // let { id, password, reEnterPassword } = this.state

    // if (password.length < 6) {
    //     MyUtils.showSnackbar("Password Must Not be Less Than 6 char", errorColor)
    //     return
    // }

    // if (password != reEnterPassword) {
    //     MyUtils.showSnackbar("Password Not Matched", errorColor)
    //     return
    // }

    // // var a = id.replace("\"", ""); a = a.replace("\"", "")
    // // var user_id = parseInt(a, 10);
    // console.log("id>>>>", id)

    // this.setState({ isSubmitting: true })
    // let data = { password, id }
    // let webHandler = new WebHandler()
    // console.log("=====Sending Request To Server=====")
    // webHandler.setupNewPassowrd(data, (resp) => {
    //     MyUtils.showSnackbar("New Password Setup Successfully", primaryColor)
    //     console.log(resp)
    //     this.setState({ isSubmitting: false })
    //     MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation')
    // }, (reason) => {
    //     // console.log("i am here")
    //     MyUtils.showSnackbar(reason, errorColor)
    //     this.setState({ isSubmitting: false })

    // })
  }

  render() {
    const {language, theme} = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff', flex: 1}}>
        <StatusBar backgroundColor="#fff" />
        // todo
        {/* <Image
          style={{
            width: ScreenWidth,
            height: Height(25),
            marginTop: Height(10),
            marginBottom: Height(10),
          }}
          resizeMode="contain"
          source={require('../images/intro3.png')}
        /> */}
        <View style={{top: Height(-5)}}>
          <View style={styles.loginTxtView}>
            <Text style={styles.loginTxt}>Setup New Password</Text>
            <View style={styles.lineStyle} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Height(2),
            }}>
            <Text
              style={[
                {
                  fontSize: FontSize(12),
                  textAlign: 'center',
                  color: '#4D4D4D',
                  ...textFont,
                },
              ]}>
              Setup Your New Strong Password,{'\n'}You are going to use it for
              next login
            </Text>
          </View>

          <View>
            <View style={[styles.txtInputView, {marginTop: Height(0)}]}>
              <FontAwesomeIcon
                name="lock"
                style={styles.txtInputIcon}
                size={FontSize(13)}
                color={this.setPasswordStrengthColor(this.state.password)}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: this.setPasswordStrengthColor(
                    this.state.password,
                  ),
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={{...textFont, flex: 1}}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={this.state.hidePassword}
                  ref={(input) => {
                    this.password = input;
                  }}
                  onSubmitEditing={() => {
                    this.reEnterpassword.focus();
                  }}
                  returnKeyType="next"
                  value={this.state.password}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholder="Password *"
                  placeholderTextColor="#979797"
                />
                <TouchableOpacity onPress={() => this.togglePwdVisibility()}>
                  <Icon
                    name={this.state.hidePassword ? 'eye-off' : 'eye'}
                    style={{top: 5, padding: 11.5, left: 0}}
                    size={FontSize(13)}
                    color="#797979"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  ...textFont,
                  marginRight: 50,
                  color: this.setPasswordStrengthColor(this.state.password),
                }}>
                {this.setPasswordStrengthChar(this.state.password)}
              </Text>

              <Text
                style={{
                  ...textFont,
                  color:
                    this.state.password.length > 5
                      ? this.setPasswordStrengthColor(this.state.password)
                      : this.state.password.length < 1
                      ? '#797979'
                      : '#ec524b',
                }}>
                {this.checkPasswordStrength(this.state.password)}
              </Text>
            </View>
          </View>
          {/* ----------------------------------------------------------------------------------------------------------------------- */}
          <View style={[styles.txtInputView, {marginTop: Height(1.5)}]}>
            <FontAwesomeIcon
              name="lock"
              style={styles.txtInputIcon}
              size={FontSize(13)}
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
                secureTextEntry={this.state.reEnterHidePassword}
                ref={(input) => {
                  this.reEnterpassword = input;
                }}
                value={this.state.reEnterPassword}
                onChangeText={(text) => this.setState({reEnterPassword: text})}
                placeholder="Re-Enter Password *"
                placeholderTextColor="#979797"
              />
              <TouchableOpacity
                onPress={() => this.togglePwdVisibilityRenter()}>
                <Icon
                  name={this.state.reEnterHidePassword ? 'eye-off' : 'eye'}
                  style={{top: 5, padding: 11.5, left: 0}}
                  size={FontSize(13)}
                  color="#797979"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: Height(8), alignItems: 'center'}}>
            {!this.state.isSubmitting && (
              <Button
                theme={theme}
                isFocused={true}
                label={'Done'}
                onPress={() => {
                  this.handleOnVerify();
                }}
                txtStyle={{paddingVertical: 0, paddingHorizontal: 0}}
                bgStyle={{
                  backgroundColor: primaryColor,
                  width: ScreenWidth / 2.5,
                  height: Height(6),
                  borderRadius: Width(100),
                }}
              />
            )}
            {this.state.isSubmitting && (
              <ActivityIndicator size="large" color={primaryColor} />
            )}
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: Height(4),
    flex: 1,
    alignItems: 'center',
  },
  innerMainView: {
    // marginTop:Height(32),
    width: '70%',
  },
  loginTxtView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Height(1),
  },
  loginTxt: {
    color: '#646464',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  lineStyle: {
    borderWidth: 2,
    marginLeft: Width(36),
    borderColor: primaryColor,
    width: Width(32),
    borderRadius: Width(7),
  },
  txtInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Width(13),
    marginVertical: Height(1),
  },

  txtInputIcon: {position: 'relative', paddingRight: 10, right: -4},
  txtInputStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    height: Height(5),
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: Width(10),
    height: Height(5),
    borderWidth: 0,
    borderBottomWidth: Width(0.4),
    color: '#000',
    borderBottomColor: '#000',
  },

  underlineStyleHighLighted: {
    borderBottomColor: primaryColor,
  },
});

export default connect(ReducersProps, null)(NewPasswordSetup);
