import React, { Component } from 'react';

import { View, Text, Button, Modal, ScrollView, } from 'react-native';

export class MyOwnModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (

            <Modal
                key={this.props.modalKey}
                transparent={this.props.istransparent !== undefined ? true : false}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>

                <View style={{
                    //your styles for modal here. Example:
                    marginHorizontal: width(10), marginVertical: '30%',
                    height: '40%', borderColor: 'rgba(0,0,0,0.38)', padding: 5,
                    alignItems: 'center',
                    backgroundColor: '#fff', elevation: 5, shadowRadius: 20, shadowOffset: { width: 3, height: 3 }
                }}>

                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        {this.props.children}
                    </ScrollView>

                </View>
            </Modal>
        );
    }
}