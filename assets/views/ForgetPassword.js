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

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      email: '',
    };
  }

  handleOnVerify() {
    this.props.navigation.navigate('CheckEmail');
    // let {email} = this.state

    // if (!MyUtils.isValidemail(email)) {
    //     MyUtils.showSnackbar("Enter Your Email Correctly", errorColor)
    //     return
    // }

    // this.setState({ isSubmitting: true })
    // let data = {email}
    // let webHandler = new WebHandler()
    // console.log("=====Sending Request To Server=====")
    // webHandler.forgetPassword(data, (resp) => {
    //     MyUtils.showSnackbar("Verification Code Sent Check Your EMAIL", primaryColor)
    //     // console.log("xxxxxx",resp)
    //     this.setState({ isSubmitting: false })
    //     this.props.navigation.navigate("CheckEmail",{id:resp,screenNo:1})
    //     // this.redirectToMainScreen()
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

        {/* <Image
          style={{marginLeft: Height(-3)}}
          resizeMode="center"
          // todo set
          // source={require('../images/check_Email.png')}
          // source={require('../images/avatar.png')}
        /> */}

        <View style={{top: Height(-5)}}>
          <View style={styles.loginTxtView}>
            <Text style={styles.loginTxt}>Enter EMAIL</Text>
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
              Enter your Registerd Email ,{'\n'}To get verification code{' '}
            </Text>
          </View>

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
              // onSubmitEditing={() => { this.password.focus(); }}
              returnKeyType="next"
              value={this.state.email}
              onChangeText={(text) => this.setState({email: text})}
              placeholderTextColor="#979797"
            />
          </View>

          <View style={{marginTop: Height(3), alignItems: 'center'}}>
            {!this.state.isSubmitting && (
              <Button
                theme={theme}
                isFocused={true}
                label={'Verify'}
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
    marginLeft: Width(19),
    borderColor: primaryColor,
    width: Width(20),
    borderRadius: Width(7),
  },
  txtInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Width(15),
    marginVertical: Height(3),
  },

  txtInputIcon: {position: 'relative', paddingRight: 10, right: -4},
  txtInputStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    ...textFont,
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

export default connect(ReducersProps, null)(ForgetPassword);
