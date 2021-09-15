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
import CIcon from 'react-native-vector-icons/MaterialIcons';
import Button from '../views/reuseable/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import WebHandler from '../data/remote/WebHandler';
import Utils from '../utils/Utils';
import Prefmanager from '../data/local/prefManager';

const MyUtils = new Utils();
const prefs = new Prefmanager();

class CheckEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepToLoggedIn: false,
      hidePassword: true,
      // id: props.route.params.id,
      // screenNo:props.route.params.screenNo,
      screenNo: 0,
      // id: "\"41\"",
      // code: "",
      isSubmitting: false,
    };
  }
  togglePwdVisibility() {
    this.setState({hidePassword: !this.state.hidePassword});
  }

  handleEmailVerifyed(resp) {
    console.log('>>>>>>>>>>>>>>', resp);
  }

  redirectToMainScreen() {
    prefs.isUserLoggedIn((isLoggedIn) => {
      if (isLoggedIn) {
        MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation');
      }
    });
  }

  handleOnForgetPasswordSite() {
    this.props.navigation.navigate('NewPasswordSetup');
    // let { id, code } = this.state

    // var a = id.replace("\"", ""); a = a.replace("\"", "")
    // var user_id = parseInt(a, 10);

    // if (code == "") {
    //     MyUtils.showSnackbar("Please Enter a Verfication Code", errorColor)
    //     return
    // }

    // this.setState({ isSubmitting: true })
    // let data = { code, user_id }
    // let webHandler = new WebHandler()
    // console.log("=====Sending Request To Server=====")
    // webHandler.forgetPasswordEmailVerify(data, (resp) => {
    //     MyUtils.showSnackbar("Email Verifyed Successfully", primaryColor)
    //     console.log("xxxxxxxpop",resp)
    //     this.setState({ isSubmitting: false })
    //     // MyUtils.resetAndGo(this.props.navigation, 'NewPasswordSetup')
    //     this.props.navigation.navigate("NewPasswordSetup",{userID:user_id})
    // }, (reason) => {
    //     // console.log("i am here")
    //     MyUtils.showSnackbar(reason, errorColor)
    //     this.setState({ isSubmitting: false })

    // })
  }

  handleOnVerify() {
    let {id, code} = this.state;

    var a = id.replace('"', '');
    a = a.replace('"', '');
    var user_id = parseInt(a, 10);

    if (code == '') {
      MyUtils.showSnackbar('Please Enter a Verfication Code', errorColor);
      return;
    }

    this.setState({isSubmitting: true});
    let data = {code, user_id};
    let webHandler = new WebHandler();
    console.log('=====Sending Request To Server=====');
    webHandler.verifyRegisterUser(
      data,
      (resp) => {
        MyUtils.showSnackbar('Email Verifyed Successfully', primaryColor);
        console.log(resp);
        this.setState({isSubmitting: false});
        this.redirectToMainScreen();
      },
      (reason) => {
        // console.log("i am here")
        MyUtils.showSnackbar(reason, errorColor);
        this.setState({isSubmitting: false});
      },
    );
  }

  handleOnResendEmail() {
    // let { id } = this.state
    // var a = id.replace("\"", ""); a = a.replace("\"", "")
    // var user_id = parseInt(a, 10);
    // console.log(">>>>>>>", user_id)
    // let data = { user_id }
    // let webHandler = new WebHandler()
    // console.log("=====Sending Request To Server=====")
    // webHandler.ResendVerificationMail(data, (resp) => {
    //     MyUtils.showSnackbar("Email Send Successfully", primaryColor)
    // }, (reason) => {
    //     MyUtils.showSnackbar(reason, errorColor)
    // })
  }

  render() {
    const {language, theme} = this.props;
    // const { id } = this.route.params;
    return (
      // <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff', flex: 1}}>
        {console.log(this.state.id)}
        {/* <ScrollView contentContainerStyle={{flex:1}} > */}
        <StatusBar backgroundColor="#fff" />
        <Image
          style={{marginLeft: Height(-3)}}
          resizeMode="center"
          source={require('../images/check_Email.png')}
        />
        <View style={{top: Height(-5)}}>
          <View style={styles.loginTxtView}>
            <Text style={styles.loginTxt}>Check Email</Text>
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
              We just sent a verification code to given Email.{'\n'} Please
              check your email and enter the{'\n'}4 digit verification code
              below
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <OTPInputView
              style={{width: ScreenWidth / 1.4, height: Height(8)}}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad={true}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                this.setState({code: code});
                console.log(code);
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>

          <View style={{marginTop: Height(3), alignItems: 'center'}}>
            {!this.state.isSubmitting && (
              <Button
                theme={theme}
                isFocused={true}
                label={'Verify'}
                onPress={() => {
                  // if(this.state.screenNo==0){this.handleOnVerify() }
                  if (this.state.screenNo == 0) {
                    this.handleOnForgetPasswordSite();
                  }
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

          {this.state.screenNo == 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Height(2),
              }}>
              <Text style={[{fontSize: 14, color: '#979797', ...textFont}]}>
                If you not received email{' '}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.handleOnResendEmail()}>
                <Text style={{fontSize: 14, color: primaryColor, ...textFont}}>
                  Resend Here
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* </ScrollView> */}
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
    marginLeft: Width(21),
    borderColor: primaryColor,
    width: Width(19),
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
    height: Height(8),
    borderWidth: 0,
    borderBottomWidth: Width(0.4),
    color: '#000',
    borderBottomColor: '#000',
  },

  underlineStyleHighLighted: {
    borderBottomColor: primaryColor,
  },
});

export default connect(ReducersProps, null)(CheckEmail);
