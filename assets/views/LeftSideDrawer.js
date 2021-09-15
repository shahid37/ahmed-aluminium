import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  mediumTextFont,
  boldTextFont,
  Empty,
  primaryColorLite,
  primaryColor,
  textDefault,
  textFont,
} from '../utils/Style';
import TabBar, {iconTypes} from 'react-native-fluidbottomnavigation';
import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
import Home from './Home';
import AboutUs from './SideDrawerScreens/AboutUs';
import CurrentChallenge from './SideDrawerScreens/CurrentChallenge';
import CancelledChallenges from './SideDrawerScreens/CancelledChallenges';
import HowItWorks from './SideDrawerScreens/HowItWorks';
import InviteYourFriend from './SideDrawerScreens/InviteYourFriend';
import Language from './SideDrawerScreens/Language';
import LiveSupport from './SideDrawerScreens/LiveSupport';
import MyChallenges from './SideDrawerScreens/MyChallenges';
import MyWallet from './SideDrawerScreens/MyWallet';
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import ProfileSettings from './SideDrawerScreens/ProfileSettings';
import RecentChallenges from './SideDrawerScreens/RecentChallenges';

import {FontSize, Height, ScreenWidth, Width} from '../utils/Dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyHeader from './reuseable/MyHeader';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerActions,
  DrawerItemList,
  DrawerItem,
  DrawerContent,
} from '@react-navigation/drawer';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useIsDrawerOpen} from '@react-navigation/drawer';

import Svg, {Path} from 'react-native-svg';

const Drawer = createDrawerNavigator();
// const isDrawerOpen = useIsDrawerOpen();
// const isDrawerOpen = useIsDrawerOpen();

class LeftSideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
      profilePic:
        'https://i1.wp.com/widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png?resize=217%2C217&ssl=1',
      userName: 'Ahmed Ali',
    };
  }

  bottomNavigation = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#fff',
          marginLeft: Width(-10),
        }}>
        <TabBar
          activeTab={this.state.currentTab}
          tintColor="blue"
          onPress={(tabIndex) => {
            this.setState({currentTab: tabIndex});
          }}
          Animated={true}
          tintColor="#fff"
          titleColor={primaryColor}
          isRtl={true}
          iconSize={FontSize(26)}
          values={[
            {
              title: (
                <TouchableOpacity style={styles.navTitleBack}>
                  <Text style={styles.navTitle}>Inbox</Text>
                </TouchableOpacity>
              ),
              icon: 'message',
              tintColor: this.state.currentTab == 0 ? primaryColor : '#929292',
              isIcon: true,
              iconType: iconTypes.MaterialIcons,
            },
            {
              title: (
                <TouchableOpacity style={styles.navTitleBack}>
                  <Text style={styles.navTitle}>Home</Text>
                </TouchableOpacity>
              ),
              icon: 'home',
              tintColor: this.state.currentTab == 1 ? primaryColor : '#929292',
              isIcon: true,
              iconType: iconTypes.FontAwesome5,
            },
            {
              title: (
                <TouchableOpacity style={styles.navTitleBack}>
                  <Text style={styles.navTitle}>Challenge</Text>
                </TouchableOpacity>
              ),
              icon: 'flag',
              tintColor: this.state.currentTab == 2 ? primaryColor : '#929292',
              isIcon: true,
              iconType: iconTypes.Entypo,
            },
          ]}
        />
      </View>
    );
  };

  customHeader = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            // position: 'absolute',
            width: ScreenWidth / 1.3,
            marginBottom: Height(11),
          }}>
          <View
            style={{
              backgroundColor: primaryColor,
              height: Height(10),
              justifyContent: 'center',
            }}>
            <Svg
              height={Height(15)}
              width={ScreenWidth / 1.299}
              viewBox="0 0 1440 320"
              style={{position: 'absolute', top: Height(6.5)}}>
              <Path
                fill={primaryColor}
                d="M0,64L120,80C240,96,480,128,720,128C960,128,1200,96,1320,80L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
              />
            </Svg>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  ...textDefault,
                  marginLeft: Width(4),
                  marginTop: Height(4),
                  fontSize: FontSize(19),
                  color: '#fff',
                  flex: 1,
                  textAlign: 'left',
                }}>
                Hey,{' '}
                <Text
                  style={{
                    ...boldTextFont,
                    fontSize: FontSize(16),
                    textAlign: 'left',
                    color: '#fff',
                  }}>
                  {this.state.userName}
                </Text>
              </Text>

              <View
                style={{
                  top: Height(8),
                  backgroundColor: '#fff',
                  borderRadius: Width(100),
                  padding: 4,
                  marginRight: Width(5),
                }}>
                <Image
                  style={{
                    width: Width(25),
                    height: Width(25),
                    borderRadius: Width(100),
                    borderColor: primaryColor,
                    borderWidth: 2,
                  }}
                  source={{uri: this.state.profilePic}}
                />
              </View>
            </View>
            {/* </View> */}
          </View>
        </View>
      </SafeAreaView>

      //-------------------------//
      // <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff", marginBottom: Height(6) }}>
      //     <View style={{
      //         backgroundColor: primaryColor,
      //         width: Width(105), height: Height(22),
      //         borderBottomLeftRadius: Height(70), borderBottomRightRadius: Height(80)
      //         // width: "100%", flexDirection: "row", borderBottomLeftRadius: Height(6), borderBottomRightRadius: Height(6)
      //     }}>

      //     </View>
      //     <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', padding: Width(5), width: "100%", position: "absolute", bottom: 0 }}>
      //         <Text style={{ ...mediumTextFont, fontSize: FontSize(19), color: "#fff", flex: 1, alignItems: "center", textAlign: "center" }}>Hey,<Text style={{ ...boldTextFont, fontSize: FontSize(15), color: "#fff", }}>{this.state.userName}</Text></Text>
      //         <View style={{ top: Height(8), backgroundColor: "#fff", borderRadius: Width(100), padding: 5 }}>
      //             <Image
      //                 style={{ width: Width(25), height: Width(25), borderRadius: Width(100), borderColor: primaryColor, borderWidth: 2 }}
      //                 source={{ uri: this.state.profilePic }} />
      //         </View>
      //     </View>

      // </View >
    );
  };

  CustomDrawerContent = (props) => {
    return (
      <>
        {this.customHeader()}
        <DrawerContentScrollView {...props} style={{}}>
          <DrawerItemList {...props} />
          <DrawerItem
            labelStyle={[mediumTextFont, {fontSize: FontSize(16)}]}
            icon={(props) => {
              return (
                <FIcons
                  name={'log-out'}
                  color={primaryColor}
                  size={props.size}
                />
              );
            }}
            label="Log out"
            onPress={() => {
              alert('Imagine You Log Out');
            }}
          />
          <DrawerItem
            labelStyle={[mediumTextFont, {fontSize: FontSize(16)}]}
            icon={(props) => {
              return (
                <FIcons
                  name={'log-out'}
                  color={primaryColor}
                  size={props.size}
                />
              );
            }}
            label="Log out"
            onPress={() => {
              alert('Imagine You are Log Out');
            }}
          />
        </DrawerContentScrollView>
      </>
    );
  };

  sideNavigation = () => {
    return (
      <Drawer.Navigator
        drawerType={'slide'}
        drawerStyle={{width: ScreenWidth / 1.3}}
        drawerPosition={'left'}
        drawerContentOptions={{
          labelStyle: [mediumTextFont, {fontSize: FontSize(12)}],
          activeBackgroundColor: primaryColorLite,
          activeTintColor: primaryColor,
          inactiveTintColor: '#434343',
          itemStyle: {
            marginVertical: 1,
            marginHorizontal: 0,
            paddingHorizontal: Width(1),
          },
          contentContainerStyle: {paddingTop: 0},
        }}
        drawerContent={this.CustomDrawerContent}>
        {
          <Drawer.Screen
            name="Home"
            component={Home}
            navigation={this.props.navigation}
            options={{
              drawerLabel: 'HOME',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'home'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="CurrentChallenge"
            component={CurrentChallenge}
            options={{
              drawerLabel: 'Current Challenge',
              drawerIcon: (props) => (
                <EntypoIcon
                  name={'flag'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="RecentChallenges"
            component={RecentChallenges}
            options={{
              drawerLabel: 'Recent Challenges',
              drawerIcon: (props) => (
                <EntypoIcon
                  name={'back-in-time'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="CancelledChallenges"
            component={CancelledChallenges}
            options={{
              drawerLabel: 'Cancelled Challenges',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'times-circle-o'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="MyChallenges"
            component={MyChallenges}
            options={{
              drawerLabel: 'My Challenges',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'flag-checkered'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="MyWallet"
            component={MyWallet}
            options={{
              drawerLabel: 'My Wallet',
              drawerIcon: (props) => (
                <EntypoIcon
                  name={'wallet'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="Language"
            component={Language}
            options={{
              drawerLabel: 'Language',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'language'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="HowItWorks"
            component={HowItWorks}
            options={{
              drawerLabel: 'How It Works',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'question-circle'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="LiveSupport"
            component={LiveSupport}
            options={{
              drawerLabel: 'Live Support',
              drawerIcon: (props) => (
                <FontAwesome
                  name={'headphones'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="InviteYourFriend"
            component={InviteYourFriend}
            options={{
              drawerLabel: 'Invite Your Friend',
              drawerIcon: (props) => (
                <EntypoIcon
                  name={'share'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{
              drawerLabel: 'Privacy Policy',
              drawerIcon: (props) => (
                <MIcons
                  name={'privacy-tip'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="ProfileSettings"
            component={ProfileSettings}
            options={{
              drawerLabel: 'Profile Settings',
              drawerIcon: (props) => (
                <IoniconsIcon
                  name={'person'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }

        {
          <Drawer.Screen
            name="AboutUs"
            component={AboutUs}
            options={{
              drawerLabel: 'About Us',
              drawerIcon: (props) => (
                <EntypoIcon
                  name={'info-with-circle'}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        }
      </Drawer.Navigator>
    );
  };

  render() {
    const {language, theme} = this.props;

    return (
      <View style={{flex: 1}}>
        {this.sideNavigation()}

        {/* {this.sideNavigation()} */}
        {/* {this.state.currentTab == 0 && <Inbox />}
                {this.state.currentTab == 1 && <Home />} 
                {this.state.currentTab == 2 && <Challenge />}   */}
      </View>
    );
  }
}
export default connect(ReducersProps, null)(LeftSideDrawer);

const styles = StyleSheet.create({
  navTitle: {
    ...mediumTextFont,
    color: primaryColor,
    fontSize: FontSize(10),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitleBack: {
    backgroundColor: primaryColorLite,
    paddingHorizontal: Width(1.8),
    borderRadius: 100,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
