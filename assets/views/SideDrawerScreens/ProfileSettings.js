import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ReducersProps from '../../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
import {
  mediumTextFont,
  textFont,
  primaryColor,
  fontColor,
  defaultFont,
  secondryColor,
} from '../../utils/Style';
import Utils from '../../utils/Utils';
import {FontSize, Height, ScreenWidth, Width} from '../../utils/Dimensions';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import Button from '../../views/reuseable/Button';
import Prefmanager from '../../data/local/prefManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../views/Firebasedb';
const MyUtils = new Utils();
const prefs = new Prefmanager();

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
      curTab: 1,
      uid: '',
      name: '',
      email: '',
      keepToLoggedIn: false,
      profilePic:
        'https://i1.wp.com/widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png?resize=217%2C217&ssl=1',
    };
  }
  // componentDidMount()
  //{
  //   alert(JSON.stringify(this.props))
  //   this.props.navigation.navigate('ParticipatedChallenges')
  // }
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({errorMessage: error.message}));
  };
  async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    this.setState({name: parsed.displayName});
    let email = await AsyncStorage.getItem('user');
    let parsed2 = JSON.parse(email);
    this.setState({email: parsed2.email});
    // prefs.checkFingerPrintStatus(isLoggedIn => {
    //   console.log(isLoggedIn)
    //   if (isLoggedIn) { this.setState({ keepToLoggedIn: true }) }
    //   else { this.setState({ keepToLoggedIn: false }) }
    // })
  }

  fingerprintLoginWorking() {
    if (this.state.keepToLoggedIn == true) {
      prefs.fingerPrintStatusWrite('true');
    }
    if (this.state.keepToLoggedIn == false) {
      prefs.fingerPrintStatusWrite('false');
    }
  }
  Information(info, icon) {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: Height(5),
            top: -60,
            alignContent: 'center',
            width: Width(84),
            left: 4,
            alignItems: 'center',
            padding: 9,
            justifyContent: 'space-between',
            marginHorizontal: Width(6),
            borderRadius: 100,
            borderWidth: Width(0.1),
            borderColor: primaryColor,
            marginTop: 5,
            backgroundColor: 'white',
            borderColor: '#E1E1E1',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.53,
            shadowRadius: 10.97,

            elevation: 2,
          }}>
          <AntDesignIcons
            name={icon}
            color="#676767"
            size={Width(5)}
            style={{marginHorizontal: Width(1)}}
          />
          <Text
            style={{
              ...textFont,
              fontSize: FontSize(11),
              top: 9,
              color: fontColor,
              alignSelf: 'flex-start',
              position: 'absolute',
              marginLeft: Width(13),
            }}>
            {info}
          </Text>
        </View>
      </View>
    );
  }
  challengesDisplayDesign = () => {
    return (
      <View style={{top: Height(-6), height: Height(57)}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {/* <View style={{}}>
            <View style={{
              borderRadius: 15, width: Width(22), marginHorizontal: Width(2), padding: Height(1.7), flexDirection: "column", backgroundColor: "#fff", alignItems: "center", margin: Height(1), shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}
              onPress={() => { }}
            >
              <TouchableOpacity onPress={() => {
             this.signOut()
              }}>
                <MaterialCommunityIcons name={"logout"} color={primaryColor} size={Width(7)} style={{ alignSelf: "center" }} />
                <Text style={{ ...textFont, fontSize: FontSize(8), top: 8, textAlign: "center" }}>{`Logout`}</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={primaryColor} />
        <View style={styles.mainInnerContainer}>
          <AntDesignIcons
            name={'arrowleft'}
            color="#fff"
            size={Width(8)}
            style={{marginHorizontal: Width(5), marginBottom: Height(-2)}}
          />
          <Text style={styles.headerTitleDesign}>Hey! {this.state.name}</Text>
        </View>
        <View style={styles.mainModelDesign}>
          <View style={styles.imageBackDesign}>
            {/* <View style={styles.imageBorderDesign}> */}
            <Image
              style={{
                width: Width(30),
                height: Width(30),
                borderRadius: Width(100),
                borderColor: primaryColor,
                borderWidth: 2,
              }}
              source={require('../../images/avatar.png')}
            />
            {/* </View> */}
          </View>
          <View>
            <View style={{flex: 1}}>
              <View style={{marginHorizontal: Width(4), marginTop: -40}}>
                <Text
                  style={{
                    ...defaultFont,
                    fontSize: FontSize(16),
                    borderLeftWidth: Width(1),
                    borderLeftColor: primaryColor,
                    marginHorizontal: Width(5),
                    color: 'black',
                    paddingHorizontal: Width(2),
                  }}>
                  Personal Detail
                </Text>
              </View>
              <View style={{marginTop: 80, padding: 1}}>
                {this.Information(this.state.name, 'user')}
              </View>
              <View style={{marginTop: 10}}>
                {this.Information('+923482727262', 'phone')}
              </View>
              <View style={{marginTop: 10}}>
                {this.Information(this.state.email, 'addusergroup')}
              </View>
              <View style={{alignSelf: 'center', marginTop: Height(2)}}>
                <TouchableOpacity
                  onPress={() => {
                    this.signOut();
                  }}
                  style={{
                    borderRadius: 15,
                    top: -35,
                    backgroundColor: primaryColor,
                    padding: Width(2),
                    marginHorizontal: Width(29),
                  }}>
                  <Text
                    style={{
                      ...defaultFont,
                      color: 'white',
                      textAlign: 'center',
                      marginHorizontal: 10,
                      height: Height(3),
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* {this.challengesDisplayDesign()} */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainInnerContainer: {
    width: ScreenWidth,
    height: Height(30),
    backgroundColor: primaryColor,
    flexDirection: 'column',
  },
  headerTitleDesign: {
    ...textFont,
    color: '#fff',
    fontSize: FontSize(18),
    textAlign: 'center',
  },
  mainModelDesign: {
    top: Height(-12),
    width: ScreenWidth / 1.1,
    height: Height(67),

    alignItems: 'center',
    backgroundColor: '#fff',
    // flex: 1,

    borderTopRightRadius: Width(8),
    borderTopLeftRadius: Width(8),
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 9,
  },
  imageBackDesign: {
    width: Width(32),
    height: Width(32),
    backgroundColor: '#fff',
    borderRadius: 100,
    top: Height(-8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBorderDesign: {
    width: Width(30),
    height: Height(15),
    borderRadius: 100,
    borderWidth: Width(0.5),
    borderColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldDesigns: {
    fontSize: FontSize(13),
    width: Width(80),
    height: Height(5),

    borderRadius: 100,
    borderWidth: Width(0.3),
    paddingLeft: Width(5),
    paddingRight: Width(5),
    justifyContent: 'flex-start',
  },
  dateFieldDesign: {
    fontSize: FontSize(11),
    width: Width(35),
    height: Height(4.5),
    marginTop: Height(2),
    justifyContent: 'center',
    borderRadius: 100,
    ...textFont,
    borderWidth: Width(0.3),
  },
  dateTextDesign: {
    fontSize: FontSize(13),
    color: fontColor,
  },
  dateTextInputDesign: {
    alignItems: 'flex-start',
    paddingLeft: Width(5),
    paddingRight: Width(5),
    borderWidth: Width(0),
  },
  bottomTextDesign: {
    ...mediumTextFont,
    fontSize: FontSize(11),
  },
  dropdownMenuDesign: {
    marginTop: Width(3),
    width: Width(80),
    height: Height(5),
    borderRadius: 100,
    borderWidth: Width(0.3),
    paddingLeft: Width(5),
    paddingRight: Width(5),
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // -----------

  centeredViewModel1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Height(13),
  },
  modalViewModel1: {
    width: ScreenWidth / 1.3,
    // margin: 20,
    backgroundColor: '#f6f5f5',
    borderRadius: 20,
    padding: Width(4),
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

  centeredViewModel2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalViewModel2: {
    width: ScreenWidth / 1,
    borderTopLeftRadius: Width(15),
    borderTopRightRadius: Width(15),
    height: Height(43),
    backgroundColor: '#f6f5f5',
    paddingTop: Height(3),

    alignItems: 'center',
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
export default connect(ReducersProps, null)(CreateChallenge);
