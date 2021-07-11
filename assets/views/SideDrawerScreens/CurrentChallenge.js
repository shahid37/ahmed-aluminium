import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { TabView, SceneMap, TabBar, Label } from 'react-native-tab-view';
import MyHeader from "../reuseable/MyHeader";

import { mediumTextFont, boldTextFont, Empty, primaryColorLite, primaryColor, textDefault, textFont } from '../../utils/Style';
import { FontSize, Height } from '../../utils/Dimensions';


const dimensions = Dimensions.get('window')
const dimWidth = dimensions.width
const dimHeight = dimensions.height


export default class CurrentChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            index: 0,
            routes: [
                { key: 'first', title: 'Completed Challenges' },
                { key: 'second', title: 'Cancelled Challenges' },
            ],
            currentChallengeList: [
                { challengeNo: "Challenge # 11", challengeDate: "31-12-2020" },
                { challengeNo: "Challenge # 12", challengeDate: "24-12-2020" },
                { challengeNo: "Challenge # 13", challengeDate: "08-11-2020" },
                { challengeNo: "Challenge # 14", challengeDate: "31-12-2020" },
                { challengeNo: "Challenge # 15", challengeDate: "24-12-2020" },
                { challengeNo: "Challenge # 16", challengeDate: "08-11-2020" },
            ],


        };
    }

    getDateStatus = (date) => {
        var newDate = date.replace('-', '');
        newDate = newDate.replace('-', '');
        console.log("=transfer Date========", newDate)

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var todaydate=date+""+month+""+year

        console.log("======getDtae=======",todaydate )
        if(newDate>todaydate){return(false)}//date is coming
        else{return(true)}
        // return (date + month + year)
    }
   

    ListDesign = (name) => (
        <FlatList

            data={name}
            keyExtractor={(item) => item.challengeNo}
            numColumns={1}
            renderItem={({ item }) => {
                return <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#F1F1F1", margin: Height(2), marginHorizontal: Height(2), height: Height(6), alignContent: "center", alignItems: "center" }}   >
                    <Text style={styles.listTextDesign}>{item.challengeNo}</Text>

                    <Text style={styles.listTextDesign}>Due Date: <Text style={this.getDateStatus(item.challengeDate)==true? styles.redDate:styles.listTextDesign}>{item.challengeDate}</Text></Text>
                </View>

            }}
        />
    );


    render() {
        return (
            <View style={styles.mainContainer}>
                <MyHeader title="Current challenge" navigation={this.props.navigation}/>
                {this.ListDesign(this.state.currentChallengeList)}
               

            </View>


        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scene: {
        flex: 1,
    },
    activeTabTextColor: {
        color: '#eeaf3b'
    },
    tabTextColor: {
        color: '#ccc'
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: "#fff"
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    listTextDesign: {
        ...mediumTextFont,
        color: "#646464"
    },
    redDate: {
        ...mediumTextFont,
        color: "#F54B4B"
    }
});