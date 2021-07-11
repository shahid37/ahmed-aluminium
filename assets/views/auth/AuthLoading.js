import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import Myutils from '../../utils/Utils'
const myutils = new Myutils()
export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userData = await AsyncStorage.getItem('userData');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userData ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      myutils.renderLoadingstate()
    );
  }
}