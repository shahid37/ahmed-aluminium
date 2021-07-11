import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MyHeader from './reuseable/MyHeader';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-option-menu';

import {
  FontSize,
  Height,
  Width,
  ScreenWidth,
  ScreenHeight,
} from '../utils/Dimensions';
import {
  boldTextFont,
  Empty,
  fontColor,
  mediumTextFont,
  primaryColor,
  errorColor,
  textDefault,
  defaultFont,
  textFont,
  primaryColorLite,
} from '../utils/Style';

import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import WebHandler from '../data/remote/WebHandler';
import Utils from '../utils/Utils';
import Urls from '../data/remote/Urls';
import * as Progress from 'react-native-progress';
import {color} from 'react-native-reanimated';
import Prefmanager from '../data/local/prefManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyUtils = new Utils();
const webHandler = new WebHandler();
const prefs = new Prefmanager();

class ChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thickness: '',
      material: '',
      usman: 10,
      val: '',
      //result: props.route.params ? props.route.params : 0,
      Roomcounter: 0,
      Loungecounter: 0,
      Bathcounter: 0,
      Diningcounter: 0,
      Kitchencounter: 0,
      Otherscounter: 0,
      sub: false,
      Roomsdetail: false,
      Loungedetail: false,
      Bathdetail: false,
      Diningdetail: false,
      Kitchendetail: false,
      Othersdetail: false,
      windowsState: 0,
      doorsState: 0,
      gsl: 0,
      hidePassword: true,
      hidePassword1: true,
      hidePassword2: true,
      hidePassword3: true,
      hidePassword4: true,
      hidePassword5: true,
    };
  }
  togglePwdVisibility() {
    this.setState({
      Roomsdetail: !this.state.Roomsdetail,
      hidePassword: !this.state.hidePassword,
    });
  }
  togglePwdVisibility1() {
    this.setState({
      Loungedetail: !this.state.Loungedetail,
      hidePassword1: !this.state.hidePassword1,
    });
  }
  togglePwdVisibility2() {
    this.setState({
      Bathdetail: !this.state.Bathdetail,
      hidePassword2: !this.state.hidePassword2,
    });
  }
  togglePwdVisibility3() {
    this.setState({
      Diningdetail: !this.state.Diningdetail,
      hidePassword3: !this.state.hidePassword3,
    });
  }
  togglePwdVisibility4() {
    this.setState({
      Kitchendetail: !this.state.Kitchendetail,
      hidePassword4: !this.state.hidePassword4,
    });
  }
  togglePwdVisibility5() {
    this.setState({
      Othersdetail: !this.state.Othersdetail,
      hidePassword5: !this.state.hidePassword5,
    });
  }
  // async componentWillMount() {
  //         let windows = await AsyncStorage.getItem('windows');
  //         let parsed = JSON.parse(windows);
  //         this.setState({windowsState : parsed.windows})
  //         let doors = await AsyncStorage.getItem('doors');
  //         let parsed1 = JSON.parse(doors);
  //         this.setState({doorsState : parsed1.doors})
  //         let gsl = await AsyncStorage.getItem('gsl');
  //         let parsed2 = JSON.parse(gsl);
  //         this.setState({gsl : parsed2.gsl})

  // alert(this.state.windowsState)
  // if(this.state.result.result>0)
  // {
  //     this.setState({sub:true, Roomsdetail: true})
  // }
  //}
  // signOut = () => {

  //        AsyncStorage.removeItem('windows');
  //        AsyncStorage.removeItem('doors');
  //        AsyncStorage.removeItem('gsl');

  //   }
  updateThickness = (thickness) => {
    this.setState({thickness: thickness});
  };
  updateMaterial = (material) => {
    this.setState({material: material});
  };
  Roomincrement() {
    this.setState({Roomcounter: this.state.Roomcounter + 1});
  }
  Roomdecrement() {
    if (this.state.Roomcounter > 0) {
      this.setState((prevState) => ({Roomcounter: prevState.Roomcounter - 1}));
    }
  }
  Loungeincrement() {
    this.setState({Loungecounter: this.state.Loungecounter + 1});
  }
  Loungedecrement() {
    if (this.state.Loungecounter > 0) {
      this.setState((prevState) => ({
        Loungecounter: prevState.Loungecounter - 1,
      }));
    }
  }
  Bathincrement() {
    this.setState({Bathcounter: this.state.Bathcounter + 1});
  }
  Bathdecrement() {
    if (this.state.Bathcounter > 0) {
      this.setState((prevState) => ({Bathcounter: prevState.Bathcounter - 1}));
    }
  }
  Diningincrement() {
    this.setState({Diningcounter: this.state.Diningcounter + 1});
  }
  Diningdecrement() {
    if (this.state.Diningcounter > 0) {
      this.setState((prevState) => ({
        Diningcounter: prevState.Diningcounter - 1,
      }));
    }
  }
  Kitincrement() {
    this.setState({Kitchencounter: this.state.Kitchencounter + 1});
  }
  Kitdecrement() {
    if (this.state.Kitchencounter > 0) {
      this.setState((prevState) => ({
        Kitchencounter: prevState.Kitchencounter - 1,
      }));
    }
  }
  Othersincrement() {
    this.setState({Otherscounter: this.state.Otherscounter + 1});
  }
  Othersdecrement() {
    if (this.state.Otherscounter > 0) {
      this.setState((prevState) => ({
        Otherscounter: prevState.Otherscounter - 1,
      }));
    }
  }
  proceed() {
    this.setState({sub: true});
    //this.props.navigation.navigate('Qoute')
  }
  Qcall() {
    AsyncStorage.removeItem('windows');
    AsyncStorage.removeItem('doors');
    AsyncStorage.removeItem('gsl');
  }
  qoute() {
    this.props.navigation.navigate('Qoute');
  }

  render() {
    let data = [
      {
        value: 'Banana',
      },
      {
        value: 'Mango',
      },
      {
        value: 'Pear',
      },
    ];

    // const { navigation } = this.props;
    // const result = navigation.getParam('result', 'NO-User');
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor={primaryColor} />
        <MyHeader
          title={'Get Qoute'}
          navigation={this.props.navigation}
          actions={this.arrowBack}
        />
        <ScrollView>
          {/*===========================================================main front */}
          {/* {!this.state.sub &&
                        <View>
                            <View style={{ marginTop: Height(4), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Rooms</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Roomincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Roomdecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Roomcounter}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: Height(-2), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Lounge</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Loungeincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Loungedecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Loungecounter}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: Height(-2), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Bath</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Bathincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Bathdecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Bathcounter}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: Height(-2), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Dining</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Diningincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Diningdecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Diningcounter}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: Height(-2), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Kitchen</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Kitincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Kitdecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Kitchencounter}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: Height(-2), marginHorizontal: Width(10) }}>
                                <View>
                                    <Text style={{ ...mediumTextFont, fontSize: 18, top: 10 }}>Others</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginHorizontal: Width(8), padding: Width(2), justifyContent: "flex-end", top: -27 }}>
                                    <TouchableOpacity onPress={() => { this.Othersincrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.Othersdecrement() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), left: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 25 }}>
                                        <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.Otherscounter}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignSelf: "center",paddingVertical:Height(1) }}>
                        <TouchableOpacity onPress={() => { this.proceed() }} style={{ backgroundColor: primaryColor, width: Width(49), height: Height(5), borderRadius: 5, justifyContent: "center", }}>
                            <Text style={{ ...textFont, fontSize: 13, color: "#fff", textAlign: "center" }}>Proceed Next</Text>
                        </TouchableOpacity>
                    </View>
                        </View>
                    } */}

          {/*===========================================================SUB front */}
          {/* {!this.state.sub && */}
          <View>
            <View style={{marginTop: Height(4), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Rooms
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Roomdecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Roomcounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Roomincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Roomsdetail && (
                <View style={{paddingVertical: Height(2), top: -10}}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Windows');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Windows
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Doors');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Doors
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('GSL');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        GSL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Floor
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Ceiling
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View style={{marginTop: Height(-2), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility1()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword1 ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Lounge
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Loungedecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Loungecounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Loungeincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ top: -20 }}>
                                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => this.togglePwdVisibility1()}>
                                    <AntDesignIcons name={this.state.hidePassword1 ? "caretleft" : "caretdown"} color={primaryColor} size={Width(5)} style={{ left: -10 }} />
                                </TouchableOpacity>
                            </View> */}
            </View>
            {this.state.Loungedetail && (
              <View style={{paddingVertical: Height(2), top: -10}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Windows');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Windows
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Doors');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Doors
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('GSL');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      GSL
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Floor
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Ceiling
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={{marginTop: Height(-2), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility2()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword2 ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Bath
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Bathdecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Bathcounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Bathincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.Bathdetail && (
              <View style={{paddingVertical: Height(2), top: -10}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Windows');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Windows
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Doors');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Doors
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('GSL');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      GSL
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Floor
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Ceiling
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={{marginTop: Height(-2), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility3()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword3 ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Dining
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Diningdecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Diningcounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Diningincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ top: -20 }}>
                                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => this.togglePwdVisibility3()}>
                                    <AntDesignIcons name={this.state.hidePassword3 ? "caretleft" : "caretdown"} color={primaryColor} size={Width(5)} style={{ left: -10 }} />
                                </TouchableOpacity>
                            </View> */}
            </View>
            {this.state.Diningdetail && (
              <View style={{paddingVertical: Height(2), top: -10}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Windows');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Windows
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Doors');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Doors
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('GSL');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      GSL
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Floor
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Ceiling
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={{marginTop: Height(-2), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility4()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword4 ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Kitchen
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Kitdecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Kitchencounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Kitincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.Kitchendetail && (
              <View style={{paddingVertical: Height(2), top: -10}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Windows');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Windows
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Doors');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Doors
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('GSL');
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      GSL
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Floor
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      backgroundColor: primaryColor,
                      padding: Width(2),
                      marginHorizontal: Width(20),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      Ceiling
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={{marginTop: Height(-2), marginHorizontal: Width(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{top: 12}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => this.togglePwdVisibility5()}>
                    <AntDesignIcons
                      name={
                        this.state.hidePassword5 ? 'caretright' : 'caretdown'
                      }
                      color={primaryColor}
                      size={Width(5)}
                      style={{left: -10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{...mediumTextFont, fontSize: 18, top: 10}}>
                    Others
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: Width(8),
                  padding: Width(2),
                  justifyContent: 'flex-end',
                  top: -27,
                }}>
                {/* <TouchableOpacity onPress={() => { this.increment() }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10) }}>
                                        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                    </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    this.Othersdecrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    height: Height(5),
                    left: 18,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 15,
                      textAlign: 'center',
                      top: 5,
                    }}>
                    {this.state.Otherscounter}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.Othersincrement();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    width: Width(10),
                    left: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 25,
                      textAlign: 'center',
                      top: -2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Othersdetail && (
                <View style={{paddingVertical: Height(2), top: -10}}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Windows');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Windows
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Doors');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Doors
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('GSL');
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        GSL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Floor
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: primaryColor,
                        padding: Width(2),
                        marginHorizontal: Width(10),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        Ceiling
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{alignSelf: 'center', paddingVertical: Height(1)}}>
                <TouchableOpacity
                  onPress={() => {
                    this.Qcall();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    width: Width(38),
                    height: Height(5),
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      ...textFont,
                      fontSize: 13,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Reset All Calculation
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center', paddingVertical: Height(1)}}>
                <TouchableOpacity
                  onPress={() => {
                    this.qoute();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    width: Width(38),
                    height: Height(5),
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      ...textFont,
                      fontSize: 13,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Go For Qoutation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
});
export default connect(ReducersProps, null)(ChallengeDetail);
