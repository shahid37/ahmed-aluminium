import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
// import Challenge from './Challenge'
// import Inbox from './Inbox'
import MyHeader from './reuseable/MyHeader';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FontSize,
  Height,
  Width,
  ScreenWidth,
  ScreenHeight,
} from '../utils/Dimensions';
import {
  boldTextFont,
  Empty,
  fontColor,
  defaultFont,
  mediumTextFont,
  primaryColor,
  errorColor,
  textDefault,
  textFont,
} from '../utils/Style';
import TabBar, {iconTypes} from 'react-native-fluidbottomnavigation';
import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WebHandler from '../data/remote/WebHandler';
import Urls from '../data/remote/Urls';
import MyUtils from '../utils/Utils';
import Prefmanager from '../data/local/prefManager';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
// import { in } from 'react-native/Libraries/Animated/src/Easing';

const webHandler = new WebHandler();
const myUtils = new MyUtils();
const prefs = new Prefmanager();
const CHALLENGE_LIMIT = 20;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      challengeDetail: [],
      pageNo: 1,
      totalPages: 1,
      val: 1,

      curTab: 1,
      // challengeDetail: [
      //   { id: "1", title: "Ramadan ", date: "12-01-2021", info: "Join Team", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "2", title: "Ramadan ", date: "14-01-2021", info: "Join What", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "3", title: "Ramadan ", date: "10-02-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "4", title: "Ramadan", date: "1-01-2021 ", info: "Join Charity", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "5", title: "Ramadan", date: "2-01-2021", info: "Join Club", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "6", title: "Ramadan", date: "12-01-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "1", title: "Ramadan ", date: "12-01-2021", info: "Join Team", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "2", title: "Ramadan ", date: "14-01-2021", info: "Join What", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "3", title: "Ramadan ", date: "10-02-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "4", title: "Ramadan", date: "1-01-2021 ", info: "Join Charity", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "5", title: "Ramadan", date: "2-01-2021", info: "Join Club", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
      //   { id: "6", title: "Ramadan", date: "12-01-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },

      // ],
      headerValues: [
        {
          id: 1,
          image: require('../images/home_menu_4.png'),
          onPress: () => props.navigation.navigate('ChallengeDetail'),
        },
        {
          id: 2,
          image: require('../images/home_menu_4.png'),
          // onPress: () => props.navigation.navigate("ChatInbox", { _userId: 1 })
        },
        //  {
        //   id: 3,
        //   image: require("../images/home_menu_4.png"),
        //   // image: require("../images/home_menu_3.png"),
        //   // onPress: () => alert("clicked")
        // }, {
        //   id: 4,
        //   image: require("../images/home_menu_4.png"),
        //  // onPress: () => props.navigation.navigate("ChallengeCategories")

        // }
      ],
    };
  }
  // async componentDidMount() {
  //   let user = await AsyncStorage.getItem('user');
  //   let parsed = JSON.parse(user);
  //   this.setState({userEmail : parsed.email})
  // }
  // getChallengesList(user_id) {
  //   console.log(">>>>>>>>>0000", user_id)
  //   let body = "page_number=" + 1 + "&limit=" + CHALLENGE_LIMIT + "&user_id=" + user_id
  //   webHandler.sendPostRequestAxios(Urls.CHALLENGES_LIST, body, (responseJson) => {
  //     console.log("?>", responseJson)
  //     this.setState({
  //       challengeDetail: responseJson.data,
  //       // pageNo: responseJson.page_number,
  //       totalPages: responseJson.total_pages,
  //       isLoading: false,
  //       isRefreshing: false
  //     })
  //   }, (reason) => {
  //     myUtils.showSnackbar(reason, errorColor)
  //     this.setState({ isLoading: false })
  //   })
  // }
  // handleOnLoadMore() {
  //   console.log("end of file reached")
  //   let { pageNo, totalPages, challengeDetail } = this.state
  //   pageNo++
  //   if (pageNo <= totalPages) {
  //     let body = "page_number=" + pageNo + "&limit=" + CHALLENGE_LIMIT
  //     webHandler.sendPostRequestAxios(Urls.CHALLENGES_LIST, body, (responseJson) => {
  //       this.setState({
  //         challengeDetail: [...challengeDetail, ...responseJson.data],
  //         pageNo,
  //         isLoading: false,
  //         isRefreshing: false
  //       })
  //     }, (reason) => {
  //       myUtils.showSnackbar(reason)
  //     })
  //   }
  // }
  _onOrientationDidChange = (orientation) => {
    var orientation = 'PORTRAIT';
    if (orientation == 'LANDSCAPE-LEFT') {
      Orientation.lockToPortrait();
    } else {
      //PORTRAIT
      Orientation.lockToPortrait();
    }
  };
  componentWillMount() {
    //The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this._onOrientationDidChange(initial);
    } else {
      //do other stuff
    }
  }
  componentDidMount() {
    Orientation.getAutoRotateState((rotationLock) =>
      this.setState({rotationLock}),
    );
    //this allows to check if the system autolock is enabled or not.

    Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscapeLeft(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    //get current UI orientation
    /*
    Orientation.getOrientation((orientation)=> {
      console.log("Current UI Orientation: ", orientation);
    });

    //get current device orientation
    Orientation.getDeviceOrientation((deviceOrientation)=> {
      console.log("Current Device Orientation: ", deviceOrientation);
    });
    */

    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }
  serachBarDesign() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: Height(6),
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Width(4),
          borderRadius: 5,
          borderWidth: Width(0.3),
          borderColor: primaryColor,
          marginVertical: Height(1),
        }}>
        <TextInput
          style={{
            fontSize: FontSize(13),
            marginHorizontal: Width(3),
            paddingTop: 1,
            top: 5,
            flex: 1,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          //  value={this.state.username}
          //  onChangeText={(text) => this.setState({ username: text })}
          placeholder="Search..."
          placeholderTextColor={primaryColor}
        />
        <AntDesignIcons
          name={'search1'}
          color={primaryColor}
          size={Width(5)}
          style={{marginHorizontal: Width(5)}}
        />
      </View>
    );
  }

  topMenuDesign() {
    let {headerValues} = this.state;
    return (
      <View style={{flexDirection: 'row', marginLeft: Width(13)}}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: primaryColor,
              padding: Width(4),
              width: Width(35),
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: Width(3),
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('GetQoute');
            }}
            activeOpacity={0.7}
            style={{
              backgroundColor: primaryColor,
              padding: Width(4),
              width: Width(35),
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
              Quote
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  challengesDisplayDesign() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('WindowsImages');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/Windows/windowMain.jpg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    textAlign: 'center',
                  }}>
                  Window Design
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CeilingImages');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/ceilingGlass/ceilingMain.jpg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    textAlign: 'center',
                  }}>
                  Ceiling Glass Design
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('GlassDesigningImages');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/glassDesign/glassmain.jpeg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    alignSelf: 'center',
                  }}>
                  Glass Designing
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('LookingGlass');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/LookingGlass/lookingMain.jpg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    textAlign: 'center',
                  }}>
                  Looking Glass Venity
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ShowerCabin');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/ShowerCabin/showerMain.jpg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    textAlign: 'center',
                  }}>
                  Shower Cabin
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 15,
              flex: 0.5,
              padding: Width(2),

              backgroundColor: '#fff',
              margin: Width(2),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,
              elevation: 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('StairRailing');
              }}>
              <Image
                style={{
                  //width: Width(43),
                  width: '100%',
                  height: Height(25),
                  top: -6,
                  borderRadius: 15,
                  marginVertical: Height(1),
                  padding: Width(3),
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
                resizeMode="stretch"
                source={require('../images/Stairs/stairMain.jpg')}
              />
              <View style={{flexDirection: 'column-reverse'}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 17,
                    left: 5,
                    textAlign: 'center',
                  }}>
                  Stair Railing
                </Text>
                <View style={{flexDirection: 'row-reverse'}}></View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    const {language, theme} = this.props;
    let {isLoading, challengeDetail} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 70}}>
        <StatusBar backgroundColor={primaryColor} />
        <MyHeader title="Welcome" navigation={this.props.navigation} />
        <View style={{}}>{this.serachBarDesign()}</View>
        <View style={{flex: 1}}>{this.challengesDisplayDesign()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // topMenuDesign: {
  //   width: Width(45),
  //   height: Width(22),
  //   resizeMode: 'center',
  //   // marginTop: 5,
  //   borderRadius: Width(8),
  //   marginHorizontal: Width(0),
  //   left:15
  // },
  backgroungImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenHeight,
  },
});
export default connect(ReducersProps, null)(Home);
