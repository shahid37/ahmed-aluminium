import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, StyleSheet,StatusBar,alert } from 'react-native';
import { boldTextFont, Empty, primaryColor, textDefault, textFont } from '../utils/Style';
import FIcons from 'react-native-vector-icons/Feather'
import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
import { FontSize, Height, ScreenWidth, Width } from '../utils/Dimensions';
import AppConfig from '../utils/AppConfig';
import Button from "../views/reuseable/Button"

class WelcomeScreen extends React.Component {
    render() {
        const { language, theme } = this.props
        return (
            <View style={{ backgroundColor: theme.dimBackground, flex: 1 }}>
                    <StatusBar   backgroundColor={primaryColor} />
                <ImageBackground source={require("../images/welcome2.jpg")} style={styles.backgroungImage}>
                    <View style={styles.innerMainView}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            {/* <Image
                                source={require("../images/logo-white.png")}
                                style={{
                                    width: Width(40), height: Width(40),
                                }}
                                resizeMode={"center"}
                            />
                            <Text style={styles.appNameCSS}>{AppConfig.appName}</Text> */}
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                            <View>
                                <Button
                                    theme={theme}
                                    isFocused={true}
                                    label={"Login"}
                                    onPress={() => { this.props.navigation.navigate("Login") }}
                                    txtStyle={{}}
                                    bgStyle={{
                                        backgroundColor: primaryColor,
                                        width: ScreenWidth / 2, height: Height(6),
                                        borderRadius: Width(100),
                                        marginBottom:Height(2)
                                        
                                    }}
                                />
                            </View>
                            <View>
                                <Button
                                    theme={theme}
                                    isFocused={true}
                                    label={"Sign Up"}
                                    onPress={() => { this.props.navigation.navigate("Signup") }}
                                    txtStyle={{}}
                                    bgStyle={{
                                        backgroundColor: primaryColor,
                                        width: ScreenWidth / 2, height: Height(6),
                                        borderRadius: Width(100)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    backgroungImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        
    },
    innerMainView: {
        paddingVertical: Height(6),
        flex: 1, flexDirection: "column",
        alignItems: "center", justifyContent: "center"
    },
    appNameCSS: {
        fontSize: FontSize(24), ...boldTextFont,
        color: "#fff", textAlign: "center",
        // marginVertical: Height(3)
    }
})
export default connect(ReducersProps, null)(WelcomeScreen)
