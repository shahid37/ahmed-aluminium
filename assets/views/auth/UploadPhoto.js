import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { boldTextFont, mediumTextFont, primaryColor, textFont } from '../../utils/Style'
import MyHeader from '../reuseable/MyHeader'
import FIcons from 'react-native-vector-icons/Feather'
import Utils from '../../utils/Utils'
import Button from '../reuseable/Button'
import Modal from 'react-native-modal'
import InfoViewModal from '../reuseable/InfoViewModal'
import ImagePicker from 'react-native-image-crop-picker';

const CAMERA_TYPE = 1, GALLERY_TYPE = 2
const myUtils = new Utils()
class UploadPhoto extends Component {

    constructor(props) {
        super()
        this.state = {
            profilePic: null,
            isPermissionAskView: false,
            isPicOptPickerModalVis: false,
            selectionType: null
        }
    }

    renderPicOptionPickerModal() {
        let { theme } = this.props
        return (
            <Modal
                testID={'modal'}
                isVisible={this.state.isPicOptPickerModalVis}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={{ justifyContent: 'flex-end', margin: 0, }}>

                <View style={{ padding: 10, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ ...boldTextFont, color: theme.text, fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                        {"Update profile photo"}
                    </Text>

                    <View style={{
                        backgroundColor: theme.background, borderRadius: 7,
                        padding: 10, width: "100%", marginVertical: 10
                    }}>
                        <TouchableOpacity style={{
                            alignItems: "center", padding: 10, borderBottomWidth: 1,
                            borderBottomColor: theme.secondaryBG,
                        }} onPress={() => this.handleOnAddPhoto(CAMERA_TYPE)}>
                            <Text style={{ ...textFont, color: theme.text, fontSize: 16 }}>
                                {"Take photo"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: "center", padding: 10 }}
                            onPress={() => this.handleOnAddPhoto(GALLERY_TYPE)}
                        >
                            <Text style={{ ...textFont, color: theme.text, fontSize: 16 }}>
                                {"Choose existing"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor: theme.background, borderRadius: 30,
                        alignItems: "center", padding: 10, width: "100%"
                    }} activeOpacity={0.7} onPress={() => this.setState({ isPicOptPickerModalVis: false })}>
                        <Text style={{ ...textFont, color: theme.text, fontSize: 16 }}>
                            {"Cancel"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        )
    }

    render() {
        let { language, theme } = this.props
        let { isPermissionAskView, profilePic } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <InfoViewModal
                    ref={ref => this.camerPermissionModal = ref}
                    theme={theme}
                    imagePath={require("../../images/camera.png")}
                    title={"Camera Access"}
                    detail={"Please allow access to your camera to take photos."}
                    buttonData={{
                        text: "Allow", onPress: () => {
                            this.camerPermissionModal.cancelModal()
                            setTimeout(() => {
                                this.handleOnSelectPic()
                            }, 1000)
                        }
                    }}
                />
                {this.renderPicOptionPickerModal()}
                <MyHeader navigation={this.props.navigation}
                    rightAction={{ text: "Skip", onPress: () => { this.props.navigation.navigate("AllDone") } }} />
                {!isPermissionAskView &&
                    <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                        <Text style={{ ...boldTextFont, color: theme.text, fontSize: 25, fontWeight: "bold" }}>
                            {myUtils.isEmptyString(profilePic) ? "Add your photo" : "Looks Good!"}
                        </Text>
                        <Text style={{ ...textFont, color: theme.secondaryText, fontSize: 16, marginTop: 5 }}>
                            {myUtils.isEmptyString(profilePic) ? "Help your friends find you easier" : "Tap the photo if you disagree!"}
                        </Text>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <View style={{
                                borderRadius: 75, width: 150, height: 150, borderColor: theme.secondaryBG,
                                borderWidth: 1, alignItems: "center", justifyContent: "center"
                            }}>
                                <TouchableOpacity onPress={() => { this.setState({ isPicOptPickerModalVis: true }) }}>
                                    {myUtils.isEmptyString(profilePic) &&
                                        <View style={{
                                            borderRadius: 60, width: 120, height: 120, alignItems: "center",
                                            padding: 10, backgroundColor: theme.secondaryBG, justifyContent: "center",
                                            borderWidth: 1, borderColor: theme.secondaryBG,
                                        }}>
                                            <View style={{ padding: 15, borderRadius: 100, backgroundColor: primaryColor }}>
                                                <FIcons style={{}} name={"camera"} size={30} color={"#fff"} />
                                            </View>
                                        </View>
                                    }
                                    {!myUtils.isEmptyString(profilePic) &&
                                        <Image
                                            style={{ width: 120, height: 120, borderRadius: 60 }}
                                            source={{ uri: profilePic }}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            {myUtils.isEmptyString(profilePic) &&
                                <Text style={{ ...textFont, color: theme.text, marginVertical: 10, fontSize: 16 }}>{"Add Photo"}</Text>
                            }
                            {!myUtils.isEmptyString(profilePic) &&
                                <View style={{
                                    position: "absolute", bottom: 0, right: 0,
                                    marginHorizontal: 10, marginVertical: 20
                                }}>
                                    <Button
                                        label={"Continue"}
                                        onPress={() => {
                                            this.props.navigation.navigate("AllDone", {
                                                _profilePic: profilePic
                                            })
                                        }}
                                        bgStyle={{ fontSize: 14, padding: 0, width: 180 }}
                                        isFocused={true}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }

    handleOnAddPhoto(type) {
        this.setState({ isPicOptPickerModalVis: false, selectionType: type }, () => {
            setTimeout(() => {
                this.camerPermissionModal.showModal()
            }, 500)
        })
    }

    handleOnSelectPic() {
        let { selectionType } = this.state
        if (selectionType == CAMERA_TYPE) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                useFrontCamera: true
            }).then(image => {
                this.setState({ profilePic: image.path })
                console.log(image.path)
            }).catch((ex) => {
                console.log(ex.message)
            });
        } else if (selectionType == GALLERY_TYPE) {
            this.props.navigation.navigate("GalleryView", {
                onSelected: (filePath) => {
                    this.setState({ profilePic: filePath })
                    console.log(filePath)
                }
            })
        }
    }
}

export default connect(ReducersProps, null)(UploadPhoto)