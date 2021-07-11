import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modalbox';
import { primaryColor, textFont } from '../../utils/Style';

const win = Dimensions.get('window')
export default class MyDatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            minDate: null,
            maxDate: null,
            modalVisible: false
        }
    }

    render() {
        const { theme } = this.props
        return (
            <Modal
                isOpen={this.state.modalVisible}
                onClosed={() => { this.setState({ modalVisible: false }); }}
                style={[styles.modal4, { backgroundColor: theme.background }]}
                position={'bottom'}
                ref={'modal'}>

                <View style={{ flex: 1, marginTop: 25, alignItems: "center", justifyContent: "center" }}>
                    <DatePicker
                        date={this.state.date}
                        fadeToColor={theme.background}
                        textColor={theme.text}
                        mode={'date'}
                        locale={'en'}
                        minimumDate={this.state.minDate}
                        maximumDate={this.state.maxDate}
                        onDateChange={date => this.setState({ date: date })}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => { this.handleOnSave() }}
                    activeOpacity={0.7}
                    style={{ backgroundColor: primaryColor, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[{ ...textFont, color: "#fff", fontSize: 14, padding: 10 }]}>{"Save"}</Text>
                </TouchableOpacity>

            </Modal>
        )
    }

    open(date) {
        this.setState({ date })
        this.refs.modal.open()
    }

    openWithRange(date, min, max) {
        this.setState({ date, minDate: min, maxDate: max })
        this.refs.modal.open()
    }

    close() {
        this.refs.modal.close()
    }

    handleOnSave() {
        let { date } = this.state
        this.props.onSaved(date)
        this.refs.modal.close()
    }
}

const styles = StyleSheet.create({
    modal4: {
        height: 40 / 100 * win.height,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})