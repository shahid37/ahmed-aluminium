import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class PrivacyPolicy extends Component {
    render() {
        return (
            <View>

                <MyHeader title="Privacy Policy" navigation={this.props.navigation} />
                <Text>Privacy Policy Under Process still...</Text>
            </View>
        )
    }
}
