import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
import {primaryColor, secondryColor} from '../utils/Style';
import Utils from '../utils/Utils';
import Prefmanager from '../data/local/prefManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
const prefs = new Prefmanager();
const MyUtils = new Utils();

class SplashScreen extends React.Component {
  async componentDidMount() {
    //this.startAfterDelay(2000, "Introduction")
    // prefs.isUserLoggedIn(isLoggedIn => {
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    if (parsed) {
      this.startAfterDelay(2000, 'BottomNavigation');
    } else {
      this.startAfterDelay(2000, 'Login');
    }
    // })
  }
  startAfterDelay(delay, routeName) {
    setTimeout(() => {
      MyUtils.resetAndGo(this.props.navigation, routeName);
    }, delay);
  }
  redirectToMainScreen() {
    prefs.isUserLoggedIn((isLoggedIn) => {
      if (isLoggedIn) {
        MyUtils.resetAndGo(this.props.navigation, 'BottomNavigation');
      }
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={secondryColor} />
        <ImageBackground
          source={require('../images/splash12.jpg')}
          style={styles.backgroungImage}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroungImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
export default connect(ReducersProps, null)(SplashScreen);
