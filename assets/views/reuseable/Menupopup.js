import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Feather"
import ReducersProps from '../../data/local/reducers/ReducersProps'
import { mediumTextFont } from '../../utils/Style'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
class Menupopup extends Component {
    render() {
        let { triggerIcon, Menuoptions, triggerClick, theme, Optionstyle, Containerstyle, iconSize, triggerStyle } = this.props
        return (
            <Menu
                // renderer={renderers.Popover}
                rendererProps={{
                    anchorStyle: {
                        backgroundColor: theme.dimBackground,
                    }
                }}>
                <MenuTrigger style={{ padding: 20, paddingLeft: 5, ...triggerStyle }}>
                    <Icon name={triggerIcon ? triggerIcon : "more-vertical"} size={iconSize ? iconSize : 25} color={theme.dimText} />
                </MenuTrigger>
                <MenuOptions customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.dimBackground,
                        borderRadius: 10,
                        padding: 10,
                        ...Containerstyle
                    }
                }}>
                    {Menuoptions.map((item, index) => {
                        return (
                            <MenuOption style={{ justifyContent: "center", paddingVertical: 5, paddingHorizontal:7 }} onSelect={() => { triggerClick(item.value ? item.value : item.name) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>{item.icon ? <Icon name={item.icon} size={iconSize ? iconSize : 20} color={theme.dimText} /> : null}<Text style={[mediumTextFont, { fontSize: 16, color: theme.text, marginLeft: 15, ...Optionstyle }]}> {item.name}</Text></View>
                            </MenuOption>
                        )
                    })}
                </MenuOptions>
            </Menu>
        )
    }
}

export default connect(ReducersProps, null)(Menupopup)