import React, { useState, Component, useEffect } from "react";
import { Button, Text, View, TextInput, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { defFont, primaryColor, borderColor, defaultColor } from '../../utils/Style'
import FIcons from 'react-native-vector-icons/Feather'
import { FontSize, Height, Width } from '../../utils/Dimensions'
import { connect } from "react-redux";
import Utils from "../../utils/Utils";


const MyUtils = new Utils()

const MyDatePicker = (props) => {
    const label = props.label ? props.label : ""
    const dateFormat = props.dateFormat ? props.dateFormat : "datetime"
    const minDate = props.minDate ? props.minDate : new Date()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(props.isVisible ? props.isVisible : false);
    const [selectedDate, setSelectedDate] = useState(props.date ? props.date : new Date());

    useEffect(() => {
        setSelectedDate(props.date ? props.date : new Date())
    }, [props.date])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setSelectedDate(date)
        hideDatePicker();
    };

    return (
        <View>
            {label != "" &&
                <Text style={[defFont, { fontSize: FontSize(12), color: defaultColor, marginBottom: Height(.8) }]}> {label} </Text>
            }
            <View style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                borderRadius: 100,
                padding: Width(1),
                marginTop: Height(1.8),
                marginLeft: Width(0.23),
                paddingHorizontal: Width(2),
                borderColor: "#CBCBCB",
                borderWidth: 1
            }}>
                <TouchableOpacity activeOpacity={.8} onPress={() => showDatePicker()}
                    style={{
                        // flex: 1,
                        // backgroundColor:"#000"

                    }}>
                    <Text style={{
                        ...defFont,
                        fontSize: FontSize(12),
                        paddingVertical: Width(2),
                        color:"#000"
                    }}>
                      Start Date
                    </Text>

                    <Text style={{
                        ...defFont,
                        fontSize: FontSize(10),
                        paddingVertical: Width(2)
                    }}>

                        {MyUtils.getMomentDate(selectedDate, "MMM DD, YY - h:mm A")}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    date={selectedDate}
                    minimumDate={minDate}
                    mode={dateFormat}
                    onConfirm={(date) => { handleConfirm(date); props.handleOnSubmit(date) }}
                    onCancel={() => { hideDatePicker() }}
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        // counter: state.init.notificationCounter,
        // isSideMenuOpen: state.init.isSideMenuOpen,
        // notificationsArr: state.init.notifications,
    }
}
export default connect(mapStateToProps, null)(MyDatePicker)
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})
