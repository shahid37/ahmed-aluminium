import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class CancelledChallenges extends Component {
    render() {
        return (
            <View>

                <MyHeader title="Cancelled challenge" navigation={this.props.navigation} />
                <Text>Working And Deciding Cancelled Challenges page</Text>
            </View>
        )
    }
}
