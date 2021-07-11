import React, { useState, Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text, Image, alert, Button, ImageBackground, } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontSize, Height, ScreenWidth, Width } from '../utils/Dimensions';
import { boldTextFont, boldFont, mediumTextFont, Empty, primaryColor, textDefault, textFont } from '../utils/Style';
import Utils from '../utils/Utils';


const MyUtils = new Utils()


const slides = [
  {
    key: 'intro1',
    text: '``Ahmad Glass & Aluminium Center`` was established in Mr. Muhammad Ahmad (CEO) in 2000\n',
    image: require("../images/logo512.png"),
    backgroundColor: "#fff",
  },
  {
    key: 'intro2',
    text: '``Ahmad Glass & Aluminium Center`` was established in Mr. Muhammad Ahmad (CEO) in 2000\n',
    image: require("../images/logo512.png"),
    backgroundColor: "#fff",
  },
  {
    key: 'intro3',
    text: '``Ahmad Glass & Aluminium Center`` was established in Mr. Muhammad Ahmad (CEO) in 2000\n',
    image: require("../images/logo512.png"),
    backgroundColor: "#fff",
  },
  {
    key: 'intro4',
    text: '``Ahmad Glass & Aluminium Center`` was established in Mr. Muhammad Ahmad (CEO) in 2000\n',
    image: require("../images/logo512.png"),
    backgroundColor: "#fff",
  },

];

export default class Introduction extends Component {

  RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          style={styles.introImageStyle}
          resizeMode={"center"}
        />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  RenderNextButton = () => {
    return (
      <View style={styles.buttonBackground}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

      </View>
    );
  };

  RenderSkipButton = () => {
    return (
      <View style={styles.buttonBackground}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    );
  };

  RenderDoneButton = () => {
    return (
      <View style={styles.buttonBackground}>
        <TouchableOpacity style={{ ...styles.nextButton, width: ScreenWidth / 1.5 }}
          onPress={() => {   MyUtils.resetAndGo(this.props.navigation,"Welcome") }}>
          <Text style={styles.nextButtonText}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor={"#fff"} />

        <AppIntroSlider
          data={slides}
          renderItem={this.RenderItem}
          showSkipButton={true}
          bottomButton
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          renderNextButton={this.RenderNextButton}
          renderSkipButton={this.RenderSkipButton}
          renderDoneButton={this.RenderDoneButton}
        />

      </>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  dotStyle: {
    backgroundColor: "#9F9F9F",
    width: Width(4),
    height: Height(0.60)
  },
  activeDotStyle: {
    backgroundColor: primaryColor,
    width: Width(12),
    height: Height(0.60)
  },
  buttonBackground: {
    flex: 1,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: primaryColor,
    width: ScreenWidth / 2,
    height: Height(6),
    borderRadius: Width(100),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Height(3)
  },
  nextButtonText: {
    ...mediumTextFont,
    color: "#fff",
    fontSize: FontSize(16)
  },
  skipButton: {
    backgroundColor: "#fff",
    width: ScreenWidth / 2,
    height: Height(6),
    borderRadius: Width(100),
    justifyContent: "center",
    alignItems: "center",
    borderColor: primaryColor,
    borderWidth: Width(0.50),
    marginBottom: Height(3)
  },
  skipButtonText: {
    ...mediumTextFont,
    color: primaryColor,
    fontSize: FontSize(16)
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: ScreenWidth,
    height: Height(20),
  },
  introTextStyle: {
    color: '#616161',
    textAlign: 'center',
    paddingVertical: Width(15),
    marginHorizontal: Width(5),
    ...mediumTextFont, fontSize: FontSize(12)
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

