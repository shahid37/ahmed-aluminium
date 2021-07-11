import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Empty, textDefault } from '../../utils/Style';

import ReducersProps from '../../data/local/reducers/ReducersProps'
import { connect } from "react-redux"

class Home extends React.Component {
    render() {
        const { language, theme } = this.props
        return (
            <View style={{ paddingTop: 20, flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: theme.dimBackground, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>
            </View>
        )
    }
}
export default connect(ReducersProps, null)(Home)