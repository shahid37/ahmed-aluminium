import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from "../reuseable/MyHeader";


export default class InviteYourFriend extends Component {
    render() {
        return (
            <View>

                <MyHeader title="Invite Your Friends"navigation={this.props.navigation} />
                <Text>Invite Your Friends under Decision</Text>
            </View>
        )
    }
}
