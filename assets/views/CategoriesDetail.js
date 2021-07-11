import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Modal, Button, ImageBackground, Alert, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';

import MyHeader from "./reuseable/MyHeader";
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import OptionsMenu from "react-native-option-menu";


import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../utils/Dimensions';
import { boldTextFont, Empty, fontColor, mediumTextFont, primaryColor, primaryColorLite, textDefault, textFont, secondryColor, defaultFont } from '../utils/Style';

import TabBar, { iconTypes } from "react-native-fluidbottomnavigation";

import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
// import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';



class CategoriesDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            curTab: 1,
            participated: false,
            model_1_Visibility: false,
            visible: false,
            remove: false,
            challengeDetail: [
                { id: "1", title: "Ramadan ", date: "12-01-2021", info: "Join Team", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "2", title: "Ramadan ", date: "14-01-2021", info: "Join What", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "3", title: "Ramadan ", date: "10-02-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "4", title: "Ramadan", date: "1-01-2021 ", info: "Join Charity", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "5", title: "Ramadan", date: "2-01-2021", info: "Join Club", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "6", title: "Ramadan", date: "12-01-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "1", title: "Ramadan ", date: "12-01-2021", info: "Join Team", image: "https://img.freepik.com/free-photo/close-up-islamic-new-year-with-quran-book_23-2148611710.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "2", title: "Ramadan ", date: "14-01-2021", info: "Join What", image: "https://img.freepik.com/free-photo/education-back-school-with-graduation-cap-pencils-colour-pencil-case-dark-scholarships_73523-960.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "3", title: "Ramadan ", date: "10-02-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "4", title: "Ramadan", date: "1-01-2021 ", info: "Join Charity", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "5", title: "Ramadan", date: "2-01-2021", info: "Join Club", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "6", title: "Ramadan", date: "12-01-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "3", title: "Ramadan ", date: "10-02-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/asian-elderly-woman-patient-hospital_1150-20440.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "4", title: "Ramadan", date: "1-01-2021 ", info: "Join Charity", image: "https://img.freepik.com/free-photo/prayer-beads-candle-near-religious-book_23-2147868974.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "5", title: "Ramadan", date: "2-01-2021", info: "Join Club", image: "https://img.freepik.com/free-vector/cute-eid-al-adha-illustration_1453-356.jpg?size=338&ext=jpg&ga=GA1.2.1385983377.1611642518", },
                { id: "6", title: "Ramadan", date: "12-01-2021", info: "Join Now", image: "https://img.freepik.com/free-photo/young-people-runner-running-running-road-city-park_41380-393.jpg?size=626&ext=jpg&ga=GA1.2.1385983377.1611642518", },

            ],
            calls: [
                { id: 1, name: "School" },
                { id: 1, name: "Software House" },
                { id: 1, name: "Universities" },
                { id: 1, name: "Pakistan" },
                { id: 1, name: "Rahim Yar khan" },
            ]
        }
    }
    renderItem2 = ({ item }) => {
        return (
            <View>
                <View style={{ zIndex: 2, }}>
                    <TouchableOpacity style={{ marginTop: 30, alignSelf: "flex-end", top: 10, backgroundColor: "#fff", borderRadius: 100 }}
                        onPress={() => { this.setState({ remove: true }) }}>
                        <AntDesignIcons name={"closecircleo"} color={primaryColor} size={Width(5)} style={{}} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", borderRadius: 20, backgroundColor: primaryColor, padding: 5, marginHorizontal: Width(0.5), paddingHorizontal: Width(7), marginLeft: 10, }}>
                    <Text style={{ ...textFont, color: "#fff", textAlign: "center",top:1 }} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                </View>
            </View>
        )
    }
    challengesDisplayDesign() {
        return (
            <View style={{ }}>
               
                <FlatList
                    data={this.state.challengeDetail}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={({item, index}) =>{
                        return(
                            <View style={{ marginHorizontal: Width(1.4),backgroundColor:"#fff",paddingVertical:10 }}>
                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>School</Text>
                        </View>
                        )
                    }}
                    stickyHeaderIndices={[0]}
                    renderItem={({ item, index }) => {
                        return <View style={{
                            borderRadius: 15, width: Width(46), padding: Width(2), flexDirection: "column", backgroundColor: "#fff", alignItems: "center", margin: Width(2), shadowColor: "#000",
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
                            <Text style={{ ...mediumTextFont, fontSize: FontSize(14), color: primaryColor, left: -34 }} numberOfLines={1}> {item.title}</Text>
                            <View style={{ flexDirection: "row", left: -34 }}>
                                <MaterialCommunityIcons name={"clock-time-nine-outline"} color={primaryColor} size={Width(4)} style={{ top: 0, left: -5 }} />
                                <Text style={{ ...textFont, fontSize: FontSize(10), color: fontColor, left: -3, }} numberOfLines={1}>{item.date}</Text>
                            </View>
                            <View style={{ flexDirection: "row", left: -34 }}>
                                <IoniconsIcons name={"information-circle-outline"} color={primaryColor} size={Width(4)} style={{ top: 0, left: -5 }} />
                                <Text style={{ ...textFont, fontSize: FontSize(10), color: fontColor, left: -3, }} numberOfLines={1}>{item.date}</Text>
                            </View>
                            <Image
                                style={{ width: Width(43), height: Height(17), borderRadius: 15, marginTop: Height(1) }}
                                source={{ uri: item.image }} />

                            <TouchableOpacity onPress={() => { }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(4), marginTop: Height(2), borderRadius: 100, justifyContent: "center" }}>
                                <Text style={{ ...textFont, top: 1, fontSize: 13, color: "#fff", textAlign: "center" }}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    }}
                />

            </View>
        )
    }
    // Heading () {
    //     return(
    //         <View style={{ marginHorizontal: Width(1.4),backgroundColor:"#fff",paddingVertical:10 }}>
    //         <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>School</Text>
    //     </View>
    //     )
    // }
    render() {
        const { language, theme } = this.props
        const icon = (<IoniconsIcons name={"menu-outline"} color={primaryColor} size={Width(5)} style={{ fontSize: 35, top: 14, marginHorizontal: Width(45) }} />)
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>

                <ImageBackground source={require("../images/homeBackground.jpg")} style={styles.backgroungImage}>

                <MyHeader title="Categories" navigation={this.props.navigation} />

                <View style={{ bottom: 20 }}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.calls}
                        horizontal={true}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={this.renderItem2} 
                      
                        />
                </View>

                <View style={styles.borderline}>
                </View>

                {!this.state.remove &&
                    <View style={{ flexGrow: 1, height: Height(10) }}>
                        {this.challengesDisplayDesign()}
                    </View>
                }
                <View style={{ backgroundColor: "#fff" }}>
                    <TouchableOpacity style={{ backgroundColor: primaryColor, width: Width(35), height: Height(5), alignSelf: "center", marginTop: Height(1), marginBottom: Height(1), borderRadius: 100, justifyContent: "center" }}>
                        <Text style={{ ...mediumTextFont, color: "#fff", textAlign: "center", fontSize: FontSize(15), }}>Done</Text>
                    </TouchableOpacity>
                </View>
          </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    backgroungImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: ScreenWidth,
        height: ScreenHeight
    },
    row: {

        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
        marginTop: 5,
        marginRight: 13,
        marginLeft: 13
    },
    row2: {
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 5,
        marginRight: -93,

    },
    borderline: {

        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000000',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
    },
    pic: {
        borderRadius: 30,
        width: 30,
        height: 30,
    },
    pic2: {
        borderRadius: 30,
        width: 50,
        height: 50,
        marginLeft: -70,
        top: -4
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,

    },
    nameTxt: {
        marginLeft: 10,
        // fontWeight: '600',
        ...textFont,
        fontSize: 12,
        width: 170,
    },
    nameTxt2: {
        marginLeft: 10,
        // fontWeight: '600',
        ...textFont,
        fontSize: 12,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: primaryColor,
        fontSize: 12,
        marginLeft: 15,
    },
    centeredViewModel1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Height(13)
    },
    modalViewModel1: {
        width: ScreenWidth / 1.3,
        // margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: Width(4),
        height: 240,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

});
export default connect(ReducersProps, null)(CategoriesDetail)