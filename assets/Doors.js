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
import { getDataDoor, setDataDoor, getDataDoor2, setDataDoor2 } from "../views/Utills"
const webHandler = new WebHandler()
const myUtils = new MyUtils()
const prefs = new Prefmanager()
const CHALLENGE_LIMIT = 20


class Home extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
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


            ///=========================================>
            data: {
                widthd: 0, heightd: 0, width2d: 0, height2d: 0, finalThicknessd: "", finalMateriald: "",
                finalThickness2d: "", finalMaterial2d: "", singleResultd: 0,
                width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "",
                finalMaterial3: "", finalThickness4: "", finalMaterial4: "",
                width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "",
                finalThickness6: "", finalMaterial6: "", width7: 0, height7: 0, finalMaterial7: "",
                finalThickness7: ""
            },
            //saveIndex:props.route.params ? props.route.params : -1,
            saveIndexx: -1,
            ///=========================================>
            ///=========================================>
            //  data2:{width3:0,height3:0,width4:0,height4:0,finalThickness3:"",finalMaterial3:"",finalThickness4:"",finalMaterial4:"", singleResult : 0,},
            //  //saveIndex:props.route.params ? props.route.params : -1,
            //   saveIndexx2 :-1,
            ///=========================================>
            thickness103: '',
            material103: '',
            width103: 0,
            height103: 0,
            counter103: 0,
            res103: 0,
            doorstore: 0
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
    CalcDoor() {
        const { data, saveIndexx, finalThickness, finalMaterial } = this.state;
        if (saveIndexx != -1) {
            getDataDoor((record) => {
                record[saveIndexx] = data
                setDataDoor(record, () => { this.setState({ saveIndexx: -1, data: { ...data, widthd: 0, heightd: 0, width2d: 0, height2d: 0, finalThicknessd: "", finalMateriald: "", finalThickness2d: "", finalMaterial2d: "", singleResultd: "" } }) }, () => { })
            })
        } else {
            getDataDoor((record) => {
                record.push(data)
                setDataDoor(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, widthd: 0, heightd: 0, width2d: 0, height2d: 0, finalThicknessd: "", finalMateriald: "", finalThickness2d: "", finalMaterial2d: "", singleResultd: "" } })
                }, () => { });
            })
        }
        this.calc()
    }
    CalcDoor2() {
        const { data, saveIndexx } = this.state;
        if (saveIndexx != -1) {
            getDataDoor((record) => {
                record[saveIndexx] = data
                setDataDoor(record, () => { this.setState({ saveIndexx: -1, data: { ...data, width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "", singleResult: "" } }) }, () => { })
            })
        } else {
            getDataDoor((record) => {
                record.push(data)
                setDataDoor(record, () => {
                    this.setState({ saveIndexx: -1, data: { ...data, width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "", singleResult: "" } })
                }, () => { });
            })
        }
        this.calc1()
    }
    CalcDoor3() {
        const { data, saveIndexx } = this.state;
        if (saveIndexx != -1) {
            getDataDoor((record) => {
                record[saveIndexx] = data
                setDataDoor(record, () => {
                    this.setState({
                        saveIndexx: -1, data: {
                            ...data, width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "", singleResult: "",
                            width7: 0, height7: 0, finalThickness7: "", finalMaterial7: "",
                        }
                    })
                }, () => { })
            })
        } else {
            getDataDoor((record) => {
                record.push(data)
                setDataDoor(record, () => {
                    this.setState({
                        saveIndexx: -1, data: {
                            ...data, width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "", singleResult: "",
                            width7: 0, height7: 0, finalThickness7: "", finalMaterial7: "",
                        }
                    })
                }, () => { });
            })
        }
        this.calc2()
    }
    calc = () => {
        const { data } = this.state;
        this.setState({ counter: this.state.counter + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num1 = parseFloat((this.state.data.widthd) / 12);
        var num2 = parseFloat((this.state.data.heightd) / 12);
        var num4 = parseFloat((this.state.data.width2d) / 12);
        var num5 = parseFloat((this.state.data.height2d) / 12);
        //alert(num1)
        if (this.state.data.finalThicknessd == 1.2) {
            if (this.state.data.finalMateriald == 'Dull') {
                var a = 134;
            }
            if (this.state.data.finalMateriald == 'H23') {
                var a = 136;
            }
            if (this.state.data.finalMateriald == 'Sahara/Brown') {
                var a = 146;
            }
            if (this.state.data.finalMateriald == 'Black/Multi') {
                var a = 153;
            }
            if (this.state.data.finalMateriald == 'Wood Coating') {
                var a = 171;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.doorstore += num3
            data.singleResultd = num3;
            this.setState({ data })
            //this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            // this.setState({ res: total })

            //alert(this.state.res)

        }
        if (this.state.data.finalThicknessd == 1.6) {
            if (this.state.data.finalMateriald == 'Dull') {
                var a = 174;
            }
            if (this.state.data.finalMateriald == 'H23') {
                var a = 177;
            }
            if (this.state.data.finalMateriald == 'Sahara/Brown') {
                var a = 189;
            }
            if (this.state.data.finalMateriald == 'Black/Multi') {
                var a = 198;
            }
            if (this.state.data.finalMateriald == 'Wood Coating') {
                var a = 221;
            }

            var num3 = (num1 + num2) * a
            var total = this.state.doorstore += num3
            data.singleResultd = num3;
            this.setState({ data })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThicknessd == 2.0) {
            if (this.state.data.finalMateriald == 'Dull') {
                var a = 213;
            }
            if (this.state.data.finalMateriald == 'H23') {
                var a = 216;
            }
            if (this.state.data.finalMateriald == 'Sahara/Brown') {
                var a = 232;
            }
            if (this.state.data.finalMateriald == 'Black/Multi') {
                var a = 242;
            }
            if (this.state.data.finalMateriald == 'Wood Coating') {
                var a = 271;
            }
            var num3 = (num1 + num2) * a
            var total = this.state.doorstore += num3
            data.singleResultd = num3;
            this.setState({ data })
            this.setState({ res: total }, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        //D50A
        if (this.state.data.finalThickness2d == 'Normal') {
            if (this.state.data.finalMaterial2d == 'Dull') {
                var b = 201;
            }
            if (this.state.data.finalMaterial2d == 'H23') {
                var b = 204;
            }
            if (this.state.data.finalMaterial2d == 'Sahara/Brown') {
                var b = 218;
            }
            if (this.state.data.finalMaterial2d == 'Black/Multi') {
                var b = 229;
            }
            if (this.state.data.finalMaterial2d == 'Wood Coating') {
                var b = 255;
            }
            var num7 = (num4 + num5) * b
            var total = this.state.doorstore += num7
            data.singleResultd = num7;
            this.setState({ data })
            // this.setState({ res: total })
            this.setState({ res: total}, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness2d == 1.6) {
            if (this.state.data.finalMaterial2d == 'Dull') {
                var b = 268;
            }
            if (this.state.data.finalMaterial2d == 'H23') {
                var b = 273;
            }
            if (this.state.data.finalMaterial2d == 'Sahara/Brown') {
                var b = 292;
            }
            if (this.state.data.finalMaterial2d == 'Black/Multi') {
                var b = 306;
            }
            if (this.state.data.finalMaterial2d == 'Wood Coating') {
                var b = 341;
            }
            var num7 = (num4 + num5) * b
            var total = this.state.doorstore += num7
            data.singleResultd = num7;
            this.setState({ data })
            this.setState({ res: total }, function () {
                alert(this.state.res)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness2d == 2.0) {
            if (this.state.data.finalMaterial2d == 'Dull') {
                var b = 329;
            }
            if (this.state.data.finalMaterial2d == 'H23') {
                var b = 335;
            }
            if (this.state.data.finalMaterial2d == 'Sahara/Brown') {
                var b = 358;
            }
            if (this.state.data.finalMaterial2d == 'Black/Multi') {
                var b = 375;
            }
            if (this.state.data.finalMaterial2d == 'Wood Coating') {
                var b = 419;
            }
            var num7 = (num4 + num5) * b
            var total = this.state.doorstore += num7
            data.singleResultd = num7;
            this.setState({ data })
            this.setState({ res: total }, function () {
                alert(this.state.res)
            });


        }
        else {
            // alert("Previous Values Saved you can add more ")
        }
        //    this.state.widthh = ''

    }

    calc1() {
        const { data } = this.state;
        this.setState({ counter2: this.state.counter2 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num8 = parseFloat((this.state.data.width3) / 12);
        var num9 = parseFloat((this.state.data.height3) / 12);
        var num10 = parseFloat((this.state.data.width4) / 12);
        var num11 = parseFloat((this.state.data.height4) / 12);
        //D54A
        if (this.state.data.finalThickness3 == 'Normal') {
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
            var num12 = (num8 + num9) * a
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            // alert(this.state.res1)
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });

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
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            // alert(this.state.res1)
            this.setState({ res1: total1 }, function () {
                alert(this.state.res1)
            });

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
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            // alert(this.state.res1)
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });

        }
        //D50A
        if (this.state.data.finalThickness4 == 1.2) {
            if (this.state.data.finalMaterial4 == 'Dull') {
                var b = 201;
            }
            if (this.state.data.finalMaterial4 == 'H23') {
                var b = 204;
            }
            if (this.state.data.finalMaterial4 == 'Sahara/Brown') {
                var b = 218;
            }
            if (this.state.data.finalMaterial4 == 'Black/Multi') {
                var b = 229;
            }
            if (this.state.data.finalMaterial4 == 'Wood Coating') {
                var b = 255;
            }
            var num12 = (num10 + num11) * b
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            //alert(this.state.res)
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });

        }
        if (this.state.data.finalThickness4 == 1.6) {
            if (this.state.data.finalMaterial4 == 'Dull') {
                var b = 268;
            }
            if (this.state.data.finalMaterial4 == 'H23') {
                var b = 273;
            }
            if (this.state.data.finalMaterial4 == 'Sahara/Brown') {
                var b = 292;
            }
            if (this.state.data.finalMaterial4 == 'Black/Multi') {
                var b = 306;
            }
            if (this.state.data.finalMaterial4 == 'Wood Coating') {
                var b = 341;
            }
            var num12 = (num10 + num11) * b
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness4 == 2.0) {
            if (this.state.data.finalMaterial4 == 'Dull') {
                var b = 329;
            }
            if (this.state.data.finalMaterial4 == 'H23') {
                var b = 335;
            }
            if (this.state.data.finalMaterial4 == 'Sahara/Brown') {
                var b = 358;
            }
            if (this.state.data.finalMaterial4 == 'Black/Multi') {
                var b = 375;
            }
            if (this.state.data.finalMaterial4 == 'Wood Coating') {
                var b = 419;
            }
            var num12 = (num10 + num11) * b
            var total1 = this.state.doorstore += num12
            data.singleResult = num12;
            this.setState({ data })
            // this.setState({ res1: total1 })
            //alert(this.state.res)
            this.setState({ res1: total1}, function () {
                alert(this.state.res1)
            });

        }
        // else {
        //     alert("Previous Values Saved you can add more")
        // }
        //    this.state.widthh = ''

    }

    calc2 = () => {
        const { data } = this.state;
        this.setState({ counter2: this.state.counter2 + 1 })
        // let total = this.state.widthh + this.state.heightt;
        var num82 = parseFloat((this.state.data.width5) / 12);
        var num92 = parseFloat((this.state.data.height5) / 12);
        var num108 = parseFloat((this.state.data.width6) / 12);
        var num118 = parseFloat((this.state.data.height6) / 12);
        var num821 = parseFloat((this.state.data.width7) / 12);
        var num921 = parseFloat((this.state.data.height7) / 12);


        if (this.state.data.finalThickness5 == 1.2) {
            if (this.state.data.finalMaterial5 == 'Dull') {
                var a2 = 246;
                //alert(a2)
            }
            if (this.state.data.finalMaterial5 == 'H23') {
                var a2 = 250;
            }
            if (this.state.data.finalMaterial5 == 'Sahara/Brown') {
                var a2 = 268;
            }
            if (this.state.data.finalMaterial5 == 'Black/Multi') {
                var a2 = 280;
            }
            if (this.state.data.finalMaterial5 == 'Wood Coating') {
                var a2 = 313;
            }

            var num122 = (num82 + num92) * a2
            console.log("asdasddsadsa", num122)
            var total2 = this.state.doorstore += num122
            data.singleResult = num122;
            this.setState({ data })
            //this.setState({ res2: total2 })
            this.setState({ res2: total2 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness5 == 1.6) {
            if (this.state.data.finalMaterial5 == 'Dull') {
                var a2 = 319;
            }
            if (this.state.data.finalMaterial5 == 'H23') {
                var a2 = 324;
            }
            if (this.state.data.finalMaterial5 == 'Sahara/Brown') {
                var a2 = 347;
            }
            if (this.state.data.finalMaterial5 == 'Black/Multi') {
                var a2 = 363;
            }
            if (this.state.data.finalMaterial5 == 'Wood Coating') {
                var a2 = 405;
            }
            var num122 = (num82 + num92) * a2;
            var total2 = this.state.doorstore += num122
            data.singleResult = num122;
            this.setState({ data })
            //this.setState({ res2: total2 })
            this.setState({ res2: total2 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness5 == 2.0) {
            if (this.state.data.finalMaterial5 == 'Dull') {
                var a2 = 390;
            }
            if (this.state.data.finalMaterial5 == 'H23') {
                var a2 = 397;
            }
            if (this.state.data.finalMaterial5 == 'Sahara/Brown') {
                var a2 = 425;
            }
            if (this.state.data.finalMaterial5 == 'Black/Multi') {
                var a2 = 444;
            }
            if (this.state.data.finalMaterial5 == 'Wood Coating') {
                var a2 = 496;
            }
            var num122 = (num82 + num92) * a2
            var total2 = this.state.doorstore += num122
            data.singleResult = num122;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness6 == 1.2) {
            if (this.state.data.finalMaterial6 == 'Dull') {
                var b2 = 177;
            }
            if (this.state.data.finalMaterial6 == 'H23') {
                var b2 = 180;
            }
            if (this.state.data.finalMaterial6 == 'Sahara/Brown') {
                var b2 = 192;
            }
            if (this.state.data.finalMaterial6 == 'Black/Multi') {
                var b2 = 201;
            }
            if (this.state.data.finalMaterial6 == 'Wood Coating') {
                var b2 = 224;
            }
            var num128 = (num108 + num118) * b2
            var total2 = this.state.doorstore += num128
            data.singleResult = num128;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2}, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness6 == 1.6) {
            if (this.state.data.finalMaterial6 == 'Dull') {
                var b2 = 220;
            }
            if (this.state.data.finalMaterial6 == 'H23') {
                var b2 = 224;
            }
            if (this.state.data.finalMaterial6 == 'Sahara/Brown') {
                var b2 = 239;
            }
            if (this.state.data.finalMaterial6 == 'Black/Multi') {
                var b2 = 251;
            }
            if (this.state.data.finalMaterial6 == 'Wood Coating') {
                var b2 = 280;
            }
            var num128 = (num108 + num118) * b2
            var total2 = this.state.doorstore += num128
            data.singleResult = num128;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2}, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness6 == 2.0) {
            if (this.state.data.finalMaterial6 == 'Dull') {
                var b2 = 269;
            }
            if (this.state.data.finalMaterial6 == 'H23') {
                var b2 = 274;
            }
            if (this.state.data.finalMaterial6 == 'Sahara/Brown') {
                var b2 = 293;
            }
            if (this.state.data.finalMaterial6 == 'Black/Multi') {
                var b2 = 307;
            }
            if (this.state.data.finalMaterial6 == 'Wood Coating') {
                var b2 = 342;
            }
            var num128 = (num108 + num118) * b2
            var total2 = this.state.doorstore += num128
            data.singleResult = num128;
            this.setState({ data })
            // this.setState({ res2: total2 })
            this.setState({ res2: total2 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalMaterial7 == 1.2) {
            if (this.state.data.finalMaterial7 == 'Dull') {
                var a21 = 384;
            }
            if (this.state.data.finalMaterial7 == 'H23') {
                var a21 = 390;
            }
            if (this.state.data.finalMaterial7 == 'Sahara/Brown') {
                var a21 = 417;
            }
            if (this.state.data.finalMaterial7 == 'Black/Multi') {
                var a21 = 437;
            }
            if (this.state.data.finalMaterial7 == 'Wood Coating') {
                var a21 = 487;
            }
            var num1221 = num821 + num921 + a21
            var total21 = this.state.doorstore += num1221
            data.singleResult = num1221;
            this.setState({ data })
            // this.setState({ res2: total21 })
            this.setState({ res2: total21}, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness7 == 1.6) {
            if (this.state.data.finalMaterial7 == 'Dull') {
                var a21 = 496;
            }
            if (this.state.data.finalMaterial7 == 'H23') {
                var a21 = 504;
            }
            if (this.state.data.finalMaterial7 == 'Sahara/Brown') {
                var a21 = 539;
            }
            if (this.state.data.finalMaterial7 == 'Black/Multi') {
                var a21 = 564;
            }
            if (this.state.data.finalMaterial7 == 'Wood Coating') {
                var a21 = 630;
            }
            var num1221 = num821 + num921 + a21
            var total21 = this.state.doorstore += num1221
            data.singleResult = num1221;
            this.setState({ data })
            // this.setState({ res2: total21 })
            this.setState({ res2: total21 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        if (this.state.data.finalThickness7 == 2.0) {
            if (this.state.data.finalMaterial7 == 'Dull') {
                var a21 = 607;
            }
            if (this.state.data.finalMaterial7 == 'H23') {
                var a21 = 617;
            }
            if (this.state.data.finalMaterial7 == 'Sahara/Brown') {
                var a21 = 661;
            }
            if (this.state.data.finalMaterial7 == 'Black/Multi') {
                var a21 = 691;
            }
            if (this.state.data.finalMaterial7 == 'Wood Coating') {
                var a21 = 772;
            }
            var num1221 = (num821 + num921) * a21;
            var total21 = this.state.doorstore += num1221
            data.singleResult = num1221;
            this.setState({ data })
            // this.setState({ res2: total21 })
            this.setState({ res2: total21 }, function () {
                alert(this.state.res2)
            });
            //alert(this.state.res)

        }
        else {
            alert("Previous Values Saved you can add more")
        }
        //    this.state.widthh = ''

    }



    final() {
        var aaa = (this.state.res) + (this.state.res1) + (this.state.res2) + (this.state.res103) + (this.state.res3);
        var aaaa = aaa;
        alert(aaaa)
        // AsyncStorage.setItem('doors', JSON.stringify(aaaa));
        this.props.navigation.navigate('GetQoute')
    }
    //    calc1 = () =>
    //    {
    //        // this.increment()
    //        alert(this.state.res1)
    //    }
    //    calc2 = () =>
    //    {
    //        // this.increment()
    //        alert(this.state.res2)
    //    }
    //    calc3 = () =>
    //    {
    //        // this.increment()
    //        alert(this.state.res3)
    //    }
    //    calc = () =>
    //    {
    //        // this.increment()
    //        alert(this.state.res)
    //    }
    calc4 = () => {
        // this.increment()
        alert(this.state.res103)
    }
    // move = () => {
    // this.props.navigation.navigate('GetQoute',{result:this.state.res})
    // }
    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }
    async componentDidMount() {
        // this.props._isMounted = true
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
                getDataDoor((record) => {
                    this.setState({
                        saveIndexx, data: {
                            ...data, widthd: record[saveIndexx].widthd, heightd: record[saveIndexx].heightd,
                            width2d: record[saveIndexx].width2d, height2d: record[saveIndexx].height2d,
                            finalThicknessd: record[saveIndexx].finalThicknessd,
                            finalMateriald: record[saveIndexx].finalMateriald,
                            finalThickness2d: record[saveIndexx].finalThickness2d,
                            finalMaterial2d: record[saveIndexx].finalMaterial2d,
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
                            finalThickness7: record[saveIndexx].finalThickness7,
                            finalMaterial7: record[saveIndexx].finalMaterial7,
                        }
                    })
                })
            } else {
                this.setState({
                    saveIndexx: -1, data: {
                        ...data, widthd: 0, heightd: 0, width2d: 0, height2d: 0, finalThicknessd: "", finalMateriald: "", finalThickness2d: "", finalMaterial2d: "", singleResultd: "",
                        width3: 0, height3: 0, width4: 0, height4: 0, finalThickness3: "", finalMaterial3: "", finalThickness4: "", finalMaterial4: "",
                        width5: 0, height5: 0, width6: 0, height6: 0, finalThickness5: "", finalMaterial5: "", finalThickness6: "", finalMaterial6: "",
                        width7: 0, height7: 0, finalThickness7: "", finalMaterial7: "",
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


        let doors = await AsyncStorage.getItem('doors');
        let parsedoor = JSON.parse(doors);
        this.setState({ doorstore: parsedoor })
    }
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

    Qcall() {
        AsyncStorage.removeItem('windows');
        AsyncStorage.removeItem('doors');
        AsyncStorage.removeItem('gsl');
    }
    topMenuDesign() {
        let { headerValues, data } = this.state
        var fixedcolor = this.state.fixed == true ? '#303D4C' : '#777777';
        var slidingcolor = this.state.sliding == true ? '#303D4C' : '#777777';
        var doublecolor = this.state.double == true ? '#303D4C' : '#777777';
        var D42Color = this.state.D42 == true ? '#303D4C' : '#777777';
        var D54AColor = this.state.D54A == true ? '#303D4C' : '#777777';
        var HD02 = this.state.HD02 == true ? '#303D4C' : '#777777';
        var HD04 = this.state.HD04 == true ? '#303D4C' : '#777777';
        return (
            <View style={{ marginTop: Height(2) }}>
                <View style={{ flexDirection: "row", marginLeft: Width(4) }}>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", }}>
                        <TouchableOpacity onPress={() => { this.setState({ fixed: true, sliding: false, double: false }) }} activeOpacity={0.7} style={{ backgroundColor: fixedcolor, padding: Width(4), width: Width(40), left: 15, borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Open Window</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", }}>
                        <TouchableOpacity onPress={() => { this.Qcall()}} activeOpacity={0.7} style={{ backgroundColor: fixedcolor, padding: Width(4), width: Width(40),left:15, borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Reset</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginHorizontal: Width(-0.2) }}>
                        <TouchableOpacity onPress={() => { this.setState({ double: true, sliding: false, fixed: false }) }} activeOpacity={0.7} style={{ backgroundColor: doublecolor, padding: Width(4), width: Width(40), left: 35, borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Door</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {this.state.fixed &&
                        <View>
                            <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Open Window with D54A</Text>
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
                                                            selectedValue={data.finalThicknessd}
                                                            //onValueChange={this.updateThickness103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThicknessd: value } })}
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
                                                            selectedValue={data.finalMateriald}
                                                            //onValueChange={this.updateMaterial103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalMateriald: value } })}
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
                                                    <Text style={styles.labelName}>Width:</Text>

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
                                                        onChangeText={(text) => this.setState({ data: { ...data, widthd: text } })}
                                                        value={data.widthd}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: Height(-3) }}>
                                                <View style={{}}>
                                                    <Text style={styles.labelName}>Height:</Text>

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
                                                        onChangeText={(text) => this.setState({ data: { ...data, heightd: text } })}
                                                        value={data.heightd}
                                                        placeholderTextColor='#c6c6c6' />
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D50A</Text>
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
                                                                // selectedValue={this.state.thickness1}
                                                                //  onValueChange={this.updateThickness1}
                                                                selectedValue={data.finalThickness2d}
                                                                //onValueChange={this.updateMaterial103}
                                                                onValueChange={(value) => this.setState({ data: { ...data, finalThickness2d: value } })}
                                                            >
                                                                <Picker.Item label="Select thickness" value="" />
                                                                <Picker.Item label="Nor" value="Normal" />
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
                                                                // selectedValue={this.state.material1} 
                                                                // onValueChange={this.updateMaterial1}
                                                                selectedValue={data.finalMaterial2d}
                                                                //onValueChange={this.updateMaterial103}
                                                                onValueChange={(value) => this.setState({ data: { ...data, finalMaterial2d: value } })}
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
                                                        <Text style={styles.labelName}>Width:</Text>

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
                                                            onChangeText={(text) => this.setState({ data: { ...data, width2d: text } })}
                                                            value={data.width2d}
                                                            placeholderTextColor='#c6c6c6' />
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: Height(-3) }}>
                                                    <View style={{}}>
                                                        <Text style={styles.labelName}>Height:</Text>

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
                                                            onChangeText={(text) => this.setState({ data: { ...data, height2d: text } })}
                                                            value={data.height2d}
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
                                            <TouchableOpacity onPress={() => { this.CalcDoor() }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DoorEdit') }}
                                                style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Door Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Proceed</Text>
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
                                                            selectedValue={data.finalThickness3}
                                                            //onValueChange={this.updateThickness103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness3: value } })}
                                                        >
                                                            <Picker.Item label="Select thickness" value="" />
                                                            <Picker.Item label="Nor" value="Normal" />
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
                                                            selectedValue={data.finalMaterial3}
                                                            //onValueChange={this.updateThickness103}
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
                                                    <Text style={styles.labelName}>Width:</Text>

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
                                                    <Text style={styles.labelName}>Height:</Text>

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
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D50A</Text>
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
                                                                selectedValue={data.finalThickness4}
                                                                //onValueChange={this.updateThickness103}
                                                                onValueChange={(value) => this.setState({ data: { ...data, finalThickness4: value } })}
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
                                                                selectedValue={data.finalMaterial4}
                                                                //onValueChange={this.updateThickness103}
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
                                                        <Text style={styles.labelName}>Width:</Text>

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
                                                        <Text style={styles.labelName}>Height:</Text>

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
                                                this.CalcDoor2()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('DoorEdit')
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Door Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.final()
                                            }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                                <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Proceed</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                            }
                        </View>
                    }

                    {this.state.double &&
                        <View>
                            {/* <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Door with D54A</Text>
                            </View> */}
                            {/* <View style={{ flexDirection: "row", marginTop: Height(1), marginHorizontal: Height(2.5) }}>
                                <View style={{ flexDirection: "row", }}>
                                    <TouchableOpacity onPress={() => { this.setState({ HD02: true, HD04: false }) }} activeOpacity={0.7} style={{ backgroundColor: HD02, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>D50</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: "row", marginHorizontal: Width(4) }}>
                                    <TouchableOpacity onPress={() => { this.setState({ HD02: false, HD04: true }) }} activeOpacity={0.7} style={{ backgroundColor: HD04, padding: Width(4), width: Width(43), borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>D46</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}

                            <View>
                                <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                    <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D50</Text>
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
                                                        // selectedValue={this.state.thickness02} 
                                                        // onValueChange={this.updateThickness02}
                                                        selectedValue={data.finalThickness5}
                                                        //onValueChange={this.updateThickness103}
                                                        onValueChange={(value) => this.setState({ data: { ...data, finalThickness5: value } })}
                                                    >
                                                        <Picker.Item label="Select thickness" value="" />
                                                        {/* <Picker.Item label="Normal" value="0" /> */}
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
                                                        // selectedValue={this.state.material02} 
                                                        // onValueChange={this.updateMaterial02}
                                                        selectedValue={data.finalMaterial5}
                                                        //onValueChange={this.updateThickness103}
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
                                                <Text style={styles.labelName}>Width:</Text>

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
                                                <Text style={styles.labelName}>Height:</Text>

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
                                                            // selectedValue={this.state.thickness08} 
                                                            // onValueChange={this.updateThickness08}
                                                            selectedValue={data.finalThickness6}
                                                            //onValueChange={this.updateThickness103}
                                                            onValueChange={(value) => this.setState({ data: { ...data, finalThickness6: value } })}
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
                                                            // selectedValue={this.state.material08} 
                                                            // onValueChange={this.updateMaterial08}
                                                            selectedValue={data.finalMaterial6}
                                                            //onValueChange={this.updateThickness103}
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
                                                    <Text style={styles.labelName}>Width:</Text>

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
                                                    <Text style={styles.labelName}>Height:</Text>

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
                                    <View>


                                        <View style={{ marginVertical: Height(2), marginHorizontal: Width(1.4) }}>
                                            <Text style={{ ...defaultFont, fontSize: FontSize(18), borderLeftWidth: Width(1), borderLeftColor: primaryColor, marginHorizontal: Width(2), color: "black", paddingHorizontal: Width(2.5), }}>Calculate D46</Text>
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
                                                                // selectedValue={this.state.thickness04} 
                                                                // onValueChange={this.updateThickness04}
                                                                selectedValue={data.finalThickness7}
                                                                //onValueChange={this.updateThickness103}
                                                                onValueChange={(value) => this.setState({ data: { ...data, finalThickness7: value } })}
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
                                                                // selectedValue={this.state.material04} 
                                                                // onValueChange={this.updateMaterial04}
                                                                selectedValue={data.finalMaterial7}
                                                                //onValueChange={this.updateThickness103}
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
                                                        <Text style={styles.labelName}>Width:</Text>

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
                                                        <Text style={styles.labelName}>Height:</Text>

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
                                        <TouchableOpacity onPress={() => { this.CalcDoor3() }}
                                            style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Calculate</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DoorEdit') }}
                                            style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Door Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: "center", flexDirection: "row", paddingVertical: 10 }}>
                                        <TouchableOpacity onPress={() => {
                                            this.final()
                                        }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(6), borderRadius: 5, justifyContent: "center", }}>
                                            <Text style={{ ...textFont, fontSize: 14, color: "#fff", textAlign: "center" }}>Proceed</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

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
                <MyHeader title="Doors" navigation={this.props.navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>
                        {/* {this.serachBarDesign()} */}
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