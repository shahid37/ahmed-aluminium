import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './assets/data/local/reducers/MyReducers';
import TabBar, {iconTypes} from 'react-native-fluidbottomnavigation';
//Initial Screens
import SplashScreen from './assets/views/SplashScreen';
import WelcomeScreen from './assets/views/WelcomeScreen';
import Introduction from './assets/views/Introduction';
import BottomNavigation from './assets/views/BottomNavigation';
import Login from './assets/views/Login';
import Signup from './assets/views/Signup';
import CheckEmail from './assets/views/CheckEmail';
import ForgetPassword from './assets/views/ForgetPassword';
import NewPasswordSetup from './assets/views/ NewPasswordSetup';
// import Firebasedb from './assets/views/Firebasedb';
//  ======TESTING UI=========
import Windows from './assets/views/Windows';
import GetQoute from './assets/views/GetQoute';
import GSL from './assets/views/GSL';
import Doors from './assets/views/Doors';
import Qoute from './assets/views/Qoute';
import WindowsImages from './assets/views/WindowsImages';
import CeilingImages from './assets/views/CeilingImages';
import GlassDesigningImages from './assets/views/GlassDesigningImages';
import LookingGlass from './assets/views/LookingGlass';
import ShowerCabin from './assets/views/ShowerCabin';
import StairRailing from './assets/views/StairRailing';
// import FingerPrintTesting from './assets/views/FingerPrintTesting';
import Edit from './assets/views/Edit';
import DoorEdit from './assets/views/DoorEdit';
import WindowsEdit from './assets/views/WindowsEdit';
import Utills from './assets/views/Utills';
const Stack = createStackNavigator();

//init commit by usman

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 2,
      curTab: 2,
    };
  }

  componentDidMount() {
    // this.registerAppWithFCM()
  }

  async registerAppWithFCM() {
    // await messaging().registerDeviceForRemoteMessages();
    // alert(messaging().isAutoInitEnabled)
    // if (!messaging().isAutoInitEnabled) {
    //   await messaging().registerDeviceForRemoteMessages();
    // }
  }

  MyTabs() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <TabBar
          activeTab={this.state.val}
          iconStyle={{width: 50, height: 50}}
          tintColor="blue"
          onPress={(tabIndex) => {
            this.setState({val: tabIndex});
            this.setState({curTab: tabIndex});
            console.log('>>>');
          }}
          Animated={true}
          iconActiveTintColor="black"
          iconInactiveTintColor="blue"
          tintColor="#f5f5f7"
          titleColor="red"
          isRtl={true}
          iconSize={15}
          values={[
            {
              title: 'Home',
              icon: 'alarm',
              tintColor: this.state.curTab == 0 ? 'red' : 'blue',
              isIcon: true,
              iconType: iconTypes.MaterialIcons,
            },
            {
              title: 'Home1',
              image: require('./assets/images/avatar.png'),
              tintColor: this.state.curTab == 1 ? 'red' : 'blue',
            },
            {
              title: 'Home2',
              image: require('./assets/images/avatar.png'),
              tintColor: this.state.curTab == 2 ? 'red' : 'blue',
            },
            {
              title: 'Home3',
              image: require('./assets/images/avatar.png'),
              tintColor: this.state.curTab == 3 ? 'red' : 'blue',
            },
            {
              title: 'Home4',
              image: require('./assets/images/avatar.png'),
              tintColor: this.state.curTab == 4 ? 'red' : 'blue',
            },
          ]}
        />
      </View>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen name={'Splash'} component={SplashScreen} />
              <Stack.Screen
                name={'BottomNavigation'}
                component={BottomNavigation}
              />
              <Stack.Screen name={'GetQoute'} component={GetQoute} />
              <Stack.Screen name={'GSL'} component={GSL} />
              <Stack.Screen name={'Windows'} component={Windows} />
              <Stack.Screen name={'Doors'} component={Doors} />
              <Stack.Screen name={'Login'} component={Login} />
              <Stack.Screen name={'Signup'} component={Signup} />
              <Stack.Screen name={'Qoute'} component={Qoute} />
              <Stack.Screen name={'WindowsImages'} component={WindowsImages} />
              <Stack.Screen name={'CeilingImages'} component={CeilingImages} />
              <Stack.Screen
                name={'GlassDesigningImages'}
                component={GlassDesigningImages}
              />
              <Stack.Screen name={'LookingGlass'} component={LookingGlass} />
              <Stack.Screen name={'ShowerCabin'} component={ShowerCabin} />
              <Stack.Screen name={'StairRailing'} component={StairRailing} />
              <Stack.Screen name={'Introduction'} component={Introduction} />
              <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
              <Stack.Screen
                name={'ForgetPassword'}
                component={ForgetPassword}
              />
              <Stack.Screen name={'CheckEmail'} component={CheckEmail} />
              <Stack.Screen name={'Edit'} component={Edit} />
              <Stack.Screen
                name={'NewPasswordSetup'}
                component={NewPasswordSetup}
              />
              <Stack.Screen name={'DoorEdit'} component={DoorEdit} />
              <Stack.Screen name={'WindowsEdit'} component={WindowsEdit} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: "#fff"
  },
});
