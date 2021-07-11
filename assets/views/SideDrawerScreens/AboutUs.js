import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class AboutUs extends Component {
    render() {
        return (
            <View>

                <MyHeader title="About Us" navigation={this.props.navigation} />
                <Text>We are Deciding About us page </Text>
            </View>
        )
    }
}
