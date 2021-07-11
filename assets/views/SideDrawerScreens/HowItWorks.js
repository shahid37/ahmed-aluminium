import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class HowItWorks extends Component {
    render() {
        return (
            <View>

                <MyHeader title="How Its Work"navigation={this.props.navigation} />
                <Text>Deciding This Page </Text>
            </View>
        )
    }
}
