import React, { Component } from 'react';
import { View, ActivityIndicator, Modal, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image, StatusBar, ImageBackground } from 'react-native';
import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
import { mediumTextFont, textFont, primaryColor, fontColor, defaultFont, secondryColor, primaryColorLite, textDefault } from '../utils/Style'
import Utils from '../utils/Utils';
import { FontSize, Height, ScreenWidth, Width } from '../utils/Dimensions';
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontistoIcons from 'react-native-vector-icons/Fontisto'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Button from "../views/reuseable/Button"


const MyUtils = new Utils()

class CreateChallenge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            curTab: 1,
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

            ]

        }
    }
    challengesDisplayDesign() {
        return (
            <View>
                <View style={{ flex: 0.6, marginVertical: Height(1.5), marginHorizontal: Width(1) }}>
                    <Text style={{ ...defaultFont, fontSize: FontSize(16), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(5), color: "black", paddingHorizontal: Width(2), }}>Personal Detail</Text>
                </View>

                <View style={{
                    flexDirection: "row", height: Height(5), top: -60, alignContent: "center", width: Width(84), left: 4, alignItems: "center", padding: 9, justifyContent: "space-between", marginHorizontal: Width(2), borderRadius: 100, borderWidth: Width(0.10), borderColor: primaryColor, marginTop: 5, backgroundColor: "white", borderColor: "#E1E1E1",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 10.97,

                    elevation: 2,
                }}>
                    {/* <Text style={{ height: Height(4), width: Width(8), paddingLeft: 11, paddingTop: 4, borderRadius: 100, color: "white", borderWidth: Width(0.50), backgroundColor: primaryColor, borderColor: primaryColor, fontSize: 12 }}>1</Text> */}
                    <AntDesignIcons name={"user"} color="#676767" size={Width(5)} style={{ marginHorizontal: Width(1) }} />
                    <Text style={{ ...textFont, fontSize: FontSize(11), top: 2, left: -130, color: fontColor, textAlign: "center" }}>
                        usmanansarihwryk
                 </Text>

                </View>



                <View style={{
                    flexDirection: "row", height: Height(5), top: -54, alignContent: "center", width: Width(84), left: 4, alignItems: "center", padding: 9, justifyContent: "space-between", marginHorizontal: Width(2), borderRadius: 100, borderWidth: Width(0.10), borderColor: primaryColor, marginTop: 5, backgroundColor: "white", borderColor: "#E1E1E1",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 10.97,

                    elevation: 2,
                }}>
                    {/* <Text style={{ height: Height(4), width: Width(8), paddingLeft: 11, paddingTop: 4, borderRadius: 100, color: "white", borderWidth: Width(0.50), backgroundColor: primaryColor, borderColor: primaryColor, fontSize: 12 }}>1</Text> */}
                    <FeatherIcon name={"phone"} color="#676767" size={Width(5)} style={{ marginHorizontal: Width(1) }} />
                    <Text style={{ ...textFont, fontSize: FontSize(11), top: 2, left: -150, color: fontColor, textAlign: "center" }}>
                        +92 348 2727262
                 </Text>

                </View>

                <View style={{
                    flexDirection: "row", height: Height(5), top: -48, alignContent: "center", width: Width(84), left: 4, alignItems: "center", padding: 9, justifyContent: "space-between", marginHorizontal: Width(2), borderRadius: 100, borderWidth: Width(0.10), borderColor: primaryColor, marginTop: 5, backgroundColor: "white", borderColor: "#E1E1E1",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 10.97,

                    elevation: 2,
                }}>
                    {/* <Text style={{ height: Height(4), width: Width(8), paddingLeft: 11, paddingTop: 4, borderRadius: 100, color: "white", borderWidth: Width(0.50), backgroundColor: primaryColor, borderColor: primaryColor, fontSize: 12 }}>1</Text> */}
                    <MaterialCommunityIcons name={"email"} color="#676767" size={Width(5)} style={{ marginHorizontal: Width(1) }} />
                    <Text style={{ ...textFont, fontSize: FontSize(11), top: 2, left: -67, color: fontColor, textAlign: "center" }}>
                        usman852ansari@gmail.com
                 </Text>

                </View>

                <TouchableOpacity style={{ borderRadius: 15, top: -25, left: 75, backgroundColor: primaryColor, padding: 3, marginHorizontal: Width(24) }}>
                    <Text style={{ ...defaultFont, color: "white", textAlign: "center", marginHorizontal: 10, height: Height(3) }}>Change Password</Text>
                </TouchableOpacity>


                <View style={styles.txtInputView}>
                    <MaterialCommunityIcons name="lock-open-check" style={styles.txtInputIcon} color="#676767" size={Width(5)} />
                    <TextInput
                        style={styles.txtInputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        // underlineColorAndroid="#979797"
                        returnKeyType="next"
                        secureTextEntry={true}
                        placeholder="Old Password"
                        //  value={this.state.username}
                        //  onChangeText={(text) => this.setState({ username: text })}
                        placeholderTextColor='#676767' />
                </View>
                <View style={styles.txtInputView}>
                    <MaterialCommunityIcons name="lock-open-check" style={styles.txtInputIcon} color="#676767" size={Width(5)} />
                    <TextInput
                        style={styles.txtInputStyle}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCorrect={false}
                        // underlineColorAndroid="#979797"
                        returnKeyType="next"
                        placeholder="New Password"
                        //  value={this.state.username}
                        //  onChangeText={(text) => this.setState({ username: text })}
                        placeholderTextColor='#676767' />
                </View>
                <View style={styles.txtInputView}>
                    <MaterialCommunityIcons name="lock-open-check" style={styles.txtInputIcon} color="#676767" size={Width(5)} />
                    <TextInput
                        style={styles.txtInputStyle}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCorrect={false}
                        // underlineColorAndroid="#979797"
                        returnKeyType="next"
                        placeholder="Confirm Password"
                        //  value={this.state.username}
                        //  onChangeText={(text) => this.setState({ username: text })}
                        placeholderTextColor='#676767' />
                </View>

                <View style={{flexDirection:"row",top:10}}>
                <TouchableOpacity style={{ borderRadius: 15,  backgroundColor: primaryColor, padding: 3,left:90}}>
                    <Text style={{ ...defaultFont, color: "white", textAlign: "center", marginHorizontal: 10, height: Height(3.5),top:2 }}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderRadius: 15,borderColor:primaryColor,borderWidth:1,left:100,backgroundColor: "#fff", padding: 2, }}>
                    <Text style={{ ...defaultFont, color: primaryColor, textAlign: "center", marginHorizontal: 10, height: Height(3.5),top:2 }}>Cancel</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }

    render() {

        return (
            <View style={styles.mainContainer}>

                <StatusBar backgroundColor={primaryColor} />

                <View style={styles.mainInnerContainer}>
                    <AntDesignIcons name={"arrowleft"} color="#fff" size={Width(8)} style={{ marginHorizontal: Width(5) }} />
                    <Text style={styles.headerTitleDesign}>Profile Setting</Text>
                </View>

                {/* <View style={styles.mainModelDesign}> */}

                <View style={styles.imageBackDesign}>
                    <View style={styles.imageBorderDesign}>
                        <Image
                            style={{ width: Width(28), height: Width(28), borderRadius: 100,left:14 }}
                            source={require("../images/facebookIcon.png")} resizeMode="contain" />
                        <TouchableOpacity onPress={() => { alert("usman") }}>
                            <IoniconsIcons name={"create-outline"} color={primaryColor} size={Width(6)} style={{ backgroundColor: "white", top: -21, left: 3, padding: 2, borderRadius: 100, }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ top: Height(-9), }}>
                    {this.challengesDisplayDesign()}

                </View>
                {/* </View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    txtInputIcon: { position: 'relative', paddingRight: 10, right: -12 },
 
    txtInputStyle: {
        flex: 1, height: Height(5.2),top:5,right:-10,...textFont, fontSize: FontSize(11)
    },
    txtInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:100,
        margin:Height(0.7),
        top:-10,
        borderColor:primaryColor,
        marginHorizontal:Width(3),
        backgroundColor:"white" ,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.53,
        shadowRadius: 10.97,

        elevation: 2,
    },
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        alignItems: "center"
    },
    mainInnerContainer: {
        width: ScreenWidth,
        height: Height(30),
        backgroundColor: primaryColor,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        flexDirection: "column",
    },
    headerTitleDesign: {
        ...textFont,
        color: "#fff",
        fontSize: FontSize(18),
        textAlign: "center"
    },
    mainModelDesign: {
        top: Height(-13),
        width: ScreenWidth / 1.1,
        height: Height(74),
        alignItems: "center",
        backgroundColor: "#fff",

        borderTopRightRadius: Width(8),
        borderTopLeftRadius: Width(8),
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 9,
    },
    imageBackDesign: {
        width: Width(33),
        height: Height(16.3),
        backgroundColor: "#fff",
        borderRadius: 100,
        top: Height(-10),
        justifyContent: "center",
        alignItems: "center",

    },
    imageBorderDesign: {
        width: Width(30),
        height: Height(15),
        borderRadius: 100,
        flexDirection: "row",
        borderWidth: Width(0.50),
        borderColor: primaryColor,
        justifyContent: "center",
        alignItems: "center"
    },
    inputFieldDesigns: {
        fontSize: FontSize(13),
        width: Width(80),
        height: Height(5),

        borderRadius: 100,
        borderWidth: Width(0.30),
        paddingLeft: Width(5),
        paddingRight: Width(5),
        justifyContent: "flex-start",
    },
    dateFieldDesign: {
        fontSize: FontSize(11),
        width: Width(35),
        height: Height(4.5),
        marginTop: Height(2),
        justifyContent: "center",
        borderRadius: 100,
        ...textFont,
        borderWidth: Width(0.30),
    },
    dateTextDesign: {
        fontSize: FontSize(13),
        color: fontColor,
    },
    dateTextInputDesign: {
        alignItems: "flex-start",
        paddingLeft: Width(5),
        paddingRight: Width(5),
        borderWidth: Width(0),
    },
    bottomTextDesign: {
        ...mediumTextFont,
        fontSize: FontSize(11),
    },
    dropdownMenuDesign: {
        marginTop: Width(3),
        width: Width(80),
        height: Height(5),
        borderRadius: 100,
        borderWidth: Width(0.30),
        paddingLeft: Width(5),
        paddingRight: Width(5),
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    // -----------

    centeredViewModel1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Height(13)
    },
    modalViewModel1: {
        width: ScreenWidth / 1.3,
        // margin: 20,
        backgroundColor: "#f6f5f5",
        borderRadius: 20,
        padding: Width(4),
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

    centeredViewModel2: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",



    },
    modalViewModel2: {
        width: ScreenWidth / 1,
        borderTopLeftRadius: Width(15),
        borderTopRightRadius: Width(15),
        height: Height(43),
        backgroundColor: "#f6f5f5",
        paddingTop: Height(3),


        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },



})
export default connect(ReducersProps, null)(CreateChallenge)