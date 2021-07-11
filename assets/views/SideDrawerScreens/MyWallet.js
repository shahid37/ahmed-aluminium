import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class MyWallet extends Component {
    render() {
        return (
            <View>

                <MyHeader title="My Wallet" navigation={this.props.navigation}/>
                <Text>Under Decsion From Higher Authority</Text>
            </View>
        )
    }
}
