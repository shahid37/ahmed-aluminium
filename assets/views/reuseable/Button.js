import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { textFont, primaryColor, mediumTextFont } from '../../utils/Style'
import AppConfig from '../../utils/AppConfig';
import { FontSize, Height, Width } from '../../utils/Dimensions';

class Button extends Component {
    render() {
        let { onPress, bgStyle, txtStyle, label, isFocused, badge, theme } = this.props
        return (
            <TouchableOpacity
                // style={{ flex: 1 }}
                activeOpacity={0.9}
                onPress={() => onPress()}
                accessibilityRole="button"
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    // locations={[1, 0]}
                    style={[{ alignItems: "center", borderRadius: 30, justifyContent: "center", marginVertical: Height(.5) }, bgStyle && bgStyle]}
                    colors={[isFocused ? AppConfig.primaryColor : "transparent", isFocused ? 'rgba(55, 141, 176,1)' : "transparent"]}>
                    <Text style={[{ ...mediumTextFont, fontSize: FontSize(16), paddingHorizontal: Width(2), paddingVertical: Height(2), color: "#fff" }, txtStyle && txtStyle]}>{label}
                        {/* {badge ?
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                locations={[1, 0]}
                                style={[{ borderRadius: 150 / 2 }]}
                                colors={[!isFocused ? AppConfig.primaryColor : "white", !isFocused ? 'rgba(240,89,58,1)' : "white"]}>
                                <Text style={[{ color: !isFocused ? "#fff" : theme.text }]}>
                                    2
                                </Text>
                            </LinearGradient>
                            : null} */}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default connect(ReducersProps, null)(Button)