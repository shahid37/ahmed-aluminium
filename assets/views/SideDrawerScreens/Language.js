import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {TabView, SceneMap, TabBar, Label} from 'react-native-tab-view';
import MyHeader from '../reuseable/MyHeader';

import {
  mediumTextFont,
  boldTextFont,
  Empty,
  primaryColorLite,
  primaryColor,
  textDefault,
  textFont,
} from '../../utils/Style';
import {FontSize, Width, Height, ScreenWidth} from '../../utils/Dimensions';

const dimensions = Dimensions.get('window');
const dimWidth = dimensions.width;
const dimHeight = dimensions.height;

export default class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      index: 0,
      selectedLang: 'ENGLISH',
      languageNames: [
        {lanName: 'SPANISH'},
        {lanName: 'ARABIC'},
        {lanName: 'PORTUGUESE'},
        {lanName: 'ENGLISH'},
        {lanName: 'RUSSIAN'},
        {lanName: 'JAPANESE'},
        {lanName: 'TURKISH'},
        {lanName: 'TAMIL'},
        {lanName: 'KOREAN'},
        {lanName: 'ITALIAN'},
      ],
    };
  }

  getDateStatus = (date) => {
    var newDate = date.replace('-', '');
    newDate = newDate.replace('-', '');
    console.log('=transfer Date========', newDate);

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var todaydate = date + '' + month + '' + year;

    console.log('======getDtae=======', todaydate);
    if (newDate > todaydate) {
      return false;
    } //date is coming
    else {
      return true;
    }
    // return (date + month + year)
  };

  ListDesign = (name) => (
    <FlatList
      style={{height: Height(24), marginBottom: Height(4)}}
      data={name}
      keyExtractor={(item) => item.lanName}
      numColumns={1}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedLang: item.lanName});
            }}
            style={styles.listContainer}>
            <Text
              style={
                this.state.selectedLang == item.lanName
                  ? styles.listSelectedTextDesign
                  : styles.listTextDesign
              }>
              {item.lanName}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );

  render() {
    return (
      <View style={styles.mainContainer}>
        <MyHeader title="Language" navigation={this.props.navigation} />
        // todo
        <Image
          //   source={require('../../images/intro3.png')}
          source={require('../../images/touch.png')}
          style={styles.introImageStyle}
          resizeMode={'center'}
        />
        {this.ListDesign(this.state.languageNames)}
        <View style={{flex: 1, flexDirection: 'row', margin: Height(2)}}>
          <View style={styles.buttonBackground}>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Reset Default</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonBackground}>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Save Language</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
  },
  activeTabTextColor: {
    color: '#eeaf3b',
  },
  tabTextColor: {
    color: '#ccc',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  introImageStyle: {
    width: ScreenWidth,
    height: Height(20),
    marginBottom: Height(6),
  },
  listTextDesign: {
    ...mediumTextFont,
    color: '#BFBFBF',
    fontSize: FontSize(18),
  },
  listSelectedTextDesign: {
    ...mediumTextFont,
    color: primaryColor,
    fontSize: FontSize(18),
  },
  listContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonBackground: {
    flex: 1,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: primaryColor,
    width: ScreenWidth / 2.5,
    height: Height(6),
    borderRadius: Width(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Height(3),
  },
  nextButtonText: {
    ...mediumTextFont,
    color: '#fff',
    fontSize: FontSize(13),
  },
  skipButton: {
    backgroundColor: '#fff',
    width: ScreenWidth / 2.5,
    height: Height(6),
    borderRadius: Width(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: Width(0.5),
    marginBottom: Height(3),
  },
  skipButtonText: {
    ...mediumTextFont,
    color: primaryColor,
    fontSize: FontSize(13),
  },
});
