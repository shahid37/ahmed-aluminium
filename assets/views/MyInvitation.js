import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, Alert, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';
import Challenge from './Challenge'
import Inbox from './Inbox'
import MyHeader from "./reuseable/MyHeader";
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import OptionsMenu from "react-native-option-menu";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'

import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../utils/Dimensions';
import { boldTextFont, Empty, fontColor, defaultFont, mediumTextFont, primaryColor, primaryColorLite, textDefault, textFont, secondryColor } from '../utils/Style';

import TabBar, { iconTypes } from "react-native-fluidbottomnavigation";

import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';



class ChallengeDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            curTab: 1,
            visible: false,
            calls: [
                { id: 1, name: "My Donation", status: "Sent by Usman", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                { id: 2, name: "University Fund", status: "Sent by Ali", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 3, name: "Prayer 5x", status: "Sent by Zarttash", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
                { id: 4, name: "My Donation", status: "Sent by Usman", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                { id: 5, name: "University Fund", status: "Sent by Ali", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 6, name: "Prayer 5x", status: "Sent by Zarttash", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },

                // { id: 6, name: "Umar Farooq", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                // { id: 8, name: "Khawar Hussain", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                // { id: 9, name: "Asad Ali", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                // { id: 10, name: "Tayyab Akmal", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                // { id: 11, name: "Hussnain Khalid", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
            ]
        }
    }
    //  openMenu = () => setVisible(true);

    //  closeMenu = () => setVisible(false);
    createRoom() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {
                    image: require('../images/ramzan1.jpg'),
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );

    }

    serachBarDesign() {
        return (
            <View style={{ flexDirection: "row", top: 15, height: Height(5), alignContent: "center", alignItems: "center", justifyContent: "space-between", marginHorizontal: Width(12), borderRadius: 100, borderWidth: Width(0.30), borderColor: primaryColor }}>
                <TextInput
                    style={{ fontSize: FontSize(13), marginHorizontal: Width(3), paddingTop: 1, top: 5, flex: 1 }}
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
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <Image source={{ uri: item.image }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <View style={{ flexDirection: "row", top: 5 }}>
                                <TouchableOpacity style={{ borderRadius: 15, backgroundColor: primaryColor, padding: 3,left:-45}}>
                                    <Text style={{ ...defaultFont, color: "white", textAlign: "center", marginHorizontal: 10, height: Height(3.5), top: 2 }}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderRadius: 15, borderColor: primaryColor, borderWidth: 1,  backgroundColor: "#fff", padding: 2,left:-40 }}>
                                    <Text style={{ ...defaultFont, color: primaryColor, textAlign: "center", marginHorizontal: 10, height: Height(3.5), top: 2 }}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.msgContainer}>
                            <FontAwesomeIcons name={"send"} color={primaryColor} size={Width(3)} style={{ top: -4, left: 10 }} />
                            <Text style={styles.msgTxt}>{item.status}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    //   serachBar() {
    //     return (
    //       <View style={{ marginTop:20,flexDirection: "row", height: Height(4), alignContent: "center", alignItems: "center", justifyContent: "space-between", marginHorizontal: Width(12), borderRadius: 100, borderWidth: Width(0.30), borderColor: primaryColor }}>
    //       <TextInput
    //         style={{ fontSize: FontSize(12), marginHorizontal: Width(3), paddingTop: 1, top: 5, flex: 1 }}
    //         autoCapitalize="none"
    //         autoCorrect={false}
    //         returnKeyType="next"
    //         //  value={this.state.username}
    //         //  onChangeText={(text) => this.setState({ username: text })}
    //         placeholder="Search..."
    //         placeholderTextColor={primaryColor} />

    //       <AntDesignIcons name={"search1"} color={primaryColor} size={Width(5)} style={{ marginHorizontal: Width(5) }} />

    //     </View>
    //     )
    //   }
    render() {
        const { language, theme } = this.props
        const icon = (<IoniconsIcons name={"menu-outline"} color={primaryColor} size={Width(5)} style={{ fontSize: 35, top: 14, marginHorizontal: Width(45) }} />)
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>

                {/* <ImageBackground source={require("../images/homeBackground.jpg")} style={styles.backgroungImage}> */}

                {/* <MyHeader title="Inbox" navigation={this.props.navigation} /> */}
                <ScrollView>
                    <View>
                        {this.serachBarDesign()}
                    </View>
                    <View style={{ flex: 1, marginTop: 20 }} >
                        <FlatList
                            extraData={this.state}
                            data={this.state.calls}
                            keyExtractor={(item) => {
                                return item.id;
                            }}

                            renderItem={this.renderItem} />
                    </View>

                </ScrollView>


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
    borderline: {
        marginRight: 45,
        marginLeft: 53,
        marginTop: 5,
        flexDirection: 'row',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
    },
    row: {

        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginLeft: 10,
        marginHorizontal: 16,

    },
    pic: {
        borderRadius: 30,
        width: 45,
        height: 45,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        color: '#222',
        fontSize: 14,
        width: 170,
        ...boldTextFont,
        top: 2
    },
    mblTxt: {
        fontWeight: '200',
        color: 'white',
        fontSize: 13,

    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        ...textFont,
        fontSize: 11,
        marginLeft: 15,
        top: -3
    },

});
export default connect(ReducersProps, null)(ChallengeDetail)