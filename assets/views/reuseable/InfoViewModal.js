import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Modal from 'react-native-modalbox'
import Button from '../reuseable/Button'
import { boldTextFont, textFont } from '../../utils/Style'

class InfoViewModal extends Component {

    state = {
        isModalVis: false
    }

    render() {
        let { theme, imagePath, title, detail, buttonData } = this.props
        return (
            <Modal
                isOpen={this.state.isModalVis}
                ref={ref => this.modalRef = ref}
                backdropPressToClose={false}
                swipeToClose={false}
                coverScreen={true}
                style={{ backgroundColor: theme.background }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                    {imagePath &&
                        <Image style={{ width: 150, height: 150, marginBottom: 40 }} source={imagePath} />
                    }
                    <View style={{ alignItems: "center", marginVertical: 15, paddingHorizontal: 10 }}>
                        <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                            {title}
                        </Text>
                        <Text style={{ ...textFont, color: theme.secondaryText, textAlign: "center", fontSize: 16, marginTop: 5 }}>
                            {detail}
                        </Text>

                        <View style={{ width: 200, marginVertical: 20 }}>
                            <Button
                                label={buttonData && buttonData.text}
                                onPress={() => { buttonData && buttonData.onPress() }}
                                bgStyle={{ fontSize: 14, paddingHorizontal: 10 }}
                                isFocused={true}
                            />
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }

    showModal() {
        this.modalRef.open()
    }

    cancelModal() {
        this.modalRef.close()
    }
}

export default (InfoViewModal)