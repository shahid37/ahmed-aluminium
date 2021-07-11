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
// old inbox
// import Inbox from './Inbox'
import GetQoute from '../views/GetQoute';
// import Inbox from './chat/Chats'

// import Challenge from '../views/Invitations/Challenge';

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
// todo use drawer after code setup
// import LeftSideDrawer from './LeftSideDrawer';

const Drawer = createDrawerNavigator();
// const isDrawerOpen = useIsDrawerOpen();
// const isDrawerOpen = useIsDrawerOpen();

class BottomNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
      profilePic:
        'https://i1.wp.com/widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png?resize=217%2C217&ssl=1',
      userName: 'Usman Ansari',
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
          marginLeft: Width(-2),
          marginRight: Width(2),
          // marginTop : Height(30)
        }}>
        <TabBar
          activeTab={this.state.currentTab}
          tintColor="blue"
          onPress={(tabIndex) => {
            this.setState({currentTab: tabIndex});
          }}
          // Animated={true}
          tintColor="#fff"
          titleColor={primaryColor}
          isRtl={true}
          iconSize={FontSize(26)}
          values={[
            {
              title: (
                <TouchableOpacity style={styles.navTitleBack}>
                  <Text style={styles.navTitle}>Profile</Text>
                </TouchableOpacity>
              ),
              icon: 'person',
              tintColor: this.state.currentTab == 0 ? primaryColor : '#929292',
              isIcon: true,
              iconType: iconTypes.Ionicons,
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
                  <Text style={styles.navTitle}>Calculator</Text>
                </TouchableOpacity>
              ),
              icon: 'message',
              tintColor: this.state.currentTab == 2 ? primaryColor : '#929292',
              isIcon: true,
              iconType: iconTypes.MaterialIcons,
            },

            // {
            //   title: (
            //     <TouchableOpacity style={styles.navTitleBack}>
            //       <Text style={styles.navTitle}>Invitations</Text>
            //     </TouchableOpacity>
            //   ),
            //   icon: 'envelope-open-text',
            //   tintColor: this.state.currentTab == 3 ? primaryColor : '#929292',
            //   isIcon: true,
            //   iconType: iconTypes.FontAwesome5,
            // },
          ]}
        />
      </View>
    );
  };

  render() {
    const {language, theme} = this.props;

    return (
      <View style={{flex: 1}}>
        {this.state.currentTab == 2 && (
          <GetQoute navigation={this.props.navigation} />
        )}
        {/* {this.state.currentTab == 1 && <LeftSideDrawer />} */}

        {this.state.currentTab == 0 && (
          <ProfileSettings navigation={this.props.navigation} />
        )}
        {/* {this.state.currentTab == 3 && (
          <Challenge navigation={this.props.navigation} />
        )} */}

        {this.bottomNavigation()}

        {/* {this.sideNavigation()} */}
        {/* {this.state.currentTab == 0 && <Inbox />}
                {this.state.currentTab == 1 && <Home />} 
                {this.state.currentTab == 2 && <Challenge />}   */}
      </View>
    );
  }
}
export default connect(ReducersProps, null)(BottomNavigation);

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
    // backgroundColor: primaryColorLite,
    // paddingHorizontal: Width(1.8),
    // borderRadius: 100,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
