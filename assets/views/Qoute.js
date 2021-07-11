import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  StatusBar,
  Modal,
  Button,
  TouchableHighlight,
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
  secondryColor,
} from '../utils/Style';
import uuid from 'react-native-uuid';
import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import WebHandler from '../data/remote/WebHandler';
import Utils from '../utils/Utils';
import Urls from '../data/remote/Urls';
import * as Progress from 'react-native-progress';
import {acc, color} from 'react-native-reanimated';
import Prefmanager from '../data/local/prefManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Pdf from 'react-native-pdf';

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
      sub: false,
      main: true,
      cusDetail: false,
      accessories: '',
      discount: '',
      grandamount: 0,
      total: 0,
      gt: 0,
      windowprice: 0,
      doorprice: 0,
      gslprice: 0,
      ceilingprice: 0,
      floorprice: 0,
      name: '',
      phone: '',
      address: '',
      windowsState: 0,
      doorsState: 0,
      gsl: 0,
      cDate: '25-03-2021',
      pdfname: 'usman',
      filePath: '',
      id: 0,
      // result: props.route.params ? props.route.params : 0,

      QouteDetail: [
        {id: '1', title: 'Windows ', date: '12-01-2021', info: 'Rs: 1200'},
        {id: '2', title: 'Door ', date: '12-01-2021', info: 'Rs: 1500'},
        {id: '3', title: 'GSL ', date: '12-01-2021', info: 'Rs: 600'},
        {id: '4', title: 'Ceiling ', date: '12-01-2021', info: 'Rs: 200'},
        {id: '5', title: 'Floor ', date: '12-01-2021', info: 'Rs: 700'},
      ],
    };
  }
  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    let fullDatee = date + '-' + month + '-' + year;
    this.setState({cDate: fullDatee});
    //alert(this.state.cDate)
    var ab = uuid.v1();
    // alert(ab)
    this.setState({id: ab});
  }
  async componentWillMount() {
    let windows = await AsyncStorage.getItem('windows');
    let parsed = JSON.parse(windows);
    this.setState({windowsState: parsed});
    let doors = await AsyncStorage.getItem('doors');
    let parsed1 = JSON.parse(doors);
    // alert(JSON.stringify(parsed1))

    this.setState({doorsState: parsed1});
    let gsl = await AsyncStorage.getItem('gsl');
    let parsed2 = JSON.parse(gsl);
    this.setState({gsl: parsed2});
    // alert(this.state.gsl)
    // var qouteFinal = parseFloat(parsed.windows) + parseFloat(parsed1.doors)
    if (this.state.windowsState <= 0) {
      this.setState({windowsState: 0});
    }
    if (this.state.doorsState <= 0) {
      this.setState({doorsState: 0});
    }
    if (this.state.gsl <= 0) {
      this.setState({gsl: 0});
    }
    if (this.state.floorprice <= 0) {
      this.setState({floorprice: 0});
    }
    if (this.state.ceilingprice <= 0) {
      this.setState({ceilingprice: 0});
    }
    var win = this.state.windowsState;
    var door = this.state.doorsState;
    var gsl1 = this.state.gsl;
    var floor = this.state.ceilingprice;
    var ceiling = this.state.floorprice;
    var qouteFinal =
      parseFloat(win) +
      parseFloat(door) +
      parseFloat(gsl1) +
      parseFloat(floor) +
      parseFloat(ceiling);
    var ac = qouteFinal;
    // this.setState({gt : ac})
    this.setState({total: qouteFinal.toFixed(2), gt: qouteFinal.toFixed(2)});
    console.log(parsed.email);
  }

  // async componentWillMount() {
  //     let user = await AsyncStorage.getItem('user');
  //     let parsed = JSON.parse(user);

  //     var qouteFinal = this.state.windowprice + this.state.doorprice + this.state.gslprice + this.state.ceilingprice + this.state.floorprice;
  //     // var ac =  this.state.qouteFinal ;
  //     // this.setState({gt : ac})
  //     this.setState({ total: qouteFinal, gt: qouteFinal })
  //     console.log(parsed.email);
  //     // alert(this.state.result.result)
  //     // if(this.state.result.result>0)
  //     // {
  //     //     this.setState({sub:true, Roomsdetail: true})
  //     // }
  // }
  main() {
    AsyncStorage.removeItem('windows');
    AsyncStorage.removeItem('doors');
    AsyncStorage.removeItem('gsl');
    AsyncStorage.removeItem('@Formdata:key', (error) => {
      if (!error) {
        console.log(' Clear success ');
      }
    });
    AsyncStorage.removeItem('@Formdata1:key', (error) => {
      if (!error) {
        console.log(' Clear success ');
      }
    });
    AsyncStorage.removeItem('@Formdata2:key', (error) => {
      if (!error) {
        console.log(' Clear success ');
      }
    });
    this.props.navigation.navigate('BottomNavigation');
  }

  requestRunTimePermission = () => {
    var that = this;
    async function externalStoragePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.createPDF_File();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        Alert.alert('Write permission err', err);
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      externalStoragePermission();
    } else {
      this.createPDF_File();
    }
  };

  async createPDF_File() {
    var name = 'usman';
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      // html: `<h1 style="text-align: center;"><strong> ${this.state.name}</strong/h1><p style="text-align: center;">In This Tutorial we would learn about creating PDF File using HTML Text.</p><p style="text-align: center;"><strong>ReactNativeCode.com</strong></p>`
      // +`<h1 style="text-align: center;"><strong> ${this.state.name}</strong/h1>`,
      // Setting UP File Name for PDF File.
      html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <title>Invoice</title>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    <style>
                        @media print {
                            @page {
                                size: A3;
                            }
                        }
                        ul {
                            padding: 0;
                            margin: 0 0 1rem 0;
                            list-style: none;
                        }
                        body {
                            font-family: "Inter", sans-serif;
                            margin: 0;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table,
                        table th,
                        table td {
                            border: 1px solid silver;
                        }
                        table th,
                        table td {
                            text-align: center;
                            padding: 8px;
                        }
                        h1,
                        h4,
                        p {
                            margin: 0;
                        }
            
                        .container {
                            padding: 20px 0;
                            width: 1000px;
                            max-width: 90%;
                            margin: 0 auto;
                        }
            
                        .inv-title {
                            padding: 10px;
                            border: 1px solid silver;
                            text-align: center;
                            margin-bottom: 30px;
                        }
            
                        .inv-logo {
                            width: 150px;
                            display: block;
                            margin: 0 auto;
                            margin-bottom: 40px;
                        }
            
                        /* header */
                        .inv-header {
                            display: flex;
                            margin-bottom: 20px;
                        }
                        .inv-header > :nth-child(1) {
                            flex: 2;
                        }
                        .inv-header > :nth-child(2) {
                            flex: 1;
                        }
                        .inv-header h2 {
                            font-size: 20px;
                            margin: 0 0 0.3rem 0;
                        }
                        .inv-header ul li {
                            font-size: 15px;
                            padding: 3px 0;
                        }
            
                        /* body */
                        .inv-body table th,
                        .inv-body table td {
                            text-align: left;
                        }
                        .inv-body {
                            margin-bottom: 34px;
                            margin-top: 10px;
                        }
            
                        /* footer */
                        .inv-footer {
                            display: flex;
                            flex-direction: row;
                        }
                        .inv-footer > :nth-child(1) {
                            flex: 2;
                        }
                        .inv-footer > :nth-child(2) {
                            flex: 1;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="inv-title">
                            <h1>Invoice # ${this.state.phone}</h1>
                        </div>
                        <img src="./ZAF.jpg" class="inv-logo" />
                        <div class="inv-header">
                            <div>
                                <h2>Ahmed Aluminium Steel Glass</h2>
                                <ul>
                                    <li>84-F, PIA Housing Society,</li>
                                    <li>Ahmad Market, Ghaffar Chowk,Lahore</li>
                                    <li>+923008334988 | infoahmadglass@gmail.com</li>
                                </ul>
                                
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <th>Issue Date</th>
                                        <td>${this.state.cDate}</td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Total</th>
                                        <td>${this.state.total}</td>
                                    </tr>
                                </table>
                            </div>
                            
                        </div>
                        <div>
                        <table>
                                    <tr>
                                        <th>Customer Name</th>
                                        <td>${this.state.name}</td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Customer Phone</th>
                                        <td>${this.state.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Customer Email</th>
                                        <td>${this.state.address}</td>
                                    </tr>
                                </table>
                        </div>
                        <div class="inv-body">
                            <table>
                                <thead>
                                    <th>Product</th>
                                    
                                    <th>Price</th>
                                </thead>
                                <tbody>
                                   ${
                                     this.state.windowsState > 0 &&
                                     `<tr>
                                    <td>
                                    <h4>Windows</h4>
                                  
                                    </td>
                                    <td>${this.state.windowsState}</td>
                                    </tr>`
                                   }
                                    ${
                                      this.state.doorsState > 0 &&
                                      `<tr>
                                        <td>
                                        <h4>Doors</h4>
                                       
                                        </td>
                                        <td>${this.state.doorsState}</td>
                                        </tr>`
                                    }
                                        ${
                                          this.state.gsl > 0 &&
                                          `<tr>
                                            <td>
                                            <h4>GSL</h4>
                                           
                                            </td>
                                            <td>${this.state.gsl}</td>
                                            </tr>`
                                        }  
                                            ${
                                              this.state.ceilingprice > 0 &&
                                              `<tr>
                                                <td>
                                                <h4>Ceiling</h4>
                                              
                                                </td>
                                                <td>${this.state.ceilingprice}</td>
                                                </tr>`
                                            }  
                                                ${
                                                  this.state.floorprice > 0 &&
                                                  `<tr>
                                                    <td>
                                                    <h4>Floor</h4>
                                                  
                                                    </td>
                                                    <td>${this.state.floorprice}</td>
                                                    </tr>`
                                                }
                                                    ${
                                                      this.state.grandamount >
                                                        0 &&
                                                      `<tr>
                                                        <td>
                                                        <h4>Accessories</h4>
                                                       
                                                        </td>
                                                        <td>${this.state.grandamount}</td>
                                                        </tr>`
                                                    }

                                   
                                </tbody>
                            </table>
                        </div>
                        <div class="inv-footer">
                            <div><!-- required --></div>
                            <div>
                                <table>
                                    <tr>
                                        <th>Sub total</th>
                                        <td>${this.state.total}</td>
                                    </tr>
                                    <tr>
                                        <th>Discount</th>
                                        <td>${this.state.discount}</td>
                                    </tr>
                                    <tr>
                                        <th>Grand total</th>
                                        <td>${this.state.gt}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </body>
            </html>`,
      fileName: this.state.phone + ' ' + this.state.id,

      //File directory in which the PDF File Will Store.
      directory: 'docs',
    };

    let file = await RNHTMLtoPDF.convert(options);

    console.log(file.filePath);

    Alert.alert(file.filePath);

    this.setState({filePath: file.filePath});
    this.main();
  }
  // generateFunc()
  // {
  //     this.setState({ cusDetail: true, main: true, sub: false })
  //     AsyncStorage.setItem('name',JSON.stringify(this.state.name));
  // }

  list = () => {
    return (
      <View>
        <View style={{}}>
          {/* <FlatList
                        data={this.state.QouteDetail}
                        keyExtractor={(item) => item.id}
                        numColumns={1}

                        showsVerticalScrollIndicator={false}
                        // onEndReached={() => { this.handleOnLoadMore() }}
                        renderItem={({ item, index }) => {
                            return <View style={{
                                marginVertical: Height(1)
                            }}
                            > */}

          {this.state.windowsState > 0 && (
            <View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 13,
                    marginHorizontal: Width(3),
                  }}>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    1
                  </Text>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    Windows
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: Height(-2.5),
                  left: -15,
                  marginHorizontal: Width(2),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: secondryColor,
                    fontSize: 17,
                    marginLeft: Width(2),
                  }}>
                  RS: {this.state.windowsState}
                </Text>
              </View>
              <View style={styles.borderline}></View>
            </View>
          )}
          {this.state.doorsState > 0 && (
            <View style={{marginTop: Height(1.5)}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 13,
                    marginHorizontal: Width(3),
                  }}>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    2
                  </Text>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    Doors
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: Height(-2.5),
                  left: -15,
                  marginHorizontal: Width(2),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: secondryColor,
                    fontSize: 17,
                    marginLeft: Width(2),
                  }}>
                  RS: {this.state.doorsState}
                </Text>
              </View>
              <View style={styles.borderline}></View>
            </View>
          )}
          {this.state.gsl > 0 && (
            <View style={{marginTop: Height(1.5)}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 13,
                    marginHorizontal: Width(3),
                  }}>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    3
                  </Text>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    GSL
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: Height(-2.5),
                  left: -15,
                  marginHorizontal: Width(2),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: secondryColor,
                    fontSize: 17,
                    marginLeft: Width(2),
                  }}>
                  RS: {this.state.gsl}
                </Text>
              </View>
              <View style={styles.borderline}></View>
            </View>
          )}
          {this.state.floorprice > 0 && (
            <View style={{marginTop: Height(1.5)}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 13,
                    marginHorizontal: Width(3),
                  }}>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    4
                  </Text>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    Floor
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: Height(-2.5),
                  left: -15,
                  marginHorizontal: Width(2),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: secondryColor,
                    fontSize: 17,
                    marginLeft: Width(2),
                  }}>
                  RS: {this.state.floorprice}
                </Text>
              </View>
              <View style={styles.borderline}></View>
            </View>
          )}

          {this.state.ceilingprice > 0 && (
            <View style={{marginTop: Height(1.5)}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 13,
                    marginHorizontal: Width(3),
                  }}>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    5
                  </Text>
                  <Text
                    style={{
                      ...mediumTextFont,
                      color: secondryColor,
                      fontSize: 17,
                      marginLeft: Width(2),
                    }}>
                    Ceiling
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: Height(-2.5),
                  left: -15,
                  marginHorizontal: Width(2),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: secondryColor,
                    fontSize: 17,
                    marginLeft: Width(2),
                  }}>
                  RS: {this.state.ceilingprice}
                </Text>
              </View>
              <View style={styles.borderline}></View>
            </View>
          )}
        </View>
        {this.state.cusDetail && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                left: 20,
                marginTop: Height(2),
              }}>
              <Text
                style={{
                  ...mediumTextFont,
                  color: secondryColor,
                  fontSize: 17,
                  marginLeft: Width(-6),
                }}>
                Grand Total{' '}
              </Text>
              <View
                style={{
                  backgroundColor: primaryColorLite,
                  borderRadius: 100,
                  width: Width(40),
                  left: -20,
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    color: primaryColor,
                    textAlign: 'center',
                    fontSize: 17,
                    top: 2,
                  }}>
                  Pkr: {this.state.gt}
                </Text>
              </View>
            </View>
            <View style={{alignSelf: 'center', marginTop: Height(3)}}>
              <TouchableOpacity
                onPress={this.requestRunTimePermission}
                style={{
                  backgroundColor: primaryColor,
                  width: Width(70),
                  height: Height(6),
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...textFont,
                    fontSize: 16,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Download as PDF
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };
  generate() {
    if (this.state.phone != '' && this.state.address != '') {
      this.setState({cusDetail: true, main: true, sub: false});
    } else {
      alert('Enter your details...');
    }
  }
  Discount = () => {
    var discount = (this.state.total / 100) * this.state.discount;
    var dis = discount.toFixed(2);
    //var discounted = this.state.total - discount;
    var ac =
      parseFloat(this.state.total) + parseFloat(this.state.grandamount) - dis;
    var acc = ac.toFixed(2);
    // alert(this.state.total + this.state.grandamount)
    this.setState({discount: dis, gt: acc});
  };
  accessories = () => {
    // var tot = parseFloat(this.state.total);
    var acc = parseFloat(this.state.accessories);
    var accessories = acc;
    var ab = acc + parseFloat(this.state.total);
    this.setState({grandamount: accessories, gt: ab.toFixed(2)});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor={primaryColor} />
        <MyHeader
          title={'Your Bill'}
          navigation={this.props.navigation}
          actions={this.arrowBack}
        />
        <ScrollView>
          {/* <TouchableOpacity onPress={this.createPDF}>
                        <Text>Create PDF</Text>
                    </TouchableOpacity> */}

          {this.state.main && (
            <View>
              <View
                style={{
                  marginVertical: Height(2),
                  marginHorizontal: Width(1.4),
                }}>
                <Text
                  style={{
                    ...mediumTextFont,
                    fontSize: FontSize(20),
                    textAlign: 'center',
                    color: 'black',
                    paddingHorizontal: Width(2.5),
                  }}>
                  Qoute
                </Text>
              </View>
              {this.state.cusDetail && (
                <View>
                  <View>
                    <View style={{marginHorizontal: Width(1.4)}}>
                      <Text
                        style={{
                          ...defaultFont,
                          fontSize: FontSize(18),
                          borderLeftWidth: Width(1),
                          borderLeftColor: primaryColor,
                          marginHorizontal: Width(2),
                          color: 'black',
                          paddingHorizontal: Width(2.5),
                        }}>
                        Customer Details
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          top: 13,
                          marginHorizontal: Width(3),
                        }}>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            marginLeft: Width(4),
                          }}>
                          Name
                        </Text>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            left: -20,
                          }}>
                          {this.state.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          top: 13,
                          marginHorizontal: Width(3),
                        }}>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            marginLeft: Width(4),
                          }}>
                          Phone: #
                        </Text>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            left: -20,
                          }}>
                          {this.state.phone}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          top: 13,
                          marginHorizontal: Width(3),
                        }}>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            marginLeft: Width(4),
                          }}>
                          Address
                        </Text>
                        <Text
                          style={{
                            ...textFont,
                            color: secondryColor,
                            fontSize: 16,
                            left: -20,
                          }}>
                          {this.state.address}
                        </Text>
                      </View>
                      {/* <View style={{ flexDirection: "row",justifyContent:"space-between", top: 13, marginHorizontal: Width(3) }}>
                                        <Text style={{ ...textFont, color: secondryColor, fontSize: 16, marginLeft: Width(4) }}>Email</Text>
                                        <Text style={{ ...textFont, color: secondryColor, fontSize: 16,left:-20}}>usman852ansari@gmail.com</Text>
                                    </View> */}
                    </View>
                  </View>
                </View>
              )}
              <View style={{marginTop: Height(2)}}>{this.list()}</View>
              {!this.state.cusDetail && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginHorizontal: Width(3),
                      marginTop: Height(3),
                    }}>
                    <Text
                      style={{
                        ...mediumTextFont,
                        color: secondryColor,
                        fontSize: 17,
                        marginLeft: Width(2),
                      }}>
                      Total{' '}
                    </Text>
                    <View
                      style={{
                        backgroundColor: primaryColorLite,
                        borderRadius: 100,
                        width: Width(40),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          color: primaryColor,
                          textAlign: 'center',
                          fontSize: 17,
                          top: 2,
                        }}>
                        Pkr: {this.state.total}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.borderline2}></View>
                  <View
                    style={{
                      marginVertical: Height(5),
                      marginHorizontal: Width(1.4),
                    }}>
                    <Text
                      style={{
                        ...defaultFont,
                        fontSize: FontSize(18),
                        borderLeftWidth: Width(1),
                        borderLeftColor: primaryColor,
                        marginHorizontal: Width(2),
                        color: 'black',
                        paddingHorizontal: Width(2.5),
                      }}>
                      Add accessories amount
                    </Text>
                  </View>
                  <View style={{left: 9, marginTop: Height(-4)}}>
                    <View style={{}}>
                      <View style={styles.txtInputView}>
                        <TextInput
                          style={styles.txtInputStyle}
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="add amount"
                          //onSubmitEditing={() => { this.password.focus(); }}
                          returnKeyType="next"
                          keyboardType="numeric"
                          // value={this.state.email}
                          // onChangeText={(text) => this.setState({ email: text })}
                          value={this.state.accessories}
                          onChangeText={(text) =>
                            this.setState({accessories: text})
                          }
                          placeholderTextColor="#979797"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        left: -33,
                        top: -50,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.accessories();
                        }}
                        style={{
                          backgroundColor: primaryColor,
                          width: Width(30),
                          height: Height(7),
                        }}>
                        <Text
                          style={{
                            ...mediumTextFont,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 17,
                            top: 12,
                          }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginHorizontal: Width(3),
                        marginTop: Height(-3),
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          color: secondryColor,
                          fontSize: 17,
                          marginLeft: Width(-6),
                        }}>
                        Accessories Price{' '}
                      </Text>
                      <View
                        style={{
                          backgroundColor: primaryColorLite,
                          borderRadius: 100,
                          width: Width(40),
                          left: -20,
                        }}>
                        <Text
                          style={{
                            ...mediumTextFont,
                            color: primaryColor,
                            textAlign: 'center',
                            fontSize: 17,
                            top: 2,
                          }}>
                          Pkr: {this.state.grandamount}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.borderline2}></View>
                  <View
                    style={{
                      marginVertical: Height(5),
                      marginHorizontal: Width(1.4),
                    }}>
                    <Text
                      style={{
                        ...defaultFont,
                        fontSize: FontSize(18),
                        borderLeftWidth: Width(1),
                        borderLeftColor: primaryColor,
                        marginHorizontal: Width(2),
                        color: 'black',
                        paddingHorizontal: Width(2.5),
                      }}>
                      Discount
                    </Text>
                  </View>
                  <View style={{left: 9, marginTop: Height(-4)}}>
                    <View style={{}}>
                      <View style={styles.txtInputView}>
                        <TextInput
                          style={styles.txtInputStyle}
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="add in %"
                          //onSubmitEditing={() => { this.password.focus(); }}
                          returnKeyType="next"
                          keyboardType="numeric"
                          // value={this.state.email}
                          // onChangeText={(text) => this.setState({ email: text })}
                          value={this.state.discount}
                          onChangeText={(text) =>
                            this.setState({discount: text})
                          }
                          placeholderTextColor="#979797"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        left: -33,
                        top: -50,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.Discount();
                        }}
                        style={{
                          backgroundColor: primaryColor,
                          width: Width(30),
                          height: Height(7),
                        }}>
                        <Text
                          style={{
                            ...mediumTextFont,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 17,
                            top: 12,
                          }}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginHorizontal: Width(3),
                        marginTop: Height(-4),
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          ...mediumTextFont,
                          color: secondryColor,
                          fontSize: 17,
                          marginLeft: Width(-6),
                        }}>
                        Discounted Price{' '}
                      </Text>
                      <View
                        style={{
                          backgroundColor: primaryColorLite,
                          borderRadius: 100,
                          width: Width(40),
                          left: -20,
                        }}>
                        <Text
                          style={{
                            ...mediumTextFont,
                            color: primaryColor,
                            textAlign: 'center',
                            fontSize: 17,
                            top: 2,
                          }}>
                          Pkr: {this.state.discount}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.borderline}></View>
                    <View
                      style={{
                        marginVertical: Height(1),
                        marginHorizontal: Width(1.4),
                      }}>
                      <Text
                        style={{
                          ...defaultFont,
                          fontSize: FontSize(18),
                          borderLeftWidth: Width(1),
                          borderLeftColor: primaryColor,
                          marginHorizontal: Width(2),
                          color: 'black',
                          paddingHorizontal: Width(2.5),
                        }}>
                        Grand Total
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginHorizontal: Width(3),
                        paddingVertical: 10,
                      }}>
                      <View
                        style={{
                          backgroundColor: primaryColorLite,
                          borderRadius: 100,
                          width: Width(50),
                          left: -20,
                        }}>
                        <Text
                          style={{
                            ...mediumTextFont,
                            color: primaryColor,
                            textAlign: 'center',
                            fontSize: 17,
                            top: 2,
                          }}>
                          Pkr: {this.state.gt}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{alignSelf: 'center', paddingVertical: Height(1)}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({sub: true, main: false});
                      }}
                      style={{
                        backgroundColor: primaryColor,
                        width: Width(70),
                        height: Height(6),
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...textFont,
                          fontSize: 15,
                          color: '#fff',
                          textAlign: 'center',
                        }}>
                        Get Qoute
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {this.state.sub && (
            <View>
              <View
                style={{
                  marginVertical: Height(5),
                  marginHorizontal: Width(1.4),
                }}>
                <Text
                  style={{
                    ...defaultFont,
                    fontSize: FontSize(18),
                    borderLeftWidth: Width(1),
                    borderLeftColor: primaryColor,
                    marginHorizontal: Width(2),
                    color: 'black',
                    paddingHorizontal: Width(2.5),
                  }}>
                  Customer Details
                </Text>
              </View>
              <View>
                <View style={styles.txtInputView2}>
                  <TextInput
                    style={styles.txtInputStyle2}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Your Name"
                    //onSubmitEditing={() => { this.password.focus(); }}
                    returnKeyType="next"
                    // keyboardType="numeric"
                    // value={this.state.email}
                    // onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text})}
                    placeholderTextColor="#979797"
                  />
                </View>
                <View style={styles.txtInputView2}>
                  <TextInput
                    style={styles.txtInputStyle2}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Your Phone Number"
                    //onSubmitEditing={() => { this.password.focus(); }}
                    returnKeyType="next"
                    keyboardType="numeric"
                    // value={this.state.email}
                    // onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.phone}
                    onChangeText={(text) => this.setState({phone: text})}
                    placeholderTextColor="#979797"
                  />
                </View>
                {/* <View style={styles.txtInputView2}>
                                    <TextInput
                                        style={styles.txtInputStyle2}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholder="Your Email"
                                        //onSubmitEditing={() => { this.password.focus(); }}
                                        returnKeyType="next"
                                        keyboardType="numeric"
                                        // value={this.state.email}
                                        // onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.accessories}
                                        onChangeText={(text) => this.setState({ accessories: text })}
                                        placeholderTextColor='#979797' />
                                </View> */}
                <View style={styles.txtInputView2}>
                  <TextInput
                    style={styles.txtInputStyle2}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Your Address"
                    //onSubmitEditing={() => { this.password.focus(); }}
                    returnKeyType="next"
                    // keyboardType="numeric"
                    // value={this.state.email}
                    // onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.address}
                    onChangeText={(text) => this.setState({address: text})}
                    placeholderTextColor="#979797"
                  />
                </View>
              </View>
              <View style={{alignSelf: 'center', marginTop: Height(10)}}>
                <TouchableOpacity
                  onPress={() => {
                    this.generate();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    width: Width(70),
                    height: Height(6),
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      ...textFont,
                      fontSize: 16,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Generate Qoute
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  borderline: {
    margin: 0,
    flexDirection: 'row',
    borderColor: primaryColor,
    backgroundColor: '#fff',
    borderBottomWidth: 0.2,
    marginRight: 25,
    marginLeft: 18,
  },
  borderline2: {
    margin: 0,
    flexDirection: 'row',
    borderColor: primaryColor,
    backgroundColor: '#fff',
    borderBottomWidth: 0.2,

    top: 20,
  },
  txtInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 0.4,
    marginHorizontal: Width(21),
    left: -65,
    marginTop: Height(2),
  },

  // txtInputIcon: { position: 'relative', paddingRight: 10, right: -4 },
  txtInputStyle: {
    flex: 1,
    ...textFont,
    left: 10,
    //  backgroundColor:"#000",
    //  marginTop:0
    //  height: Height(5)
  },
  txtInputView2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 0.4,
    marginHorizontal: Width(5),
    left: -5,
    marginTop: Height(2),
    backgroundColor: '#c6c6c6',
  },

  // txtInputIcon: { position: 'relative', paddingRight: 10, right: -4 },
  txtInputStyle2: {
    flex: 1,
    ...textFont,
    left: 10,
    //  backgroundColor:"#000",
    //  marginTop:0
    //  height: Height(5)
  },
  button: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#00E676',
    borderRadius: 9,
  },

  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 21,
  },
});
export default connect(ReducersProps, null)(ChallengeDetail);
