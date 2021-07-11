import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  alert,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import ReducersProps from '../../data/local/reducers/ReducersProps';
import {
  primaryColor,
  textFont,
  textDefault,
  defaultFont,
  mediumTextFont,
  boldTextFont,
  Empty,
  primaryColorLite,
} from '../../utils/Style';
import {FontSize, Height, ScreenWidth, Width} from '../../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';
export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      calls: [
        {
          id: 1,
          name: 'Mark Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        },
      ],
    };
  }
  async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    this.setState({userEmail: parsed.displayName});
  }
  render() {
    let {isCustom, customComponent, title} = this.props;
    return (
      <View>
        {title == 'Welcome' ? (
          <View
            style={{
              width: ScreenWidth,
              // marginBottom: Height(3)
            }}>
            {/* <StatusBar backgroundColor={primaryColor} /> */}
            <View
              style={{
                backgroundColor: primaryColor,
                height: Height(11),
                justifyContent: 'center',
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}>
              <View
                style={{flexDirection: 'row',}}>
                <Image
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar7.png'}}
                  style={{borderRadius: 30, width: 60, height: 60,left:10}}
                />
                  <View style={{}}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: 25,
                    textAlign: 'left',
                    color: '#fff',
                    marginLeft:10,
                    paddingTop: Height(1.5),
                    top: 5,
                  }}>
                  {this.state.userEmail}
                </Text>
              </View>
              </View>
            
            </View>
          </View>
        ) : (
          <View
            style={{
              width: ScreenWidth,
              marginBottom: Height(0),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}>
            <View
              style={{
                backgroundColor: primaryColor,
                borderBottomLeftRadius: Height(5),
                borderBottomRightRadius: Height(5),
                height: Height(10),
                justifyContent: 'center',
              }}>
              {/* <AntDesignIcons name={"back"} color="#fff" size={Width(8)} style={{ marginHorizontal: Width(5), top: Height(-1) }}
                                                                onPress={this.props.actions} /> */}
              {isCustom ? (
                this.props.customComponent
              ) : (
                <Text
                  style={{
                    ...defaultFont,
                    fontSize: FontSize(19),
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  {this.props.title}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

// import React, { Component } from 'react'
// import { Text, View, TouchableOpacity, Platform } from 'react-native'
// import FIcons from 'react-native-vector-icons/Feather'
// import { connect } from 'react-redux'
// import ReducersProps from '../../data/local/reducers/ReducersProps'
// import { textFont } from '../../utils/Style'

// class MyHeader extends Component {
//     render() {
//         let { theme, title, rightAction } = this.props
//         return (
//             <View style={{
//                 flexDirection: "row", alignItems: "center", justifyContent: "center",
//                 height: 50, marginTop: Platform.OS == "ios" ? 20 : 0
//             }}>
//                 <TouchableOpacity style={{ padding: 5, }} onPress={() => {
//                     if (this.props.navigation) {
//                         this.props.navigation.goBack()
//                     }
//                 }}>
//                     <FIcons name={"chevron-left"} size={30} color={theme.iconsBG} />
//                 </TouchableOpacity>
//                 <Text style={{ flex: 1, ...textFont, color: theme.text, fontSize: 16 }}>
//                     {title}
//                 </Text>
//                 {rightAction &&
//                     <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {
//                         if (rightAction.onPress) {
//                             rightAction.onPress()
//                         }
//                     }}>
//                         <Text style={{ ...textFont, color: theme.text, fontWeight: "bold", fontSize: 16 }}>
//                             {rightAction.text}
//                         </Text>
//                     </TouchableOpacity>
//                 }
//             </View>
//         )
//     }
// }

// export default connect(ReducersProps, null)(MyHeader)
