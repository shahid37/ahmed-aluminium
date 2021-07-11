import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class LiveSupport extends Component {
    render() {
        return (
            <View>

                <MyHeader title="Live Support"navigation={this.props.navigation} />
                <Text>Under Decision</Text>
            </View>
        )
    }
}
