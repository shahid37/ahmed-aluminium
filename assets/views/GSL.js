import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
// import Challenge from './Challenge'
// import Inbox from './Inbox'
import MyHeader from './reuseable/MyHeader';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  defaultFont,
  mediumTextFont,
  primaryColor,
  errorColor,
  textDefault,
  textFont,
  secondryColor,
} from '../utils/Style';
import TabBar, {iconTypes} from 'react-native-fluidbottomnavigation';
import ReducersProps from '../data/local/reducers/ReducersProps';
import {connect} from 'react-redux';
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WebHandler from '../data/remote/WebHandler';
import Urls from '../data/remote/Urls';
import MyUtils from '../utils/Utils';
import Prefmanager from '../data/local/prefManager';
import Video from 'react-native-video';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, setData} from '../views/Utills';
const webHandler = new WebHandler();
const myUtils = new MyUtils();
const prefs = new Prefmanager();
const CHALLENGE_LIMIT = 20;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      challengeDetail: [],
      pageNo: 1,
      totalPages: 1,
      val: 1,
      sliding: false,
      double: false,
      fixed: true,
      curTab: 1,
      usman: 10,
      //finalThickness :'',
      //finalMaterial :'',
      finalWidth: '',
      finalHeight: '',
      choosenIndex: 0,
      widthStore: 0,
      heightStore: 0,

      ///=========================================>
      data: {
        name: 0,
        name2: 0,
        finalThickness: '',
        finalMaterial: '',
        singleResult: 0,
      },
      //saveIndex:props.route.params ? props.route.params : -1,
      saveIndexx: -1,
      ///=========================================>

      thickness103: '',
      material103: '',
      width103: 0,
      height103: 0,
      counter103: 0,
      res103: 0,

      materialStd5: '',
      thicknessStd5: '',
      materialStd4: '',
      thicknessStd4: '',
      thicknessStd3: '',
      materialStd3: '',
      gsl4: 0,
    };
  }
  /////=========================> Sliding

  handleWidth103 = (text) => {
    this.setState({width103: text});
  };
  handleHeight103 = (text) => {
    this.setState({height103: text});
  };

  componentDidMount = async () => {
    // alert(saveIndex)

    const {data} = this.state;
    //var saveIndex = this.props.navigation.getParam("saveIndex",-1)

    this.props.navigation.addListener('focus', async (playload) => {
      //var saveIndexx = this.props.route.params.saveIndex ? this.props.route.params.saveIndex : -1;
      // alert(saveIndexx)
      //this.setState({saveIndex:saveIndexx})
      var saveIndexx = this.props.route.params.saveIndex;
      //    if(ab)
      //    {
      //        var cc= ab.saveIndex
      //        alert(cc)
      //    }
      //var saveIndex = this.props.navigation.getParam("saveIndex",-1)
      //var saveIndex = props.route.params.saveIndex ? props.route.params.saveIndex : -1;
      //var saveIndexx = this.props.navigation.getParam("saveIndex",-1)
      //alert(saveIndex)
      //const {saveIndex} = this.props.navigation.state.params

      if (saveIndexx != -1) {
        getData((record) => {
          this.setState({
            saveIndexx,
            data: {
              ...data,
              name: record[saveIndexx].name,
              name2: record[saveIndexx].name2,
              finalThickness: record[saveIndexx].finalThickness,
              finalMaterial: record[saveIndexx].finalMaterial,
              singleResult: record[saveIndexx].singleResult,
            },
          });
        });
      } else {
        this.setState({
          saveIndexx: -1,
          data: {
            ...data,
            name: 0,
            name2: 0,
            finalThickness: '',
            finalMaterial: '',
            singleResult: '',
          },
        });
      }
    });

    let gsl = await AsyncStorage.getItem('gsl');
    let parsed4 = JSON.parse(gsl);
    this.setState({gsl4: parsed4});
  };

  calc4 = () => {
    const {data} = this.state;
    this.setState({counter103: this.state.counter103 + 1});
    // let total = this.state.widthh + this.state.heightt;
    var wid103 = parseFloat(this.state.data.name / 144);
    var hei103 = parseFloat(this.state.data.name2 / 144);
    // this.setState({widthStore : width103 , heightStore : height103})
    //console.log(width103)
    var gsl1 = 2 * wid103 + 2 * hei103;
    var gsl3 = 2 * wid103 + 4 * hei103;
    var gsl4 = 2 * hei103;
    var gsl5 = wid103 + 2 * hei103;

    var final = gsl1 + gsl3 + gsl4 + gsl5;
    console.log(
      'GSL1=> ',
      gsl1,
      'GSL3=> ',
      gsl3,
      'GSL4=>, ',
      gsl4,
      ' GSL5=>,',
      gsl5,
      'FINAL==> ',
      final,
    );
    if (this.state.data.finalThickness == 1.2) {
      if (this.state.data.finalMaterial == 'Dull') {
        var a103 = 361 + 224 + 94 + 151;
        console.log('AAA', a103);
      }
      if (this.state.data.finalMaterial == 'H23') {
        var a103 = 367 + 227 + 95 + 154;
      }
      if (this.state.data.finalMaterial == 'Sahara/Brown') {
        var a103 = 393 + 243 + 102 + 165;
      }
      if (this.state.data.finalMaterial == 'Black/Multi') {
        var a103 = 411 + 255 + 107 + 172;
      }
      if (this.state.data.finalMaterial == 'Wood Coating') {
        var a103 = 459 + 284 + 119 + 192;
      }
      var num103 = final * a103;
      var total103 = (this.state.gsl4 += num103);
      // this.setState(prevState => {
      //     var data = Object.assign({}, prevState.data);  // creating copy of state variable jasper
      //     data.singleResult = num103;
      //     console.log(":jaspoer" , data)
      //     this.setState({data : data})              // update the name property, assign a new value
      //     return { data };                                 // return new object jasper object
      //   })
      //var finalres = this.state.data.singleResult
      //this.setState({ data: { ...data, singleResult: num103 } })
      // this.setState({ })
      data.singleResult = num103;
      this.setState({data});
      this.setState({res103: total103}, function () {
        // alert(this.state.res103)
      });
      //    this.setState({res103: total103})
      console.log('num', num103);
      console.log('sdsffdssdsd', data.singleResult);
    }
    if (this.state.data.finalThickness == 1.6) {
      if (this.state.data.finalMaterial == 'Dull') {
        var a103 = 482 + 300 + 94 + 151;
      }
      if (this.state.data.finalMaterial == 'H23') {
        var a103 = 489 + 305 + 95 + 154;
      }
      if (this.state.data.finalMaterial == 'Sahara/Brown') {
        var a103 = 524 + 326 + 102 + 165;
      }
      if (this.state.data.finalMaterial == 'Black/Multi') {
        var a103 = 548 + 341 + 107 + 172;
      }
      if (this.state.data.finalMaterial == 'Wood Coating') {
        var a103 = 612 + 381 + 119 + 192;
      }
      var num103 = final * a103;
      var total103 = (this.state.gsl4 += num103);
      data.singleResult = num103;
      this.setState({data});
      this.setState({res103: total103}, function () {
        // alert(data)
      });
      //    this.setState({res103 : total103})
      //alert(this.state.res)
    }

    if (this.state.data.finalThickness == 2.0) {
      if (this.state.data.finalMaterial == 'Dull') {
        var a103 = 602 + 377 + 94 + 151;
      }
      if (this.state.data.finalMaterial == 'H23') {
        var a103 = 612 + 384 + 95 + 154;
      }
      if (this.state.data.finalMaterial == 'Sahara/Brown') {
        var a103 = 655 + 410 + 102 + 165;
      }
      if (this.state.data.finalMaterial == 'Black/Multi') {
        var a103 = 686 + 430 + 107 + 172;
      }
      if (this.state.data.finalMaterial == 'Wood Coating') {
        var a103 = 765 + 479 + 119 + 192;
      }
      var num103 = final * a103;
      var total103 = (this.state.gsl4 += num103);
      data.singleResult = num103;
      this.setState({data});
      this.setState({res103: total103}, function () {
        // alert(this.state.res103)
      });
      //this.setState({res103 : total103})
      //alert(this.state.res)
    }

    //    var editVal = { thick: this.state.thickness103, material: this.state.material103,
    //     width: width103, height: height103, };

    //     console.log(editVal)
    // AsyncStorage.setItem('@StoredData:key', JSON.stringify(editVal));
    //    try {
    //        await AsyncStorage.setItem('@StoredData:key', JSON.stringify(editVal));
    //    } catch (error) {

    //    }

    //    if(this.state.thicknessStd3 == 1 )
    //    {
    //        if(this.state.materialStd3==1)
    //        {
    //            var a103=267;
    //        }
    //        if(this.state.materialStd3==2)
    //        {
    //            var a103=272;
    //        }
    //        if(this.state.materialStd3==3)
    //        {
    //            var a103=291;
    //        }
    //        if(this.state.materialStd3==4)
    //        {
    //            var a103=305;
    //        }
    //        if(this.state.materialStd3==5)
    //        {
    //            var a103=340;
    //        }
    //        var num103 = final*a103
    //        var total103 = this.state.res103+=num103
    //        this.setState({res103 : total103})
    //        //alert(this.state.res)

    //    }

    //    if(this.state.thicknessStd3 == 2 )
    //    {
    //        if(this.state.materialStd3==1)
    //        {
    //            var a103=336;
    //        }
    //        if(this.state.materialStd3==2)
    //        {
    //            var a103=343;
    //        }
    //        if(this.state.materialStd3==3)
    //        {
    //            var a103=367;
    //        }
    //        if(this.state.materialStd3==4)
    //        {
    //            var a103=384;
    //        }
    //        if(this.state.materialStd3==5)
    //        {
    //            var a103=428;
    //        }
    //        var num103 = final*a103
    //        var total103 = this.state.res103+=num103
    //        this.setState({res103 : total103})
    //        //alert(this.state.res)

    //    }

    //    if(this.state.thicknessStd4 == 1 )
    //    {
    //        if(this.state.materialStd4==1)
    //        {
    //            var a103=109;
    //        }
    //        if(this.state.materialStd4==2)
    //        {
    //            var a103=117;
    //        }
    //        if(this.state.materialStd4==3)
    //        {
    //            var a103=125;
    //        }
    //        if(this.state.materialStd4==4)
    //        {
    //            var a103=131;
    //        }
    //        if(this.state.materialStd4==5)
    //        {
    //            var a103=147;
    //        }

    //        var num103 = final*a103
    //        var total103 = this.state.res103+=num103
    //        this.setState({res103 : total103})
    //        //alert(this.state.res)

    //    }

    //    if(this.state.thicknessStd5 == 1 )
    //    {
    //        if(this.state.materialStd5==1)
    //        {
    //            var a103=142;
    //        }
    //        if(this.state.materialStd5==2)
    //        {
    //            var a103=152;
    //        }
    //        if(this.state.materialStd5==3)
    //        {
    //            var a103=163;
    //        }
    //        if(this.state.materialStd5==4)
    //        {
    //            var a103=171;
    //        }
    //        if(this.state.materialStd5==5)
    //        {
    //            var a103=191;
    //        }

    //        var num103 = final*a103
    //        var total103 = this.state.res103+=num103
    //        this.setState({res103 : total103})
    //        //alert(this.state.res)

    //    }
    else {
      alert('Your entry succussfully store');
    }
    //    this.state.widthh = ''
  };
  CalcGsl() {
    const {data, saveIndexx, finalThickness, finalMaterial} = this.state;
    this.calc4();
    // alert(this.state.data.singleResult)
    console.log('aaaaa', data);
    if (saveIndexx != -1) {
      getData((record) => {
        record[saveIndexx] = data;
        setData(
          record,
          () => {
            this.setState({
              saveIndexx: -1,
              data: {
                ...data,
                name: '',
                name2: '',
                finalThickness: '',
                finalMaterial: '',
                singleResult: '',
              },
            });
          },
          () => {},
        );
      });
    } else {
      getData((record) => {
        record.push(data);
        setData(
          record,
          () => {
            this.setState({
              saveIndexx: -1,
              data: {
                ...data,
                name: 0,
                name2: 0,
                finalThickness: '',
                finalMaterial: '',
                singleResult: 0,
              },
            });
          },
          () => {},
        );
      });
    }
  }
  final() {
    var aaa = this.state.res103;
    var aaaa = parseFloat(aaa);
    console.log(this.state.finalThickness);
    // alert(aaaa)
    // let aaaa= (aaa).toFixed(2);
    // let obj2 = {

    //     gsl: aaa,

    //   }
    // AsyncStorage.setItem('gsl', JSON.stringify(aaaa));
    this.props.navigation.navigate('GetQoute');
  }
  //    calc4 = () =>
  //    {
  //        // this.increment()
  //        alert(this.state.res103)
  //    }
  // move = () => {
  // this.props.navigation.navigate('GetQoute',{result:this.state.res})
  // }
  /////=================>Sliding================>

  updateThickness103 = (thickness103) => {
    this.setState({thickness103: thickness103});
    // alert(this.state.thickness)
  };
  updateMaterial103 = (material103) => {
    this.setState({material103: material103});
  };
  updateMaterialStd5 = (materialStd5) => {
    this.setState({materialStd5: materialStd5});
  };
  updateThicknessStd5 = (thicknessStd5) => {
    this.setState({thicknessStd5: thicknessStd5});
    // alert(this.state.thickness)
  };
  updateMaterialStd4 = (materialStd4) => {
    this.setState({materialStd4: materialStd4});
  };
  updateThicknessStd4 = (thicknessStd4) => {
    this.setState({thicknessStd4: thicknessStd4});
    // alert(this.state.thickness)
  };
  updateMaterialStd3 = (materialStd3) => {
    this.setState({materialStd3: materialStd3});
  };
  updateThicknessStd3 = (thicknessStd3) => {
    this.setState({thicknessStd3: thicknessStd3});
    // alert(this.state.thickness)
  };

  topMenuDesign() {
    const {data, saveIndex} = this.state;
    let {headerValues} = this.state;
    var fixedcolor = this.state.fixed == true ? '#E8572A' : '#777777';
    var slidingcolor = this.state.sliding == true ? '#E8572A' : '#777777';
    var doublecolor = this.state.double == true ? '#E8572A' : '#777777';
    var D42Color = this.state.D42 == true ? '#E8572A' : '#777777';
    var D54AColor = this.state.D54A == true ? '#E8572A' : '#777777';
    var HD02 = this.state.HD02 == true ? '#E8572A' : '#777777';
    var HD04 = this.state.HD04 == true ? '#E8572A' : '#777777';
    return (
      <View>
        <View>
          <View>
            {/* <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Sliding Window</Text>
                            </View>
                          */}
            <View
              style={{
                marginHorizontal: Width(4),
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: primaryColor,
                borderRadius: 5,
                width: Width(10),
                height: Height(5),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: primaryColor,
                  fontSize: 15,
                  textAlign: 'center',
                  top: 6,
                  left: -2,
                }}>
                #{this.state.counter103}
              </Text>
            </View>
            <View>
              <View style={{}}>
                <View
                  style={{
                    marginVertical: Height(2),
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
                    Calculate GSL
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <View style={{marginTop: -30}}>
                    <View style={{}}>
                      <View>
                        <Text
                          style={{
                            ...mediumTextFont,
                            fontSize: 15,
                            top: 45,
                            left: 10,
                          }}>
                          Thickness:
                        </Text>
                      </View>
                      <View
                        style={{
                          marginHorizontal: Width(20),
                          marginTop: 5,
                          borderColor: secondryColor,
                          borderWidth: 1,
                          left: 30,
                        }}>
                        <Picker
                          style={{}}
                          selectedValue={data.finalThickness}
                          //onValueChange={this.updateThickness103}
                          onValueChange={(value) =>
                            this.setState({
                              data: {...data, finalThickness: value},
                            })
                          }
                          // value={data.name}
                        >
                          <Picker.Item label="Select thickness" value="" />
                          <Picker.Item label="1.2MM" value="1.2" />
                          <Picker.Item label="1.6MM" value="1.6" />
                          <Picker.Item label="2.0MM" value="2.0" />
                        </Picker>
                        {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                      </View>
                    </View>

                    <View style={{marginTop: Height(-3)}}>
                      <View>
                        <Text
                          style={{
                            ...mediumTextFont,
                            fontSize: 15,
                            top: 45,
                            left: 10,
                          }}>
                          Material:
                        </Text>
                      </View>
                      <View
                        style={{
                          marginHorizontal: Width(20),
                          marginTop: 5,
                          borderColor: secondryColor,
                          borderWidth: 1,
                          left: 30,
                        }}>
                        <Picker
                          selectedValue={data.finalMaterial}
                          //onValueChange={this.updateMaterial103}
                          onValueChange={(value) =>
                            this.setState({
                              data: {...data, finalMaterial: value},
                            })
                          }>
                          <Picker.Item label="Select material" value="" />
                          <Picker.Item label="Dull" value="Dull" />
                          <Picker.Item label="H23" value="H23" />
                          <Picker.Item
                            label="Sahara/Brown"
                            value="Sahara/Brown"
                          />
                          <Picker.Item
                            label="Black/Multi"
                            value="Black/Multi"
                          />
                          <Picker.Item
                            label="Wood Coating"
                            value="Wood Coating"
                          />
                        </Picker>
                        {/* <Text style={styles.text}>{this.state.material}</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{marginTop: Height(-1)}}>
                    <View style={{}}>
                      <Text style={styles.labelName}>Width(in)</Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        style={styles.txtInputStyle}
                        autoCapitalize="none"
                        editable={true}
                        autoCorrect={false}
                        // underlineColorAndroid="#979797"
                        returnKeyType="next"
                        // keyboardType='numeric'
                        placeholder="width here..."
                        onChangeText={(text) =>
                          this.setState({data: {...data, name: text}})
                        }
                        value={data.name}
                        //onChangeText = {this.handleWidth103}
                        placeholderTextColor="#c6c6c6"
                      />
                    </View>
                  </View>
                  <View style={{marginTop: Height(-3)}}>
                    <View style={{}}>
                      <Text style={styles.labelName}>Height(in)</Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        style={styles.txtInputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        // underlineColorAndroid="#979797"
                        returnKeyType="next"
                        // keyboardType='numeric'
                        placeholder="height here..."
                        onChangeText={(text) =>
                          this.setState({data: {...data, name2: text}})
                        }
                        value={data.name2}
                        //onChangeText = {this.handleHeight103}
                        placeholderTextColor="#c6c6c6"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{marginTop: -20}}>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: Height(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.CalcGsl();
                    }}
                    style={{
                      backgroundColor: primaryColor,
                      width: Width(29),
                      height: Height(6),
                      borderRadius: 5,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        ...textFont,
                        fontSize: 14,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      Calculate
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Height(18),
                  }}>
                  <View style={{marginLeft: Width(6)}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.final();
                      }}
                      style={{
                        backgroundColor: primaryColor,
                        width: Width(29),
                        height: Height(6),
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...textFont,
                          fontSize: 14,
                          color: '#fff',
                          textAlign: 'center',
                        }}>
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginHorizontal: Width(6)}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Edit')}
                      style={{
                        backgroundColor: primaryColor,
                        width: Width(29),
                        height: Height(6),
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...textFont,
                          fontSize: 14,
                          color: '#fff',
                          textAlign: 'center',
                        }}>
                        Update
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.move()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Move</Text>
                                            </TouchableOpacity>
                                        </View> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const {language, theme} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor={primaryColor} />
        <MyHeader title="GSL" navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: Height(5)}}>
            {/* {this.serachBarDesign()} */}
            {this.topMenuDesign()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroungImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  labelName: {
    ...mediumTextFont,
    color: primaryColor,
    fontSize: 16,
    marginLeft: Width(3),
    top: 36,
  },
  txtInputView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 6,
    borderWidth: 1,
    borderColor: secondryColor,
    borderRadius: 5,
    left: 27,
    marginHorizontal: Width(20),
  },
  txtInputStyle: {
    flex: 1,
    height: 33,
    top: -2,
    color: primaryColor,
    lineHeight: 34,
    paddingBottom: 0,
    textAlignVertical: 'top',
  },
});
export default connect(ReducersProps, null)(Home);
