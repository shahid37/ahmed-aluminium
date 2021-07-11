import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import EmojiSelector from "./component";
import ReducersProps from '../../../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
const window = Dimensions.get("window")
class Emojies extends React.Component {
    render() {
        const { change, theme, style } = this.props
        return (
            <View style={{  height: window.height / 2 - 40, backgroundColor: theme.dimBackground, ...style }}>
                <EmojiSelector
                    // showTabs={false}
                    columns={8}
                    theme={theme}
                    // showHistory={true}
                    showSectionTitles={false}
                    // showSearchBar={false}
                    onEmojiSelected={emoji => { change(emoji) }}
                />
            </View>
        )
    }
}
export default connect(ReducersProps, null)(Emojies)