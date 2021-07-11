import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import FAIcons from 'react-native-vector-icons/FontAwesome'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import DatePickerModal from '../reuseable/DatePickerModal'
import moment from 'moment'
import ProcessingMoadl from '../reuseable/ProcessingModal'
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'

const MALE = "male", FEMALE = "female"
const webHandler = new WebHandler()
const myUtils = new Utils()
class BasicInfo extends Component {

    constructor(props) {
        super()
        this.state = {
            shortBio: "",
            selectedGender: MALE,
            dob: null,

            isDObFError: false
        }
    }

    renerGenerPickerView() {
        let { theme } = this.props
        let { selectedGender, } = this.state
        return (
            <View style={{
                backgroundColor: theme.secondaryBG, borderRadius: 30,
                flexDirection: "row", alignItems: "center", padding: 5
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    borderRadius: selectedGender == MALE ? 30 : 0,
                    backgroundColor: selectedGender == MALE ? primaryColor : null,
                    padding: 10, alignItems: "center"
                }} onPress={() => this.setState({ selectedGender: MALE })}>
                    <Text style={{ ...textFont, color: selectedGender == MALE ? "#fff" : theme.text }}>
                        {"Male"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    borderRadius: selectedGender == FEMALE ? 30 : 0,
                    backgroundColor: selectedGender == FEMALE ? primaryColor : null,
                    padding: 10, alignItems: "center"
                }} onPress={() => this.setState({ selectedGender: FEMALE })}>
                    <Text style={{ ...textFont, color: selectedGender == FEMALE ? "#fff" : theme.text }}>
                        {"Female"}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        let { shortBio, dob, isDObFError } = this.state
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <ProcessingMoadl ref={ref => this.processingModal = ref} />
                <DatePickerModal theme={theme}
                    ref={ref => this.docPickerModal = ref}
                    onSaved={(date) => { this.setState({ dob: date, isDObFError: false }) }} />
                <MyHeader navigation={this.props.navigation} rightAction={{ text: "Skip", onPress: () => { this.props.navigation.navigate("UploadPhoto") } }} />
                <ScrollView style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                        {"Almost Done"}
                    </Text>
                    <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                        {"Please, complete your profile"}
                    </Text>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                {"Short Bio"}
                            </Text>
                            <View style={{
                                backgroundColor: theme.secondaryBG, borderRadius: 4,
                                flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                            }}>
                                <FIcons name={"align-left"} size={24} color={theme.iconsBG} />
                                <TextInput
                                    ref={ref => this.emailRef = ref}
                                    style={{
                                        ...textFont, flex: 1, fontSize: 16,
                                        paddingHorizontal: 10, color: theme.text,
                                        paddingVertical: Platform.OS == "ios" ? 15 : 10
                                    }}
                                    maxLength={200}
                                    value={shortBio}
                                    keyboardType="default"
                                    onChangeText={(txt) => { this.setState({ shortBio: txt }) }}
                                    returnKeyType="next"
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                {"Date of birth"}
                            </Text>
                            <View style={{
                                backgroundColor: theme.secondaryBG, borderRadius: 4,
                                flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                            }}>
                                <FAIcons name={"birthday-cake"} size={24} color={theme.iconsBG} />
                                <TouchableOpacity activeOpacity={0.7}
                                    onPress={() => this.handleOnDOBSelect()}>
                                    <View style={{
                                        backgroundColor: theme.secondaryBG, borderRadius: 4,
                                        flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                    }}>
                                        <Text style={{
                                            ...textFont, fontSize: 16, padding: 10,
                                            color: dob ? theme.text : theme.secondaryText
                                        }}>
                                            {dob ? moment(dob).format("DD MMMM yyyy") : "Select your DOB"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {isDObFError &&
                                <Text style={{ ...textFont, color: "red", fontSize: 12, marginBottom: 2 }}>
                                    {"* Please select your DOB"}
                                </Text>
                            }
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                {"Gender"}
                            </Text>
                            {this.renerGenerPickerView()}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 14, marginBottom: 5 }}>
                                {"Category Industry"}
                            </Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <View style={{
                                    backgroundColor: theme.secondaryBG, borderRadius: 4, paddingVertical: 7,
                                    flexDirection: "row", alignItems: "center", paddingHorizontal: 10
                                }}>
                                    <FIcons name={"grid"} size={24} color={theme.iconsBG} />
                                    <Text style={{ ...textFont, flex: 1, fontSize: 16, padding: 10, color: theme.text }}>

                                    </Text>
                                    <FAIcons style={{ marginHorizontal: 5 }} name={"caret-down"} size={16} color={primaryColor} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Button
                            label={"Continue"}
                            onPress={() => { this.handleOnSubmit() }}
                            bgStyle={{ marginVertical: 20 }}
                            isFocused={true}
                        />

                    </View>
                </ScrollView>
            </View>
        )
    }

    handleOnDOBSelect() {
        let { dob } = this.state
        let minDate = moment().subtract(100, "year").toDate()
        let maxDate = moment().subtract(5, "year").toDate()
        let date = dob ? dob : moment().subtract(15, "year").toDate()
        this.docPickerModal.openWithRange(date, minDate, maxDate)
    }

    handleOnSubmit() {
        let { shortBio, dob, selectedGender } = this.state
        if (!dob) {
            this.setState({ isDObFError: true })
            return
        }
        this.processingModal.showModal()
        let bodyParams = {
            shortbio: shortBio,
            dob: moment(dob).format("YYYY-MM-DD"),
            gender: selectedGender
        }
        webHandler.postDataRequest(Routes.BASIC_INFO_UPDATE, bodyParams, (resp) => {
            this.processingModal.cancelModal()
            this.props.navigation.navigate("UploadPhoto")
        }, (errorData) => {
            this.processingModal.cancelModal()
            if (errorData != webHandler.CATCH_ERROR) {
                myUtils.showMessagePopup("Message", errorData.message)
            }
        })
    }
}

export default connect(ReducersProps, null)(BasicInfo)