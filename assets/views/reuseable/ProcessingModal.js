import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modalbox'
import { boldTextFont, primaryColor, textFont } from '../../utils/Style'

export default class ProcessingMoadl extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "We are processing your information",
            description: "This may take up to 15 seconds"
        }
    }

    render() {
        let { title, description } = this.state
        return (
            <Modal
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                isOpen={this.state.isInavlidAmount}
                backButtonClose={false}
                backdropPressToClose={false}
                swipeToClose={false}
                coverScreen={true}
                ref={"_processingModal"}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 15 }}>
                    <View style={{ paddingHorizontal: 20, alignItems: "center" }}>

                        <View style={{ height: 100 }}>
                            <ActivityIndicator size={"large"} color={primaryColor} />
                        </View>
                        <Text style={[boldTextFont, { color: "#fff", fontSize: 20, marginVertical: 10, textAlign: "center" }]}>{title}</Text>
                        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 5 }}>
                            <Text style={[textFont, { color: "#fff", fontSize: 16, }]}>{description} </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#fff", width: "20%", height: 0.7, marginTop: 10, marginBottom: 20 }} />
                </View>
            </Modal>
        )
    }

    showModal(title, description) {
        if (title && title != "") {
            this.setState({ title })
        }
        if (description && description != "") {
            this.setState({ description })
        }
        this.refs._processingModal.open()
    }

    cancelModal() {
        this.refs._processingModal.close()
    }
}
