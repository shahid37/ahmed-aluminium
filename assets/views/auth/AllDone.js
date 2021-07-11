import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { primaryColor, textFont } from '../../utils/Style'
import FAIcons from 'react-native-vector-icons/FontAwesome'
import Utils from '../../utils/Utils'
import InfoViewModal from '../reuseable/InfoViewModal'
import Prefmanager from '../../data/local/Prefmanager'
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'

const webHandler = new WebHandler()
class AllDone extends Component {

    state = {
        profilePic: this.props.route.params?._profilePic ?? null
    }

    componentDidMount() {
        let { profilePic } = this.state
        let prefs = new Prefmanager()
        prefs.updateLoginStatus(true, () => {
            if (profilePic) {
                let formData = new FormData()
                formData.append("image", { uri: profilePic, name: 'profile_pic.jpg', type: 'image/jpeg' })
                webHandler.postMediaRequest(Routes.PROFILE_PIC_UPLOAD, formData, (resp) => {
                    this.notificationsModal.showModal()
                }, (errorData) => {
                    this.notificationsModal.showModal()
                    if (errorData != webHandler.CATCH_ERROR) {
                        myUtils.showMessagePopup("Message", errorData.message)
                    }
                })
            } else {
                this.notificationsModal.showModal()
            }
        })
    }

    render() {
        let { profilePic } = this.state
        let { language, theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: theme.background, alignItems: "center", justifyContent: "center" }}>

                <InfoViewModal
                    ref={ref => this.notificationsModal = ref}
                    theme={theme}
                    imagePath={require("../../images/bell_icon.png")}
                    title={"Turn on notifications?"}
                    detail={"We can let you know when someone messages you , or notify you about other important account activity."}
                    buttonData={{
                        text: "Yes, notify me", onPress: () => {
                            this.notificationsModal.cancelModal()
                            setTimeout(() => {
                                this.locationModal.showModal()
                            }, 500)
                        }
                    }}
                />

                <InfoViewModal
                    ref={ref => this.locationModal = ref}
                    theme={theme}
                    imagePath={require("../../images/agenda_icon.png")}
                    title={"Allow Contacts Access"}
                    detail={"We wants to access your contacts only to provide a better experience by helping you find your friends."}
                    buttonData={{
                        text: "Allow", onPress: () => {
                            this.locationModal.cancelModal()
                            setTimeout(() => {
                                // this.noNetworkModal.showModal()
                                this.props.navigation.navigate("Followsuggest")
                            }, 500)
                        }
                    }}
                />

                <InfoViewModal
                    ref={ref => this.noNetworkModal = ref}
                    theme={theme}
                    imagePath={require("../../images/nointernet_icon.png")}
                    title={"Ooops!"}
                    detail={"No internet connection found. Please check your connection"}
                    buttonData={{
                        text: "Try Again", onPress: () => {
                            this.noNetworkModal.cancelModal()
                            this.props.navigation.navigate("Followsuggest")
                        }
                    }}
                />

                <Image
                    source={require("../../images/design_pattern_1.png")}
                    style={{ width: "100%" }}
                    resizeMode="contain"
                />
                <View style={{
                    borderRadius: 75, width: 150, height: 150, borderColor: theme.secondaryBG,
                    borderWidth: 1, alignItems: "center", justifyContent: "center", marginTop: -80
                }}>
                    {profilePic &&
                        <Image
                            style={{ width: 120, height: 120, borderRadius: 60 }}
                            source={{ uri: profilePic }}
                        />
                    }
                    {!profilePic &&
                        <FAIcons name={"user"} size={120} color={theme.iconsBG} />
                    }
                </View>
                <Text style={{ ...textFont, color: theme.text, marginVertical: 10, fontSize: 16 }}>{"You're all set!"}</Text>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        )
    }
}

export default connect(ReducersProps, null)(AllDone)