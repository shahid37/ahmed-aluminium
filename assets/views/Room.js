import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';
import Challenge from './Challenge'
import Inbox from './Inbox'
import MyHeader from "./reuseable/MyHeader";
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../utils/Dimensions';
import { boldTextFont, Empty, fontColor, mediumTextFont, primaryColor, textDefault, textFont } from '../utils/Style';

import TabBar, { iconTypes } from "react-native-fluidbottomnavigation";

import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import { TouchableOpacity } from 'react-native-gesture-handler';



class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 1,
      curTab: 1,
      challengeDetail: [
        { id: "1", title: "Ramadan Challenge", date: "12-01-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "2", title: "School Fund", date: "14-01-2021 to 16-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "3", title: "Hospital Donation", date: "10-02-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "4", title: "Muharram", date: "1-01-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "5", title: "Eid Donation", date: "2-01-2021 to 10-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "6", title: "Run 6 km", date: "12-01-2021 to 14-02-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "7", title: "Ramadan Challenge", date: "12-01-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "8", title: "School Fund", date: "14-01-2021 to 16-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "9", title: "Hospital Donation", date: "10-02-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "10", title: "Muharram", date: "1-01-2021 to 14-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "11", title: "Eid Donation", date: "2-01-2021 to 10-01-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
        { id: "12", title: "Run 6 km", date: "12-01-2021 to 14-02-2021", info: "Join the challenge...….", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },

      ]
    }
  }

  serachBarDesign() {
    return (
      <View style={{ flexDirection: "row", height: Height(5.5), alignContent: "center", alignItems: "center", justifyContent: "space-between", marginHorizontal: Width(12), borderRadius: 100, borderWidth: Width(0.50), borderColor: primaryColor }}>
        <TextInput
          style={{ fontSize: FontSize(13), marginHorizontal: Width(5), flex: 1 }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          //  value={this.state.username}
          //  onChangeText={(text) => this.setState({ username: text })}
          placeholder="Search..."
          placeholderTextColor={primaryColor} />

        <AntDesignIcons name={"search1"} color={primaryColor} size={Width(5)} style={{ marginHorizontal: Width(5) }} />

      </View>
    )
  }

  topMenuDesign() {
    return (
      <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", }}>
        {/* <T÷ext>addadada</Text> */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("CreateChallenge") }}>
            <Image
              style={styles.topMenuDesign}
              source={require("../images/home_menu_1.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { console.log("clickedd") }}>
            <Image
              style={styles.topMenuDesign}
              source={require("../images/home_menu_2.png")} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { console.log("clickedd") }}>
            <Image
              style={styles.topMenuDesign}
              source={require("../images/home_menu_3.png")} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { console.log("clickedd") }}>
            <Image
              style={styles.topMenuDesign}
              source={require("../images/home_menu_4.png")} />
          </TouchableOpacity>

        </ScrollView>
      </View>

    )
  }

  challengesDisplayDesign() {
    return (
      <View style={{ flex: 1, marginBottom: Height(1) }}>
        <FlatList
          data={this.state.challengeDetail}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <View style={{
              borderRadius: 15, width: Width(46), padding: Height(1), flexDirection: "column", backgroundColor: "#fff", alignItems: "center", margin: Height(1), shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.53,
              shadowRadius: 13.97,

              elevation: 21,
            }}
              onPress={() => { }}
            >
              <Text style={{ ...mediumTextFont, fontSize: FontSize(12), color: primaryColor }} numberOfLines={1}> {item.title}</Text>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons name={"clock-time-ten"} color={primaryColor} size={Width(5)} style={{}} />
                <Text style={{ ...mediumTextFont, fontSize: FontSize(9), color: fontColor, }} numberOfLines={1}>{item.date}</Text>
              </View>

              <View style={{ flexDirection: "row", }}>
                <IoniconsIcons name={"information-circle"} color={primaryColor} size={Width(5)} style={{}} />
                <Text style={{ ...mediumTextFont, fontSize: FontSize(9), color: fontColor }} numberOfLines={1}> {item.info}</Text>
              </View>

              <Image
                style={{ width: Width(43), height: Height(13), borderRadius: 15, marginTop: Height(2) }}
                source={{ uri: item.image }} />

              <TouchableOpacity onPress={() => {this.props.navigation.navigate("ChallengeDetail") }} style={{ backgroundColor: primaryColor, width: Width(36), height: Height(5), marginTop: Height(2), borderRadius: 100, justifyContent: "center" }}>
                <Text style={{ ...mediumTextFont, color: "#fff", textAlign: "center" }}>Details</Text>
              </TouchableOpacity>



            </View>
          }}
        />

      </View>
    )
  }


  render() {
    const { language, theme } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ImageBackground source={require("../images/homeBackground.jpg")} style={styles.backgroungImage}>

          <MyHeader title="Welcome" navigation={this.props.navigation} />

          <View style={{ flex: 0.70, }}>
            {this.serachBarDesign()}
          </View>

          <View style={{ flex: 1.4, marginHorizontal: Width(2) }}>
            {this.topMenuDesign()}

          </View>

          <View style={{ flex: 0.6, marginVertical: Height(2) }}>
            <Text style={{ ...mediumTextFont, fontSize: FontSize(23), borderLeftWidth: Width(2), borderLeftColor: primaryColor, marginHorizontal: Width(3), paddingHorizontal: Width(4) }}>Challenges</Text>
          </View>

          <View style={{ flex: 6, }}>
            {this.challengesDisplayDesign()}
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topMenuDesign: {
    width: Width(35),
    height: Width(25),
    resizeMode: 'center',
    borderRadius: Width(8),
    marginHorizontal: Width(1)
  },
  backgroungImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: ScreenWidth,
    height: ScreenHeight
  },

});
export default connect(ReducersProps, null)(Home)