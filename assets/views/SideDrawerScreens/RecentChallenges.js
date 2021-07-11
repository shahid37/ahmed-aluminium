import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { TabView, SceneMap, TabBar, Label } from 'react-native-tab-view';
import MyHeader from "../reuseable/MyHeader";

import { mediumTextFont, boldTextFont, Empty, primaryColorLite, primaryColor, textDefault, textFont } from '../../utils/Style';
import { FontSize, Height } from '../../utils/Dimensions';


const dimensions = Dimensions.get('window')
const dimWidth = dimensions.width
const dimHeight = dimensions.height


export default class RecentChallenges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            index: 0,
            routes: [
                { key: 'first', title: 'Completed Challenges' },
                { key: 'second', title: 'Cancelled Challenges' },
            ],
            completedChallengeList: [
                { challengeNo: "Challenge # 11", challengeDate: "22-12-2020" },
                { challengeNo: "Challenge # 12", challengeDate: "26-12-2020" },
                { challengeNo: "Challenge # 13", challengeDate: "28-12-2020" },
            ],
            cancelledChallengeList: [
                { challengeNo: "Challenge # 14", challengeDate: "22-11-2020" },
                { challengeNo: "Challenge # 15", challengeDate: "26-10-2020" },
                { challengeNo: "Challenge # 16", challengeDate: "28-09-2020" },
            ],

        };
    }


    FirstRoute = () => (
        this.ListDesign(this.state.completedChallengeList)
    );

    SecondRoute = () => (
        this.ListDesign(this.state.cancelledChallengeList)
    );

    renderScene = SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute,
    });

    ListDesign = (name) => (
        <FlatList

            data={name}
            keyExtractor={(item) => item.challengeNo}
            numColumns={1}
            renderItem={({ item }) => {
                return <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#F1F1F1", margin: Height(2), marginHorizontal: Height(2), height: Height(6), alignContent: "center", alignItems: "center" }}   >
                    <Text style={styles.listTextDesign}>{item.challengeNo}</Text>
                    <Text style={styles.listTextDesign}>{item.challengeDate}</Text>
                </View>

            }}
        />
    );


    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: primaryColor }}
                style={{ backgroundColor: '#fff', margin: 10, elevation: 0 }}
                renderLabel={({ route, focused, color }) => (
                    <Text style={{ ...mediumTextFont, fontSize: FontSize(11), color: "#434343", }}>
                        {route.title}
                    </Text>
                )}

            />
        );
    };


    render() {
        return (
            <View style={styles.mainContainer}>
                {/* <MyHeader/> */}

                <MyHeader title="Recent challenge" navigation={this.props.navigation} />
                <TabView

                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={this._handleIndexChange}
                    renderTabBar={this._renderTabBar}




                    initialLayout={{ width: dimWidth, height: dimHeight }}
                />

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
    }
});