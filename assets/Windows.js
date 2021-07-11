import React, { Component } from 'react';
import { View, Text, Image, StatusBar, ActivityIndicator, ImageBackground, FlatList, TextInput, ScrollView, StyleSheet } from 'react-native';
// import Challenge from './Challenge'
// import Inbox from './Inbox'
import MyHeader from "./reuseable/MyHeader";
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../utils/Dimensions';
import { boldTextFont, Empty, fontColor, defaultFont, mediumTextFont, primaryColor, errorColor, textDefault, textFont, secondryColor } from '../utils/Style';
import TabBar, { iconTypes } from "react-native-fluidbottomnavigation";
import ReducersProps from '../data/local/reducers/ReducersProps'
import { connect } from "react-redux"
import PrivacyPolicy from './SideDrawerScreens/PrivacyPolicy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WebHandler from "../data/remote/WebHandler";
import Urls from '../data/remote/Urls';
import MyUtils from '../utils/Utils';
import Prefmanager from '../data/local/Prefmanager'
import Video from 'react-native-video';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataWindow, setData, setDataWindow } from "../views/Utills"
const webHandler = new WebHandler()
const myUtils = new MyUtils()
const prefs = new Prefmanager()
const CHALLENGE_LIMIT = 20


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            windowsFinal: 0,
            FinalResult: 0,
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
            D42: true,
            D54A: false,
            thickness: '',
            material: '',
            thickness1: '',
            material1: '',
            thickness2: '',
            material2: '',
            thickness3: '',
            material3: '',
            val: '',
            counter: 1,
            counter2: 1,
            widthh: 0,
            heightt: 0,
            widthh2: 0,
            heightt2: 0,
            widthh3: 0,
            heightt3: 0,
            widthh1: 0,
            heightt1: 0,
            res: 0,
            res1: 0,

            //Double===========================>

            HD02: true,
            HD04: false,
            thickness02: '',
            material02: '',
            thickness08: '',
            material08: '',
            thickness04: '',
            material04: '',
            thickness081: '',
            material081: '',
            val: '',
            counter3: 1,
            counter4: 1,
            widthh02: 0,
            heightt02: 0,
            widthh08: 0,
            heightt08: 0,
            widthh04: 0,
            heightt04: 0,
            widthh081: 0,
            heightt081: 0,
            res2: 0,
            res3: 0,

            ///=========================================>

            thickness103: '',
            material103: '',
            width103: 0,
            height103: 0,
            counter103: 0,
            res103: 0,
            windows5: 0,

            data: {
                width: 0, height: 0, width2: 0, height2: 0, finalThickness: "", finalMaterial: "",
                finalThickness2: "", finalMaterial2: "", singleResult: 0,
                width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "",
                finalMaterial3: "", finalThickness4: "", finalMaterial4: "",
                width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "",
                finalThickness6: "", finalMaterial6: "", 
                width7: 0, height7: 0, width8: 0, height8: 0, finalThickness7: "", finalMaterial7: "",
                finalThickness8: "", finalMaterial8: "", 
                width9: 0, height9: 0, finalMaterial9: "",
                finalThickness9: ""
            },
            //saveIndex:props.route.params ? props.route.params : -1,
            saveIndexx: -1,
        }
    }

    handleWidth = (text) => {
        this.setState({ widthh: text })
    }
    handleHeight = (text) => {
        this.setState({ heightt: text })
    }
    handleWidth1 = (text) => {
        this.setState({ widthh1: text })
    }
    handleHeight1 = (text) => {
        this.setState({ heightt1: text })
    }
    handleWidth2 = (text) => {
        this.setState({ widthh2: text })
    }
    handleHeight2 = (text) => {
        this.setState({ heightt2: text })
    }
    handleWidth3 = (text) => {
        this.setState({ widthh3: text })
    }
    handleHeight3 = (text) => {
        this.setState({ heightt3: text })
    }

    //Double========================?

    handleWidth02 = (text) => {
        this.setState({ widthh02: text })
    }
    handleHeight02 = (text) => {
        this.setState({ heightt02: text })
    }
    handleWidth08 = (text) => {
        this.setState({ widthh08: text })
    }
    handleHeight08 = (text) => {
        this.setState({ heightt08: text })
    }
    handleWidth04 = (text) => {
        this.setState({ widthh04: text })
    }
    handleHeight04 = (text) => {
        this.setState({ heightt04: text })
    }
    handleWidth081 = (text) => {
        this.setState({ widthh081: text })
    }
    handleHeight081 = (text) => {
        this.setState({ heightt081: text })
    }

    /////=========================> Sliding

    handleWidth103 = (text) => {
        this.setState({ width103: text })
    }
    handleHeight103 = (text) => {
        this.setState({ height103: text })
    }
    async componentDidMount() {

        const { data } = this.state
        //var saveIndex = this.props.navigation.getParam("saveIndex",-1)

        this.props.navigation.addListener('focus', async (playload) => {
            // var saveIndexx = this.props.route.params.saveIndex ? this.props.route.params.saveIndex : -1;
            //var saveIndexx2 = this.props.route.params.saveIndex2 ? this.props.route.params.saveIndex2 : -1;
            // alert(saveIndexx)
            //this.setState({saveIndex:saveIndexx})
            var saveIndexx = this.props.route.params.saveIndex;
            // var saveIndexx2 = this.props.route.params.saveIndex2
            alert(saveIndexx)
            //var saveIndex = props.route.params.saveIndex ? props.route.params.saveIndex : -1;
            //var saveIndex = this.props.navigation.getParam("saveIndex",-1)
            // alert(saveIndex)
            //const {saveIndex} = this.props.navigation.state.params

            if (saveIndexx != -1) {
                getDataWindow((record) => {
                    this.setState({
                        saveIndexx, data: {
                            ...data, width: record[saveIndexx].width, height: record[saveIndexx].height,
                            width2: record[saveIndexx].width2, height2: record[saveIndexx].height2,
                            finalThickness: record[saveIndexx].finalThickness,
                            finalMaterial: record[saveIndexx].finalMaterial,
                            finalThickness2: record[saveIndexx].finalThickness2,
                            finalMaterial2: record[saveIndexx].finalMaterial2,
                            singleResult: record[saveIndexx].singleResult,
                            width3: record[saveIndexx].width3, height3: record[saveIndexx].height3,
                            width4: record[saveIndexx].width4, height4: record[saveIndexx].height4,
                            finalThickness3: record[saveIndexx].finalThickness3,
                            finalMaterial3: record[saveIndexx].finalMaterial3,
                            finalThickness4: record[saveIndexx].finalThickness4,
                            finalMaterial4: record[saveIndexx].finalMaterial4,
                            width5: record[saveIndexx].width5, height5: record[saveIndexx].height5,
                            width6: record[saveIndexx].width6, height6: record[saveIndexx].height6,
                            finalThickness5: record[saveIndexx].finalThickness5,
                            finalMaterial5: record[saveIndexx].finalMaterial5,
                            finalThickness6: record[saveIndexx].finalThickness6,
                            finalMaterial6: record[saveIndexx].finalMaterial6,
                            width7: record[saveIndexx].width7, height7: record[saveIndexx].height7,
                            width8: record[saveIndexx].width8, height8: record[saveIndexx].height8,
                            finalThickness7: record[saveIndexx].finalThickness7,
                            finalMaterial7: record[saveIndexx].finalMaterial7,
                            finalThickness8: record[saveIndexx].finalThickness8,
                            finalMaterial8: record[saveIndexx].finalMaterial8,
                            width9: record[saveIndexx].width9, height9: record[saveIndexx].height9,
                            finalThickness9: record[saveIndexx].finalThickness9,
                            finalMaterial9: record[saveIndexx].finalMaterial9,
                        }
                    })
                })
            } else {
                this.setState({
                    saveIndexx: -1, data: {
                        ...data, width: 0, height: 0, width2: 0, height2: 0, finalThickness: "", finalMaterial: "", finalThickness2: "", finalMaterial2: "", singleResult: "",
                        width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "",
                        width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "",
                        width7: 0, height7: 0, width8: 0, height8: 0, finalThickness7: "", finalMaterial7: "", finalThickness8: "", finalMaterial8: "",

                        width9: 0, height9: 0, finalThickness9: "", finalMaterial9: "",
                    }
                })
            }
            //   if(saveIndexx2 != -1){
            //     getDataDoor2((record)=>{
            //       this.setState({saveIndexx2,data2:{...data2,
            //width3:record[saveIndexx2].width3,height3:record[saveIndexx2].height3,
            //         width4:record[saveIndexx2].width4,height4:record[saveIndexx2].height4,
            //         finalThickness3:record[saveIndexx2].finalThickness3,
            //         finalMaterial3:record[saveIndexx2].finalMaterial3,
            //         finalThickness4:record[saveIndexx2].finalThickness4,
            //         finalMaterial4:record[saveIndexx2].finalMaterial4,
            //         singleResult:record[saveIndexx2].singleResult,
            //     }})
            //     })
            //   } else {
            //     this.setState({saveIndexx2:-1,data2:{...data2,width3:0,height3:0,width4:0,height4:0,finalThickness3:"",finalMaterial3:"",finalThickness4:"",finalMaterial4:"",singleResult:""}})
            //   }
        })

        let windows = await AsyncStorage.getItem('windows');
        let parsed5 = JSON.parse(windows);
        this.setState({ windows5: parsed5 })
    }
    CalcWindows() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataWindow((record) => {
                record[saveIndexx] = data
                setDataWindow(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width: 0, height: 0, width2: 0, height2: 0, finalThickness: "", finalMaterial: "", finalThickness2: "", finalMaterial2: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataWindow((record) => {
                record.push(data)
                setDataWindow(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width: 0, height: 0, width2: 0, height2: 0, finalThickness: "", finalMaterial: "", finalThickness2: "", finalMaterial2: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc()
    }
    calc = () => {
        const { data } = this.state;
        this.setState({ counter: this.state.counter + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num1 = parseFloat((this.state.data.width) / 12);
        var num2 = 2 * (parseFloat((this.state.data.height) / 12));
        var num4 = parseFloat((this.state.data.width2) / 12);
        var num5 = 2 * (parseFloat((this.state.data.height2) / 12));

        //alert(num1)
        if (this.state.data.finalThickness == 1.2) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 134;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 136;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 146;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 153;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 171;
            }
            var num3 = (num1 + num2) + a;
            var total = this.state.windows5 += num3;
            data.singleResult = num3;
            this.setState({ data })
           // this.setState({ res: total })
           this.setState({ res: total}, function () {
            alert(this.state.res)
        });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness == 1.6) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 174;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 177;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 189;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 198;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 221;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.windows5 += num3
            data.singleResult = num3;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness == 2.0) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 213;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 216;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 232;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 242;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 271;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.windows5 += num3
            data.singleResult = num3;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness2 == 1.2) {
            if (this.state.data.finalMaterial2 == 'Dull') {
                var b = 81;
            }
            if (this.state.data.finalMaterial2 == 'H23') {
                var b = 83;
            }
            if (this.state.data.finalMaterial2 == 'Sahara/Brown') {
                var b = 88;
            }
            if (this.state.data.finalMaterial2 == 'Black/Multi') {
                var b = 93;
            }
            if (this.state.data.finalMaterial2 == 'Wood Coating') {
                var b = 103;
            }
            var num7 = (num4 + num5) * b
            var total = this.state.windows5 += num7
            data.singleResult = num7;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        // if(this.state.thickness1 == 2 )
        // {
        //     if(this.state.material1==1)
        //     {
        //         var b=59;
        //     }
        //     if(this.state.material1==2)
        //     {
        //         var b=77;
        //     }
        //     if(this.state.material1==3)
        //     {
        //         var b=64;
        //     }
        //     if(this.state.material==4)
        //     {
        //         var b=67;
        //     }
        //     if(this.state.material==5)
        //     {
        //         var b=74;
        //     }
        //     var num7 = (num4+num5)*b
        //     var total = this.state.res+=num7
        //     this.setState({res : total})
        //     //alert(this.state.res)

        // }
        // if(this.state.thickness1 == 3 )
        // {
        //     if(this.state.material1==1)
        //     {
        //         var b=1;
        //     }
        //     if(this.state.material1==2)
        //     {
        //         var b=2;
        //     }
        //     if(this.state.material1==3)
        //     {
        //         var b=3;
        //     }
        //     if(this.state.material==4)
        //     {
        //         var b=3;
        //     }
        //     if(this.state.material==5)
        //     {
        //         var b=3;
        //     }
        //     var num7 = (num4+num5)*b
        //     var total = this.state.res+=num7
        //     this.setState({res : total})
        //     //alert(this.state.res)

        // }
        else {
            alert("Previous Values Saved you can add more")
        }
        // this.state.FinalResult += this.state.res;
        // var FN = this.state.FinalResult;
        // this.setState({FinalResult : FN})
        // alert(this.state.res)
        //    this.state.widthh = ''

    }
    CalcWindows2() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataWindow((record) => {
                record[saveIndexx] = data
                setDataWindow(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataWindow((record) => {
                record.push(data)
                setDataWindow(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc1()
    }
    calc = () => {
        const { data } = this.state;
        this.setState({ counter: this.state.counter + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num1 = parseFloat((this.state.data.width) / 12);
        var num2 = 2 * (parseFloat((this.state.data.height) / 12));
        var num4 = parseFloat((this.state.data.width2) / 12);
        var num5 = 2 * (parseFloat((this.state.data.height2) / 12));

        //alert(num1)
        if (this.state.data.finalThickness == 1.2) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 134;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 136;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 146;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 153;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 171;
            }
            var num3 = (num1 + num2) + a;
            var total = this.state.windows5 += num3;
            data.singleResult = num3;
            this.setState({ data })
           // this.setState({ res: total })
           this.setState({ res: total }, function () {
            alert(this.state.res)
        });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness == 1.6) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 174;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 177;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 189;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 198;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 221;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.windows5 += num3
            data.singleResult = num3;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness == 2.0) {
            if (this.state.data.finalMaterial == 'Dull') {
                var a = 213;
            }
            if (this.state.data.finalMaterial == 'H23') {
                var a = 216;
            }
            if (this.state.data.finalMaterial == 'Sahara/Brown') {
                var a = 232;
            }
            if (this.state.data.finalMaterial == 'Black/Multi') {
                var a = 242;
            }
            if (this.state.data.finalMaterial == 'Wood Coating') {
                var a = 271;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.windows5 += num3
            data.singleResult = num3;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness2 == 1.2) {
            if (this.state.data.finalMaterial2 == 'Dull') {
                var b = 81;
            }
            if (this.state.data.finalMaterial2 == 'H23') {
                var b = 83;
            }
            if (this.state.data.finalMaterial2 == 'Sahara/Brown') {
                var b = 88;
            }
            if (this.state.data.finalMaterial2 == 'Black/Multi') {
                var b = 93;
            }
            if (this.state.data.finalMaterial2 == 'Wood Coating') {
                var b = 103;
            }
            var num7 = (num4 + num5) * b
            var total = this.state.windows5 += num7
            data.singleResult = num7;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total }, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        // if(this.state.thickness1 == 2 )
        // {
        //     if(this.state.material1==1)
        //     {
        //         var b=59;
        //     }
        //     if(this.state.material1==2)
        //     {
        //         var b=77;
        //     }
        //     if(this.state.material1==3)
        //     {
        //         var b=64;
        //     }
        //     if(this.state.material==4)
        //     {
        //         var b=67;
        //     }
        //     if(this.state.material==5)
        //     {
        //         var b=74;
        //     }
        //     var num7 = (num4+num5)*b
        //     var total = this.state.res+=num7
        //     this.setState({res : total})
        //     //alert(this.state.res)

        // }
        // if(this.state.thickness1 == 3 )
        // {
        //     if(this.state.material1==1)
        //     {
        //         var b=1;
        //     }
        //     if(this.state.material1==2)
        //     {
        //         var b=2;
        //     }
        //     if(this.state.material1==3)
        //     {
        //         var b=3;
        //     }
        //     if(this.state.material==4)
        //     {
        //         var b=3;
        //     }
        //     if(this.state.material==5)
        //     {
        //         var b=3;
        //     }
        //     var num7 = (num4+num5)*b
        //     var total = this.state.res+=num7
        //     this.setState({res : total})
        //     //alert(this.state.res)

        // }
        else {
            alert("Previous Values Saved you can add more")
        }
        // this.state.FinalResult += this.state.res;
        // var FN = this.state.FinalResult;
        // this.setState({FinalResult : FN})
        // alert(this.state.res)
        //    this.state.widthh = ''

    }
    

    calc1 = () => {
        const { data } = this.state;
        this.setState({ counter2: this.state.counter2 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num8 = parseFloat((this.state.data.width3) / 12);
        var num9 = 2 * (parseFloat((this.state.data.height3) / 12));
        var num10 = parseFloat((this.state.data.width4) / 12);
        var num11 = 2 * (parseFloat((this.state.data.height4) / 12));
        if (this.state.data.finalThickness3 == 1.2) {
            if (this.state.data.finalMaterial3 == 'Dull') {
                var a = 177;
            }
            if (this.state.data.finalMaterial3 == 'H23') {
                var a = 180;
            }
            if (this.state.data.finalMaterial3 == 'Sahara/Brown') {
                var a = 192;
            }
            if (this.state.data.finalMaterial3 == 'Black/Multi') {
                var a = 201;
            }
            if (this.state.data.finalMaterial3 == 'Wood Coating') {
                var a = 224;
            }
            var num12 = num8 + num9 + a
            var total1 = this.state.windows5 += num12
            data.singleResult = num12;
            this.setState({ data })
            //this.setState({ res1: total1 })
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness3 == 1.6) {
            if (this.state.data.finalMaterial3 == 'Dull') {
                var a = 220;
            }
            if (this.state.data.finalMaterial3 == 'H23') {
                var a = 224;
            }
            if (this.state.data.finalMaterial3 == 'Sahara/Brown') {
                var a = 239;
            }
            if (this.state.data.finalMaterial3 == 'Black/Multi') {
                var a = 251;
            }
            if (this.state.data.finalMaterial3 == 'Wood Coating') {
                var a = 280;
            }
            var num12 = (num8 + num9) * a
            var total1 = this.state.windows5 += num12
            data.singleResult = num12;
            this.setState({ data })
           // this.setState({ res1: total1 })
           this.setState({ res1: total1 }, function () {
            alert(this.state.res1)
        });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness3 == 2.0) {
            if (this.state.data.finalMaterial3 == 'Dull') {
                var a = 269;
            }
            if (this.state.data.finalMaterial3 == 'H23') {
                var a = 274;
            }
            if (this.state.data.finalMaterial3 == 'Sahara/Brown') {
                var a = 293;
            }
            if (this.state.data.finalMaterial3 == 'Black/Multi') {
                var a = 307;
            }
            if (this.state.data.finalMaterial3 == 'Wood Coating') {
                var a = 342;
            }
            var num12 = (num8 + num9) * a
            var total1 = this.state.windows5 += num12
            data.singleResult = num12;
            this.setState({ data })
            //this.setState({ res1: total1 })
            this.setState({ res1: total1 }, function () {
                alert(this.state.res1)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness4 == 1.2) {
            if (this.state.data.finalMaterial4 == 'Dull') {
                var b = 81;
            }
            if (this.state.data.finalMaterial4 == 'H23') {
                var b = 83;
            }
            if (this.state.data.finalMaterial4 == 'Sahara/Brown') {
                var b = 88;
            }
            if (this.state.data.finalMaterial4 == 'Black/Multi') {
                var b = 93;
            }
            if (this.state.data.finalMaterial4 == 'Wood Coating') {
                var b = 103;
            }
            var num12 = (num10 + num11) * b
            var total1 = this.state.windows5 += num12
            data.singleResult = num12;
            this.setState({ data })
            //this.setState({ res1: total1 })
            this.setState({ res1: total1 }, function () {
                alert(this.state.res1)
            });
            //alert(this.state.res)

        }

        //    if(this.state.thickness3 == 2 )
        //    {
        //        if(this.state.material3==1)
        //        {
        //            var b=1;
        //        }
        //        if(this.state.material3==2)
        //        {
        //            var b=2;
        //        }
        //        if(this.state.material3==3)
        //        {
        //            var b=3;
        //        }
        //        if(this.state.material==4)
        //        {
        //            var b=3;
        //        }
        //        if(this.state.material==5)
        //        {
        //            var b=3;
        //        }
        //        var num12 = (num10+num11)*b
        //        var total1 = this.state.res1+=num12
        //        this.setState({res1 : total1})
        //        //alert(this.state.res)

        //    }
        //    if(this.state.thickness3 == 3 )
        //    {
        //        if(this.state.material3==1)
        //        {
        //            var b=1;
        //        }
        //        if(this.state.material3==2)
        //        {
        //            var b=2;
        //        }
        //        if(this.state.material3==3)
        //        {
        //            var b=3;
        //        }
        //        if(this.state.material==4)
        //        {
        //            var b=3;
        //        }
        //        if(this.state.material==5)
        //        {
        //            var b=3;
        //        }

        //        var num12 = (num10+num11)*b
        //        var total1 = this.state.res1+=num12
        //        this.setState({res1 : total1})
        //        //alert(this.state.res)

        //    }
        else {
            alert("Previous Values Saved you can add more")
        }
        //    this.state.widthh = ''
        //    this.state.FinalResult += this.state.res1;
        //    var FN = this.state.FinalResult;
        //    this.setState({FinalResult : FN})
        //    alert(this.state.res1)   
    }
    async final() {
        var aaa = (this.state.res) + (this.state.res1) + (this.state.res103) + (this.state.res2) + (this.state.res3);
        var aaaa = parseFloat(aaa);
        alert(aaaa)
        //let aaaa= (aaa).toFixed(2);

        // AsyncStorage.setItem('dow', JSON.stringify(aaaa));
        this.props.navigation.navigate('GetQoute')
        //   let windows = await AsyncStorage.getItem('windows');
        //   let parsed = JSON.parse(windows);
        //   this.setState({ windowsFinal: parsed })
        // AsyncStorage.getItem('windows').then((windows) => {
        //     if(windows){
        //         this.setState({windowsFinal: windows});
        //         console.log("previous==>",this.state.windowsFinal);
        //     }
        // });
        //   var WinGrand = this.state.windowsFinal + parseFloat(aaaa);
        //   let obj = {  

        //     windows: WinGrand,  

        //   }
        //   AsyncStorage.setItem('windows',JSON.stringify(obj));
        //   this.props.navigation.navigate('GetQoute')
    }
    CalcWindows3() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataWindow((record) => {
                record[saveIndexx] = data
                setDataWindow(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width5: 0, height5 :0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataWindow((record) => {
                record.push(data)
                setDataWindow(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc2()
    }
 

    calc2 = () => {
        const { data } = this.state;
        this.setState({ counter2: this.state.counter2 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num82 = 2 * (parseFloat((this.state.data.width5) / 12));
        var num92 = 2 * (parseFloat((this.state.data.height5) / 12));
        var num108 = 2 * (parseFloat((this.state.data.width6) / 12));
        var num118 = 2 * (parseFloat((this.state.data.height6) / 12));
        if (this.state.data.finalThickness5 == 1.6) {
            if (this.state.data.finalMaterial5 == 'Dull') {
                var a2 = 364;
            }
            if (this.state.data.finalMaterial5 == 'H23') {
                var a2 = 370;
            }
            if (this.state.data.finalMaterial5 == 'Sahara/Brown') {
                var a2 = 396;
            }
            if (this.state.data.finalMaterial5 == 'Black/Multi') {
                var a2 = 414;
            }
            if (this.state.data.finalMaterial5 == 'Wood Coating') {
                var a2 = 462;
            }
            var num122 = (num82 + num92) * a2
            var total2 = this.state.windows5 += num122
            data.singleResult = num122;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2}, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        //    if(this.state.thickness02 == 2 )
        //    {
        //        if(this.state.material02==1)
        //        {
        //            var a2=392;
        //        }
        //        if(this.state.material02==2)
        //        {
        //            var a2=419;
        //        }
        //        if(this.state.material02==3)
        //        {
        //            var a2=449;
        //        }
        //        if(this.state.material02==4)
        //        {
        //            var a2=471;
        //        }
        //        if(this.state.material02==5)
        //        {
        //            var a2=528;
        //        }
        //        var num122 = (num82+num92)*a2
        //        var total2 = this.state.windows5+=num122
        //        this.setState({res2 : total2})
        //        //alert(this.state.res)

        //    }
        //    if(this.state.thickness02 == 3 )
        //    {
        //        if(this.state.material02==1)
        //        {
        //            var a2=1;
        //        }
        //        if(this.state.material02==2)
        //        {
        //            var a2=2;
        //        }
        //        if(this.state.material02==3)
        //        {
        //            var a2=3;
        //        }
        //        if(this.state.material02==4)
        //        {
        //            var a2=3;
        //        }
        //        if(this.state.material02==5)
        //        {
        //            var a2=3;
        //        }
        //        var num122 = num82+num92+a2
        //        var total2 = this.state.res2+=num122
        //        this.setState({res2 : total2})
        //        //alert(this.state.res)

        //    }
        if (this.state.data.finalThickness6 == 1.2) {
            if (this.state.data.finalMaterial6 == 'Dull') {
                var b2 = 71;
            }
            if (this.state.data.finalMaterial6 == 'H23') {
                var b2 = 72;
            }
            if (this.state.data.finalMaterial6 == 'Sahara/Brown') {
                var b2 = 77;
            }
            if (this.state.data.finalMaterial6 == 'Black/Multi') {
                var b2 = 81;
            }
            if (this.state.data.finalMaterial6 == 'Wood Coating') {
                var b2 = 90;
            }
            var num128 = (num108 + num118) * b2
            var total2 = this.state.windows5 += num128
            data.singleResult = num128;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        //    if(this.state.thickness08 == 2 )
        //    {
        //        if(this.state.material08==1)
        //        {
        //            var b2=1;
        //        }
        //        if(this.state.material08==2)
        //        {
        //            var b2=2;
        //        }
        //        if(this.state.material08==3)
        //        {
        //            var b2=3;
        //        }
        //        if(this.state.material08==4)
        //        {
        //            var b2=3;
        //        }
        //        if(this.state.material08==5)
        //        {
        //            var b2=3;
        //        }
        //        var num128 = (num108+num118)*b2
        //        var total2 = this.state.res2+=num128
        //        this.setState({res2 : total2})
        //        //alert(this.state.res)

        //    }
        //    if(this.state.thickness08 == 3 )
        //    {
        //        if(this.state.material08==1)
        //        {
        //            var b2=1;
        //        }
        //        if(this.state.material08==2)
        //        {
        //            var b2=2;
        //        }
        //        if(this.state.material08==3)
        //        {
        //            var b2=3;
        //        }
        //        if(this.state.material08==4)
        //        {
        //            var b2=3;
        //        }
        //        if(this.state.material08==5)
        //        {
        //            var b2=3;
        //        }
        //        var num128 = (num108+num118)*b2
        //        var total2 = this.state.res2+=num128
        //        this.setState({res2 : total2})
        //        //alert(this.state.res)

        //    }
        else {
            alert("Previous Values Saved you can add more")
        }
        //    this.state.widthh = ''

    }
    CalcWindows4() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataWindow((record) => {
                record[saveIndexx] = data
                setDataWindow(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width7: 0, height7 :0, width8: 0, height8: 0, finalThickness7: "", finalMaterial7: "", finalThickness8: "", finalMaterial8: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataWindow((record) => {
                record.push(data)
                setDataWindow(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width7: 0, height7: 0, width8: 0, height8: 0, finalThickness7: "", finalMaterial7: "", finalThickness8: "", finalMaterial8: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc3()
    }
    calc3 = () => {
        const { data } = this.state;
        this.setState({ counter4: this.state.counter4 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num821 = 2 * (parseFloat((this.state.data.width7) / 12));
        var num921 = 2 * (parseFloat((this.state.data.height7) / 12));
        var num1081 = 2 * (parseFloat((this.state.data.width8) / 12));
        var num1181 = 2 * (parseFloat((this.state.data.height8) / 12));
        if (this.state.data.finalThickness7 == 1.6) {
            if (this.state.data.finalMaterial7 == 'Dull') {
                var a21 = 325;
            }
            if (this.state.data.finalMaterial7 == 'H23') {
                var a21 = 331;
            }
            if (this.state.data.finalMaterial7 == 'Sahara/Brown') {
                var a21 = 354;
            }
            if (this.state.data.finalMaterial7 == 'Black/Multi') {
                var a21 = 370;
            }
            if (this.state.data.finalMaterial7 == 'Wood Coating') {
                var a21 = 413;
            }
            var num1221 = (num821 + num921) * a21
            var total21 = this.state.windows5 += num1221
            data.singleResult = num1221;
            this.setState({ data })
            // this.setState({ res3: total21 })
            this.setState({ res3: total21}, function () {
                alert(this.state.res3)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness7 == 2.0) {
            if (this.state.data.finalMaterial7 == 'Dull') {
                var a21 = 389;
            }
            if (this.state.data.finalMaterial7 == 'H23') {
                var a21 = 396;
            }
            if (this.state.data.finalMaterial7 == 'Sahara/Brown') {
                var a21 = 423;
            }
            if (this.state.data.finalMaterial7 == 'Black/Multi') {
                var a21 = 443;
            }
            if (this.state.data.finalMaterial7 == 'Wood Coating') {
                var a21 = 496;
            }
            var num1221 = (num821 + num921) * a21
            var total21 = this.state.windows5 += num1221
            data.singleResult = num1221;
            this.setState({ data })
            // this.setState({ res3: total21 })
            this.setState({ res3: total21}, function () {
                alert(this.state.res3)
            });
            //alert(this.state.res)

        }
        //    if(this.state.thickness04 == 3 )
        //    {
        //        if(this.state.material04==1)
        //        {
        //            var a21=1;
        //        }
        //        if(this.state.material04==2)
        //        {
        //            var a21=2;
        //        }
        //        if(this.state.material04==3)
        //        {
        //            var a21=3;
        //        }
        //        if(this.state.material04==4)
        //        {
        //            var a21=3;
        //        }
        //        if(this.state.material04==5)
        //        {
        //            var a21=3;
        //        }
        //        var num1221 = num821+num921+a21
        //        var total21 = this.state.res3+=num1221
        //        this.setState({res3 : total21})
        //        //alert(this.state.res)

        //    }
        if (this.state.data.finalThickness8 == 1.2) {
            if (this.state.data.finalMaterial8 == 'Dull') {
                var b21 = 71;
            }
            if (this.state.data.finalMaterial8 == 'H23') {
                var b21 = 72;
            }
            if (this.state.data.finalMaterial8 == 'Sahara/Brown') {
                var b21 = 77;
            }
            if (this.state.data.finalMaterial8 == 'Black/Multi') {
                var b21 = 81;
            }
            if (this.state.data.finalMaterial8 == 'Wood Coating') {
                var b21 = 90;
            }
            var num1281 = (num1081 + num1181) * b21
            var total21 = this.state.windows5 += num1281
            data.singleResult = num1281;
            this.setState({ data })
            // this.setState({ res3: total21 })
            this.setState({ res3: total21}, function () {
                alert(this.state.res3)
            });
            //alert(this.state.res)

        }
        //    if(this.state.thickness081 == 2 )
        //    {
        //        if(this.state.material081==1)
        //        {
        //            var b21=1;
        //        }
        //        if(this.state.material081==2)
        //        {
        //            var b21=2;
        //        }
        //        if(this.state.material081==3)
        //        {
        //            var b21=3;
        //        }
        //        if(this.state.material081==4)
        //        {
        //            var b21=3;
        //        }
        //        if(this.state.material081==5)
        //        {
        //            var b21=3;
        //        }
        //        var num1281 = (num1081+num1181)*b21
        //        var total21 = this.state.res2+=num1281
        //        this.setState({res3 : total21})
        //        //alert(this.state.res)

        //    }
        //    if(this.state.thickness081 == 3 )
        //    {
        //        if(this.state.material081==1)
        //        {
        //            var b21=1;
        //        }
        //        if(this.state.material081==2)
        //        {
        //            var b21=2;
        //        }
        //        if(this.state.material081==3)
        //        {
        //            var b21=3;
        //        }
        //        if(this.state.material081==4)
        //        {
        //            var b21=3;
        //        }
        //        if(this.state.material081==5)
        //        {
        //            var b21=3;
        //        }
        //        var num1281 = (num1081+num1181)*b21
        //        var total21 = this.state.res2+=num1281
        //        this.setState({res3 : total21})
        //        //alert(this.state.res)

        //    }
        else {
            alert("Previous Values Saved you can add more")
        }
        //    this.state.widthh = ''

    }
    CalcWindows5() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataWindow((record) => {
                record[saveIndexx] = data
                setDataWindow(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width9: 0, height9 :0,finalThickness9: "", finalMaterial9: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataWindow((record) => {
                record.push(data)
                setDataWindow(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width9: 0, height9: 0, finalThickness9: "", finalMaterial9: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc4()
    }
    calc4 = () => {
        const {data} = this.state;
        this.setState({ counter103: this.state.counter103 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var wid103 = parseFloat((this.state.data.width9) / 12);
        var hei103 = parseFloat((this.state.data.height9) / 12);

        var dc26 = wid103;
        var dc30 = wid103 + (2 * hei103);
        var m23 = 2 * hei103;
        var m24 = 2 * wid103;
        var m28 = 2 * hei103;

        var final = dc26 + dc30 + m23 + m24 + m28;
        console.log("DC26=> ", dc26, "DC30=> ", dc30, "M23=>, ", m23, " M24=>,", m24, " M28=> ,", m28, "FINAL==> ", final)
        if (this.state.data.finalThickness9 == 1.2) {
            if (this.state.data.finalMaterial9 == 'Dull') {
                var a103 = 346 + 304 + 156 + 187 + 192;
            }
            if (this.state.data.finalMaterial9 == 'H23') {
                var a103 = 352 + 309 + 159 + 190 + 195;
            }
            if (this.state.data.finalMaterial9 == 'Sahara/Brown') {
                var a103 = 377 + 330 + 170 + 203 + 209;
            }
            if (this.state.data.finalMaterial9 == 'Black/Multi') {
                var a103 = 394 + 346 + 178 + 213 + 218;
            }
            if (this.state.data.finalMaterial9 == 'Wood Coating') {
                var a103 = 440 + 386 + 199 + 237 + 244;
            }
            var num103 = final * a103
            var total103 = this.state.windows5 += num103
            data.singleResult = num103;
            this.setState({ data })
            // this.setState({ res103: total103 })
            this.setState({ res103: total103}, function () {
                alert(this.state.res103)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness9 == 1.6) {
            if (this.state.data.finalMaterial9 == 'Dull') {
                var a103 = 451 + 417 + 202 + 241 + 248;
            }
            if (this.state.data.finalMaterial9 == 'H23') {
                var a103 = 458 + 424 + 205 + 245 + 252;
            }
            if (this.state.data.finalMaterial9 == 'Sahara/Brown') {
                var a103 = 490 + 454 + 220 + 262 + 269;
            }
            if (this.state.data.finalMaterial9 == 'Black/Multi') {
                var a103 = 513 + 475 + 230 + 274 + 282;
            }
            if (this.state.data.finalMaterial9 == 'Wood Coating') {
                var a103 = 573 + 530 + 256 + 306 + 315;
            }
            var num103 = final * a103
            var total103 = this.state.windows5 += num103
            data.singleResult = num103;
            this.setState({ data })
            // this.setState({ res103: total103 })
            this.setState({ res103: total103 }, function () {
                alert(this.state.res103)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness9 == 2.0) {
            if (this.state.data.finalMaterial9 == 'Dull') {
                var a103 = 567 + 512 + 247 + 295 + 304;
            }
            if (this.state.data.finalMaterial9 == 'H23') {
                var a103 = 576 + 520 + 252 + 300 + 309;
            }
            if (this.state.data.finalMaterial9 == 'Sahara/Brown') {
                var a103 = 617 + 556 + 269 + 321 + 330;
            }
            if (this.state.data.finalMaterial9 == 'Black/Multi') {
                var a103 = 645 + 582 + 282 + 336 + 346;
            }
            if (this.state.data.finalMaterial9 == 'Wood Coating') {
                var a103 = 720 + 650 + 314 + 375 + 386;
            }
            var num103 = final * a103
            var total103 = this.state.windows5 += num103
            data.singleResult = num103;
            this.setState({ data })
            // this.setState({ res103: total103 })
            this.setState({ res103: total103}, function () {
                alert(this.state.res103)
            });
            //alert(this.state.res)

        }
        else {
            alert("Previous Values Saved you can add more")
        }
        //    this.state.widthh = ''

    }
    //    calc1 = () =>
    //    {

    //        //alert(this.state.res1)
    //        this.state.FinalResult += this.state.res1;
    //        var FN = this.state.FinalResult;
    //        this.setState({FinalResult : FN})
    //        alert(this.state.FinalResult)
    //    }
    //    calc2 = () =>
    //    {

    //        //alert(this.state.res2)
    //        this.state.FinalResult += this.state.res2;
    //        var FN = this.state.FinalResult;
    //        this.setState({FinalResult : FN})
    //        alert(this.state.FinalResult)
    //    }
    //    calc3 = () =>
    //    {

    //        //alert(this.state.res3)
    //        this.state.FinalResult += this.state.res3;
    //        var FN = this.state.FinalResult;
    //        this.setState({FinalResult : FN})
    //        alert(this.state.FinalResult)
    //    }
    //    calc = () =>
    //    {

    //       // this.props.navigation.navigate('GetQoute',{result:this.state.res})
    //        //alert(this.state.res)
    //        this.state.FinalResult += this.state.res;
    //        var FN = this.state.FinalResult;
    //        this.setState({FinalResult : FN})
    //        alert(this.state.FinalResult)
    //    }
    //    calc4 = () =>
    //    {

    //        //alert(this.state.res103)
    //        this.state.FinalResult += this.state.res103;
    //        var FN = this.state.FinalResult;
    //        this.setState({FinalResult : FN})
    //        alert(this.state.FinalResult)
    //    }
    // move = () => {
    // this.props.navigation.navigate('GetQoute',{result:this.state.res})
    // }


    updateThickness = (thickness) => {
        this.setState({ thickness: thickness })
        // alert(this.state.thickness)
    }
    updateMaterial = (material) => {
        this.setState({ material: material })
    }
    updateThickness1 = (thickness1) => {
        this.setState({ thickness1: thickness1 })
        // alert(this.state.thickness)
    }
    updateMaterial1 = (material1) => {
        this.setState({ material1: material1 })
    }
    updateThickness2 = (thickness2) => {
        this.setState({ thickness2: thickness2 })
        // alert(this.state.thickness)
    }
    updateMaterial2 = (material2) => {
        this.setState({ material2: material2 })
    }
    updateThickness3 = (thickness3) => {
        this.setState({ thickness3: thickness3 })
        // alert(this.state.thickness)
    }
    updateMaterial3 = (material3) => {
        this.setState({ material3: material3 })
    }


    /////////////////////////// Double===============================>


    updateThickness02 = (thickness02) => {
        this.setState({ thickness02: thickness02 })
        // alert(this.state.thickness)
    }
    updateMaterial02 = (material02) => {
        this.setState({ material02: material02 })
    }
    updateThickness08 = (thickness08) => {
        this.setState({ thickness08: thickness08 })
        // alert(this.state.thickness)
    }
    updateMaterial08 = (material08) => {
        this.setState({ material08: material08 })
    }
    updateThickness04 = (thickness04) => {
        this.setState({ thickness04: thickness04 })
        // alert(this.state.thickness)
    }
    updateMaterial04 = (material04) => {
        this.setState({ material04: material04 })
    }
    updateThickness081 = (thickness081) => {
        this.setState({ thickness081: thickness081 })
        // alert(this.state.thickness)
    }
    updateMaterial081 = (material081) => {
        this.setState({ material081: material081 })
    }

    /////=================>Sliding================>

    updateThickness103 = (thickness103) => {
        this.setState({ thickness103: thickness103 })
        // alert(this.state.thickness)
    }
    updateMaterial103 = (material103) => {
        this.setState({ material103: material103 })
    }

    topMenuDesign() {
        let { headerValues ,data} = this.state
        var fixedcolor = this.state.fixed == true ? '#303D4C' : '#777777';
        var slidingcolor = this.state.sliding == true ? '#303D4C' : '#777777';
        var doublecolor = this.state.double == true ? '#303D4C' : '#777777';
        var D42Color = this.state.D42 == true ? '#303D4C' : '#777777';
        var D54AColor = this.state.D54A == true ? '#303D4C' : '#777777';
        var HD02 = this.state.HD02 == true ? '#303D4C' : '#777777';
        var HD04 = this.state.HD04 == true ? '#303D4C' : '#777777';
        return (
            <View>
                <View style={{ flexDirection: "row", marginLeft: Width(4), marginTop: Height(2) }}>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", }}>
                        <TouchableOpacity onPress={() => { this.setState({ fixed: true, sliding: false, double: false }) }} activeOpacity={0.7} style={{ backgroundColor: fixedcolor, padding: Width(4), width: Width(28), borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>Fixed</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginHorizontal: Width(4) }}>
                        <TouchableOpacity onPress={() => { this.setState({ sliding: true, fixed: false, double: false }) }} activeOpacity={0.7} style={{ backgroundColor: slidingcolor, padding: Width(4), width: Width(28), borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>Sliding</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginHorizontal: Width(-0.2) }}>
                        <TouchableOpacity onPress={() => { this.setState({ double: true, sliding: false, fixed: false }) }} activeOpacity={0.7} style={{ backgroundColor: doublecolor, padding: Width(4), width: Width(28), borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>Double</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center",marginHorizontal:Width(3) }}>  
      <TouchableOpacity onPress={()=> {this.props.navigation.navigate('GetQoute')}} activeOpacity={0.7} style={{backgroundColor:primaryColor,padding:Width(4),width:Width(25),borderRadius:5}}>
          <Text style={{color:"#fff",fontSize:20,textAlign:"center"}}>Qoute</Text>
      </TouchableOpacity>
      </View> */}
                </View>
                <View>
                    {this.state.fixed &&
                        <View>
                            <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Fixed Window</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: Height(1), marginHorizontal: Height(2.5) }}>
                                <View style={{ flexDirection: "row", }}>
                                    <TouchableOpacity onPress={() => { this.setState({ D42: true, D54A: false }) }} activeOpacity={0.7} style={{ backgroundColor: D42Color, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>D42</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: "row", marginHorizontal: Width(4) }}>
                                    <TouchableOpacity onPress={() => { this.setState({ D42: false, D54A: true }) }} activeOpacity={0.7} style={{ backgroundColor: D54AColor, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>D54A</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.D42 &&
                                <View>
                                    <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                        <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D42</Text>
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginTop: -30 }}>
                                                <View style={{}}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker style={{}}
                                                            // selectedValue={this.state.thickness} 
                                                            // onValueChange={this.updateThickness}
                                                            selectedValue={data.finalThickness}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness: value } })}
                                                        >
                                                            <Picker.Item label="Select thickness" value="" />
                                                            <Picker.Item label="1.2MM" value="1.2" />
                                                            <Picker.Item label="1.6MM" value="1.6" />
                                                            <Picker.Item label="2.0MM" value="2.0" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker 
                                                        // selectedValue={this.state.material} 
                                                        // onValueChange={this.updateMaterial}
                                                        selectedValue={data.finalMaterial}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalMaterial: value } })}
                                                        >
                                                            <Picker.Item label="Select material" value="" />
                                                            <Picker.Item label="Dull" value="Dull" />
                                                            <Picker.Item label="H23" value="H23" />
                                                            <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                            <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                            <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ marginTop: Height(-1) }}>
                                                <View style={{}}>
                                                    <Text style={styles.labelName}>Width(in)</Text>

                                                </View>
                                                <View style={styles.txtInputView}>
                                                    <TextInput
                                                        style={styles.txtInputStyle}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        // underlineColorAndroid="#979797"
                                                        returnKeyType="next"
                                                        // keyboardType='numeric'
                                                        placeholder="width here..."
                                                        // value={this.state.widthh}
                                                        // onChangeText={(text) => this.setState({ widthh: text })}
                                                        // onChangeText={this.handleWidth}
                                                        onChangeText={(text) => this.setState({ data: { ...data, width: text } })}
                                                        value={data.width}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
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
                                                        // value={this.state.heightt}
                                                        // onChangeText={(text) => this.setState({ heightt: text })}
                                                        // onChangeText={this.handleHeight}
                                                        onChangeText={(text) => this.setState({ data: { ...data, height: text } })}
                                                        value={data.height}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D41</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <View style={{ marginTop: -30 }}>
                                                    <View style={{}}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker style={{}}
                                                            //  selectedValue={this.state.thickness1} 
                                                            //  onValueChange={this.updateThickness1}
                                                            selectedValue={data.finalThickness2}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness2: value } })}
                                                             >
                                                                <Picker.Item label="Select thickness" value="" />
                                                                <Picker.Item label="1.2MM" value="1.2" />
                                                                {/* <Picker.Item label="2.0MM" value="2" />
                                                                <Picker.Item label="3.0MM" value="3" /> */}
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: Height(-3) }}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker 
                                                            // selectedValue={this.state.material1}
                                                            //  onValueChange={this.updateMaterial1}
                                                            selectedValue={data.finalMaterial2}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalMaterial2: value } })}
                                                             >
                                                            <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View>
                                                <View style={{ marginTop: Height(-1) }}>
                                                    <View style={{}}>
                                                        <Text style={styles.labelName}>Width(in)</Text>

                                                    </View>
                                                    <View style={styles.txtInputView}>
                                                        <TextInput
                                                            style={styles.txtInputStyle}
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            // underlineColorAndroid="#979797"
                                                            returnKeyType="next"
                                                            // keyboardType='numeric'
                                                            placeholder="width here..."
                                                            // value={this.state.widthh1}
                                                            // onChangeText={(text) => this.setState({ widthh1: text })}
                                                            // onChangeText={this.handleWidth1}
                                                            onChangeText={(text) => this.setState({ data: { ...data, width2: text } })}
                                                            value={data.width2}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
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
                                                            // value={this.state.heightt1}
                                                            // onChangeText={(text) => this.setState({ heightt1: text })}
                                                            // onChangeText={this.handleHeight1}
                                                            onChangeText={(text) => this.setState({ data: { ...data, height2: text } })}
                                                            value={data.height2}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginHorizontal: Width(15) }}>
                                            {/* <TouchableOpacity onPress={() => { this.increment(this.state.widthh, this.state.heightt,this.state.widthh1, this.state.heightt1,) }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), }}>
                                                <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                            </TouchableOpacity> */}

                                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 10 }}>
                                                <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.counter}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { this.CalcWindows() }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('WindowsEdit') }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Windows Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Back</Text>
                                            </TouchableOpacity>
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

                            }
                            {this.state.D54A &&
                                <View>
                                    <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                        <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D54A</Text>
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginTop: -30 }}>
                                                <View style={{}}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker style={{}} 
                                                        // selectedValue={this.state.thickness2} 
                                                        // onValueChange={this.updateThickness2}
                                                        selectedValue={data.finalThickness3}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalThickness3: value } })}
                                                        >
                                                            <Picker.Item label="Select thickness" value="" />
                                                            <Picker.Item label="1.2MM" value="1.2" />
                                                            <Picker.Item label="1.6MM" value="1.6" />
                                                            <Picker.Item label="2.0MM" value="2.0" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker 
                                                        // selectedValue={this.state.material2}
                                                        //  onValueChange={this.updateMaterial2}
                                                        selectedValue={data.finalMaterial3}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalMaterial3: value } })}
                                                         >
                                                            <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ marginTop: Height(-1) }}>
                                                <View style={{}}>
                                                    <Text style={styles.labelName}>Width(in)</Text>

                                                </View>
                                                <View style={styles.txtInputView}>
                                                    <TextInput
                                                        style={styles.txtInputStyle}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        // underlineColorAndroid="#979797"
                                                        returnKeyType="next"
                                                        // keyboardType='numeric'
                                                        placeholder="width here..."
                                                        // value={this.state.widthh2}
                                                        // onChangeText={(text) => this.setState({ widthh2: text })}
                                                        // onChangeText={this.handleWidth2}
                                                        onChangeText={(text) => this.setState({ data: { ...data, width3: text } })}
                                                        value={data.width3}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
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
                                                        // value={this.state.heightt2}
                                                        // onChangeText={(text) => this.setState({ heightt2: text })}
                                                        // onChangeText={this.handleHeight2}
                                                        onChangeText={(text) => this.setState({ data: { ...data, height3: text } })}
                                                        value={data.height3}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D41</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <View style={{ marginTop: -30 }}>
                                                    <View style={{}}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker style={{}} 
                                                            // selectedValue={this.state.thickness3} 
                                                            // onValueChange={this.updateThickness3}
                                                            selectedValue={data.finalThickness4}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness4: value } })}
                                                            >
                                                                <Picker.Item label="Select thickness" value="" />
                                                                <Picker.Item label="1.2MM" value="1.2" />
                                                                {/* <Picker.Item label="2.0MM" value="2" />
                                                                <Picker.Item label="3.0MM" value="3" /> */}
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: Height(-3) }}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker 
                                                            // selectedValue={this.state.material3} 
                                                            // onValueChange={this.updateMaterial3}
                                                            selectedValue={data.finalMaterial4}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalMaterial4: value } })}
                                                            >
                                                            <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View>
                                                <View style={{ marginTop: Height(-1) }}>
                                                    <View style={{}}>
                                                        <Text style={styles.labelName}>Width(in)</Text>

                                                    </View>
                                                    <View style={styles.txtInputView}>
                                                        <TextInput
                                                            style={styles.txtInputStyle}
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            // underlineColorAndroid="#979797"
                                                            returnKeyType="next"
                                                            // keyboardType='numeric'
                                                            placeholder="width here..."
                                                            // value={this.state.widthh3}
                                                            // onChangeText={(text) => this.setState({ widthh3: text })}
                                                            // onChangeText={this.handleWidth3}
                                                            onChangeText={(text) => this.setState({ data: { ...data, width4: text } })}
                                                            value={data.width4}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
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
                                                            // value={this.state.heightt3}
                                                            // onChangeText={(text) => this.setState({ heightt3: text })}
                                                            // onChangeText={this.handleHeight3}
                                                            onChangeText={(text) => this.setState({ data: { ...data, height4: text } })}
                                                            value={data.height4}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginHorizontal: Width(15) }}>
                                            {/* <TouchableOpacity onPress={() => { this.increment1(this.state.widthh2, this.state.heightt2,this.state.widthh3, this.state.heightt3,) }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), }}>
                                                <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                            </TouchableOpacity> */}

                                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 10 }}>
                                                <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.counter2}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.CalcWindows2()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('WindowsEdit') }}
                                         style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Windows Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Back</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                            }
                        </View>
                    }
                    {this.state.sliding &&
                        <View>
                            {/* <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Sliding Window</Text>
                            </View>
                          */}
                            <View>
                                <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                    <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate Sliding Window</Text>
                                </View>
                                <View>
                                    <View>
                                        <View style={{ marginTop: -30 }}>
                                            <View style={{}}>
                                                <View>
                                                    <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                </View>
                                                <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                    <Picker style={{}} 
                                                     selectedValue={data.finalThickness9}
                                                     //onValueChange={this.updateMaterial103}
                                                     onValueChange={(value) => this.setState({ data: { ...data, finalThickness9: value } })}
                                                    // selectedValue={this.state.thickness103} onValueChange={this.updateThickness103}
                                                    >
                                                        <Picker.Item label="Select thickness" value="" />
                                                        <Picker.Item label="1.2MM" value="1.2" />
                                                        <Picker.Item label="1.6MM" value="1.6" />
                                                        <Picker.Item label="2.0MM" value="2.0" />
                                                    </Picker>
                                                    {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
                                                <View>
                                                    <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                </View>
                                                <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                    <Picker
                                                     selectedValue={data.finalMaterial9}
                                                     //onValueChange={this.updateMaterial103}
                                                     onValueChange={(value) => this.setState({ data: { ...data, finalMaterial9: value } })}
                                                    //  selectedValue={this.state.material103} onValueChange={this.updateMaterial103}

                                                     >
                                                    <Picker.Item label="Select material" value="" />
                                                            <Picker.Item label="Dull" value="Dull" />
                                                            <Picker.Item label="H23" value="H23" />
                                                            <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                            <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                            <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                    </Picker>
                                                    {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{ marginTop: Height(-1) }}>
                                            <View style={{}}>
                                                <Text style={styles.labelName}>Width(in)</Text>

                                            </View>
                                            <View style={styles.txtInputView}>
                                                <TextInput
                                                    style={styles.txtInputStyle}
                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                    // underlineColorAndroid="#979797"
                                                    returnKeyType="next"
                                                    // keyboardType='numeric'
                                                    placeholder="width here..."
                                                    // value={this.state.widthh}
                                                    // onChangeText={(text) => this.setState({ widthh: text })}
                                                    // onChangeText={this.handleWidth103}
                                                    onChangeText={(text) => this.setState({ data: { ...data, width9: text } })}
                                                    value={data.width9}
                                                    placeholderTextColor='#c6c6c6' />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: Height(-3) }}>
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
                                                    // value={this.state.heightt}
                                                    // onChangeText={(text) => this.setState({ heightt: text })}
                                                    // onChangeText={this.handleHeight103}
                                                    onChangeText={(text) => this.setState({ data: { ...data, height9: text } })}
                                                    value={data.height9}
                                                    placeholderTextColor='#c6c6c6' />
                                            </View>
                                        </View>
                                    </View>
                                </View>


                                <View>

                                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginHorizontal: Width(15) }}>
                                        {/* <TouchableOpacity onPress={() => { this.increment103(this.state.width103, this.state.height103) }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), }}>
                                                <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                            </TouchableOpacity> */}

                                        <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 10 }}>
                                            <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.counter103}</Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => { this.CalcWindows5() }}
                                            style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('WindowsEdit') }}
                                            style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Windows Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => {
                                            this.final()
                                        }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Back</Text>
                                        </TouchableOpacity>
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
                    }
                    {this.state.double &&
                        <View>
                            <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Double Window</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: Height(1), marginHorizontal: Height(2.5) }}>
                                <View style={{ flexDirection: "row", }}>
                                    <TouchableOpacity onPress={() => { this.setState({ HD02: true, HD04: false }) }} activeOpacity={0.7} style={{ backgroundColor: HD02, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>HD02</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: "row", marginHorizontal: Width(4) }}>
                                    <TouchableOpacity onPress={() => { this.setState({ HD02: false, HD04: true }) }} activeOpacity={0.7} style={{ backgroundColor: HD04, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>HD04</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.HD02 &&
                                <View>
                                    <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                        <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate HD02</Text>
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginTop: -30 }}>
                                                <View style={{}}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker style={{}} 
                                                        // selectedValue={this.state.thickness02} onValueChange={this.updateThickness02}
                                                        selectedValue={data.finalThickness5}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalThickness5: value } })}
                                                        >
                                                            <Picker.Item label="Select thickness" value="" />
                                                            <Picker.Item label="1.6MM" value="1.6" />
                                                            {/* <Picker.Item label="2.0MM" value="2" /> */}
                                                            {/* <Picker.Item label="3.0MM" value="3" /> */}
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker 
                                                        // selectedValue={this.state.material02} 
                                                        // onValueChange={this.updateMaterial02}
                                                        selectedValue={data.finalMaterial5}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalMaterial5: value } })}
                                                        >
                                                             <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ marginTop: Height(-1) }}>
                                                <View style={{}}>
                                                    <Text style={styles.labelName}>Width(in)</Text>

                                                </View>
                                                <View style={styles.txtInputView}>
                                                    <TextInput
                                                        style={styles.txtInputStyle}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        // underlineColorAndroid="#979797"
                                                        returnKeyType="next"
                                                        // keyboardType='numeric'
                                                        placeholder="width here..."
                                                        // value={this.state.widthh}
                                                        // onChangeText={(text) => this.setState({ widthh: text })}
                                                        // onChangeText={this.handleWidth02}
                                                        onChangeText={(text) => this.setState({ data: { ...data, width5: text } })}
                                                        value={data.width5}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
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
                                                        // value={this.state.heightt}
                                                        // onChangeText={(text) => this.setState({ heightt: text })}
                                                        // onChangeText={this.handleHeight02}
                                                        onChangeText={(text) => this.setState({ data: { ...data, height5: text } })}
                                                        value={data.height5}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate HD08</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <View style={{ marginTop: -30 }}>
                                                    <View style={{}}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker style={{}} 
                                                            // selectedValue={this.state.thickness08} onValueChange={this.updateThickness08}
                                                            selectedValue={data.finalThickness6}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness6: value } })}
                                                            >
                                                                <Picker.Item label="Select thickness" value="" />
                                                                <Picker.Item label="1.2MM" value="1.2" />
                                                                {/* <Picker.Item label="2.0MM" value="2" />
                                                                <Picker.Item label="3.0MM" value="3" /> */}
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: Height(-3) }}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker 
                                                            // selectedValue={this.state.material08} onValueChange={this.updateMaterial08}
                                                            selectedValue={data.finalMaterial6}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalMaterial6: value } })}
                                                            >
                                                            <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />

                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View>
                                                <View style={{ marginTop: Height(-1) }}>
                                                    <View style={{}}>
                                                        <Text style={styles.labelName}>Width(in)</Text>

                                                    </View>
                                                    <View style={styles.txtInputView}>
                                                        <TextInput
                                                            style={styles.txtInputStyle}
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            // underlineColorAndroid="#979797"
                                                            returnKeyType="next"
                                                            // keyboardType='numeric'
                                                            placeholder="width here..."
                                                            // value={this.state.widthh1}
                                                            // onChangeText={(text) => this.setState({ widthh1: text })}
                                                            // onChangeText={this.handleWidth08}
                                                            onChangeText={(text) => this.setState({ data: { ...data, width6: text } })}
                                                            value={data.width6}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
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
                                                            // value={this.state.heightt1}
                                                            // onChangeText={(text) => this.setState({ heightt1: text })}
                                                            // onChangeText={this.handleHeight08}
                                                            onChangeText={(text) => this.setState({ data: { ...data, height6: text } })}
                                                            value={data.height6}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginHorizontal: Width(15) }}>
                                            {/* <TouchableOpacity onPress={() => { this.increment2(this.state.widthh02, this.state.heightt02,this.state.widthh08, this.state.heightt08,) }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), }}>
                                                <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                            </TouchableOpacity> */}

                                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 10 }}>
                                                <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.counter3}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { this.CalcWindows3() }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('WindowsEdit') }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Windows Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Back</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>

                            }
                            {this.state.HD04 &&
                                <View>
                                    <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                        <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate HD04</Text>
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginTop: -30 }}>
                                                <View style={{}}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker style={{}} 
                                                        // selectedValue={this.state.thickness04} onValueChange={this.updateThickness04}
                                                        selectedValue={data.finalThickness7}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalThickness7: value } })}
                                                        >
                                                            <Picker.Item label="Select thickness" value="" />
                                                            <Picker.Item label="1.6MM" value="1.6" />
                                                            <Picker.Item label="2.0MM" value="2.0" />
                                                            {/* <Picker.Item label="3.0MM" value="3" /> */}
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
                                                    <View>
                                                        <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                        <Picker 
                                                        // selectedValue={this.state.material04} onValueChange={this.updateMaterial04}
                                                        selectedValue={data.finalMaterial7}
                                                        //onValueChange={this.updateMaterial103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalMaterial7: value } })}
                                                        >
                                                            <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                        </Picker>
                                                        {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={{ marginTop: Height(-1) }}>
                                                <View style={{}}>
                                                    <Text style={styles.labelName}>Width(in)</Text>

                                                </View>
                                                <View style={styles.txtInputView}>
                                                    <TextInput
                                                        style={styles.txtInputStyle}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        // underlineColorAndroid="#979797"
                                                        returnKeyType="next"
                                                        // keyboardType='numeric'
                                                        placeholder="width here..."
                                                        // value={this.state.widthh2}
                                                        // onChangeText={(text) => this.setState({ widthh2: text })}
                                                        // onChangeText={this.handleWidth04}
                                                        onChangeText={(text) => this.setState({ data: { ...data, width7: text } })}
                                                        value={data.width7}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
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
                                                        // value={this.state.heightt2}
                                                        // onChangeText={(text) => this.setState({ heightt2: text })}
                                                        // onChangeText={this.handleHeight04}
                                                        onChangeText={(text) => this.setState({ data: { ...data, height7: text } })}
                                                        value={data.height7}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate HD08</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <View style={{ marginTop: -30 }}>
                                                    <View style={{}}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Thickness:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker style={{}} 
                                                            // selectedValue={this.state.thickness081} onValueChange={this.updateThickness081}
                                                            selectedValue={data.finalThickness8}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness8: value } })}
                                                            >
                                                                <Picker.Item label="Select thickness" value="" />
                                                                <Picker.Item label="1.2MM" value="1.2" />
                                                                {/* <Picker.Item label="2.0MM" value="2" />
                                                                <Picker.Item label="3.0MM" value="3" /> */}
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.thickness}</Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: Height(-3) }}>
                                                        <View>
                                                            <Text style={{ ...mediumTextFont, fontSize: 15, top: 45, left: 10 }}>Material:</Text>
                                                        </View>
                                                        <View style={{ marginHorizontal: Width(20), marginTop: 5, borderColor: secondryColor, borderWidth: 1, left: 30 }}>
                                                            <Picker 
                                                            // selectedValue={this.state.material081} onValueChange={this.updateMaterial081}
                                                            selectedValue={data.finalMaterial8}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalMaterial8: value } })}
                                                            >
                                                                <Picker.Item label="Select material" value="" />
                                                                <Picker.Item label="Dull" value="Dull" />
                                                                <Picker.Item label="H23" value="H23" />
                                                                <Picker.Item label="Sahara/Brown" value="Sahara/Brown" />
                                                                <Picker.Item label="Black/Multi" value="Black/Multi" />
                                                                <Picker.Item label="Wood Coating" value="Wood Coating" />
                                                            </Picker>
                                                            {/* <Text style={styles.text}>{this.state.material}</Text> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View>
                                                <View style={{ marginTop: Height(-1) }}>
                                                    <View style={{}}>
                                                        <Text style={styles.labelName}>Width(in)</Text>

                                                    </View>
                                                    <View style={styles.txtInputView}>
                                                        <TextInput
                                                            style={styles.txtInputStyle}
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            // underlineColorAndroid="#979797"
                                                            returnKeyType="next"
                                                            // keyboardType='numeric'
                                                            placeholder="width here..."
                                                            // value={this.state.widthh3}
                                                            // onChangeText={(text) => this.setState({ widthh3: text })}
                                                            // onChangeText={this.handleWidth081}
                                                            onChangeText={(text) => this.setState({ data: { ...data, width8: text } })}
                                                            value={data.width8}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
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
                                                            // value={this.state.heightt3}
                                                            // onChangeText={(text) => this.setState({ heightt3: text })}
                                                            // onChangeText={this.handleHeight081}
                                                            onChangeText={(text) => this.setState({ data: { ...data, height8: text } })}
                                                            value={data.height8}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginHorizontal: Width(15) }}>
                                            {/* <TouchableOpacity onPress={() => { this.increment3(this.state.widthh04, this.state.heightt04,this.state.widthh081, this.state.heightt081,) }} style={{ backgroundColor: primaryColor, borderRadius: 5, width: Width(10), }}>
                                                <Text style={{ color: "#fff", fontSize: 25, textAlign: "center", top: -2 }}>+</Text>
                                            </TouchableOpacity> */}

                                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: primaryColor, borderRadius: 5, width: Width(10), height: Height(5), left: 10 }}>
                                                <Text style={{ color: primaryColor, fontSize: 15, textAlign: "center", top: 5 }}>{this.state.counter4}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.CalcWindows4()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('WindowsEdit')
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Windows Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Back</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                            }
                        </View>
                    }
                </View>
            </View>
        )
    }
    render() {
        const { language, theme } = this.props
        let { isLoading, challengeDetail } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <StatusBar backgroundColor={primaryColor} />
                <MyHeader title="Windows" navigation={this.props.navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>

                        {this.topMenuDesign()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    backgroungImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: ScreenWidth,
        height: ScreenHeight
    },
    labelName: {
        ...mediumTextFont, color: primaryColor, fontSize: 16, marginLeft: Width(3), top: 36
    },
    txtInputView: {
        flexDirection: 'row',
        backgroundColor: "#fff",
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
        textAlignVertical: 'top'
    },

});
export default connect(ReducersProps, null)(Home)