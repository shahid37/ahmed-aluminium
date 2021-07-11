import * as React from 'react';
import {
    Text, View, StyleSheet, AsyncStorage,
    TextInput,
    Button,
    TouchableHighlight,
    Alert,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { getDataWindow } from "../views/Utills"
import { boldTextFont, Empty, fontColor, defaultFont, mediumTextFont, primaryColor, errorColor, textDefault, textFont, secondryColor } from '../utils/Style';

export default class Listing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ResTotal :0
        }
    }
    componentDidMount() {
        getDataWindow((data) => {
            this.setState({ data: data })
            console.log("DATA-====> ", this.state.data)

            var total = 0;
            this.state.data.map((item, index) => {
                total = total + item.singleResult;
                this.setState({ ResTotal: total })
            })
            console.log("ads", this.state.ResTotal)
            AsyncStorage.setItem('windows', JSON.stringify(this.state.ResTotal));
        })

    }
    render() {
        const { data } = this.state;
        // return (
        //   <View style={styles.container}>
        //   {data.map((item,index)=>{
        //      return <TouchableOpacity onPress={()=>{
        //         this.props.navigation.navigate("GSL",{saveIndex:index})
        //       }}>
        //           <Text>{item.name ? item.name : ""}</Text>
        //           <Text>{item.name2}</Text> 
        //           <Text>{index}</Text>
        //           <Text>{item.finalThickness}</Text>
        //           <Text>{item.finalMaterial}</Text>
        //       </TouchableOpacity>
        //   })}
        //   </View>
        // );
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/* <FlatList 
            enableEmptySections={true}
            style={styles.eventList}
            data={this.state.data}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => { */}

                    {/* return ( */}
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: 20, color: primaryColor, ...mediumTextFont, marginTop: 10 }}>Your List</Text>
                    </View>
                    {data.map((item, index) => {

                        return <TouchableOpacity onPress={() => this.props.navigation.navigate("Windows", { saveIndex: index })}>
                            <View style={styles.eventBox}>
                                <View style={styles.eventDate}>
                                    <Text style={styles.eventDay}>{index}</Text>
                                    {/* <Text  style={styles.eventMonth}>{item.month}</Text> */}
                                </View>
                                <View style={styles.eventContent}>
                                    <Text style={styles.eventTime}>Windows Calculator</Text>
                                     {/* {item.widthd > 0 && */}
                                     
                                    <Text style={styles.userName}>Thickness D42      {item.finalThickness}</Text>
                                    <Text style={styles.userName}>Material D42       {item.finalMaterial}</Text>
                                    <Text style={styles.userName}>Width D42          {item.width}</Text>
                                    <Text style={styles.userName}>Height D42         {item.height}</Text>
                                    <Text style={styles.userName}>Thickness D41     {item.finalThickness2}</Text>
                                    <Text style={styles.userName}>Material D41      {item.finalMaterial2}</Text>

                                    <Text style={styles.userName}>Width D41         {item.width2}</Text>
                                    <Text style={styles.userName}>Height D41        {item.height2}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20 }}>Result        {item.singleResult}</Text>

                                    <Text style={styles.userName}>Thickness D54A      {item.finalThickness3}</Text>
                                    <Text style={styles.userName}>Material D54A       {item.finalMaterial3}</Text>
                                    <Text style={styles.userName}>Width D54A          {item.width3}</Text>
                                    <Text style={styles.userName}>Height D54A         {item.height3}</Text>
                                    <Text style={styles.userName}>Thickness D41     {item.finalThickness4}</Text>
                                    <Text style={styles.userName}>Material D41      {item.finalMaterial4}</Text>
                                    <Text style={styles.userName}>Width D41         {item.width4}</Text>
                                    <Text style={styles.userName}>Height D41        {item.height4}</Text>
 
                                    <Text style={styles.userName}>Thickness HD02      {item.finalThickness5}</Text>
                                    <Text style={styles.userName}>Material HD02       {item.finalMaterial5}</Text>
                                    <Text style={styles.userName}>Width HD02          {item.width5}</Text>
                                    <Text style={styles.userName}>Height HD02         {item.height5}</Text>
                                    <Text style={styles.userName}>Thickness HD08     {item.finalThickness6}</Text>
                                    <Text style={styles.userName}>Material HD08      {item.finalMaterial6}</Text>
                                    <Text style={styles.userName}>Width HD08         {item.width6}</Text>
                                    <Text style={styles.userName}>Height HD08        {item.height6}</Text>

                                    <Text style={styles.userName}>Thickness HD04      {item.finalThickness7}</Text>
                                    <Text style={styles.userName}>Material HD04       {item.finalMaterial7}</Text>
                                    <Text style={styles.userName}>Width HD04         {item.width7}</Text>
                                    <Text style={styles.userName}>Height HD04         {item.height7}</Text>
                                    <Text style={styles.userName}>Thickness HD08     {item.finalThickness8}</Text>
                                    <Text style={styles.userName}>Material HD08      {item.finalMaterial8}</Text>
                                    <Text style={styles.userName}>Width HD08         {item.width8}</Text>
                                    <Text style={styles.userName}>Height HD08        {item.height8}</Text>
                                      
                                    <Text style={styles.userName}>Thickness Sliding     {item.finalThickness9}</Text>
                                    <Text style={styles.userName}>Material Sliding      {item.finalMaterial9}</Text>
                                    <Text style={styles.userName}>Width Sliding         {item.width9}</Text>
                                    <Text style={styles.userName}>Height Sliding        {item.height9}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20 }}>Result        {this.state.ResTotal}</Text>
                                    {/* <Text  style={styles.description}>Lorem ipsum dolor sit amet, elit consectetur</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    })}
                    {/* ) */}
                    {/* // }}/> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DCDCDC",
    },
    eventList: {
        marginTop: 20,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
        alignSelf: "center"
    },
    eventDay: {
        fontSize: 50,
        color: "#0099FF",
        fontWeight: "600",
    },
    eventMonth: {
        fontSize: 16,
        color: "#0099FF",
        fontWeight: "600",
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10
    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    eventTime: {
        fontSize: 20,
        color: primaryColor,
        alignSelf: "center"
    },
    userName: {
        fontSize: 16,
        color: "#151515",
    },
});




// import React, { Component } from 'react';
// import { View, Text, Image, StatusBar, ActivityIndicator, ImageBackground, FlatList, Modal, TextInput, ScrollView, StyleSheet, Keyboard } from 'react-native';
// // import Challenge from './Challenge'
// // import Inbox from './Inbox'
// import MyHeader from "./reuseable/MyHeader";
// import AntDesignIcons from 'react-native-vector-icons/AntDesign'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Entypo from 'react-native-vector-icons/Entypo'

// import Ionics from 'react-native-vector-icons/Ionicons'
// import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../utils/Dimensions';
// import { boldTextFont, Empty, fontColor, defaultFont, mediumTextFont, primaryColor, errorColor, textDefault, textFont } from '../utils/Style';
// import TabBar, { iconTypes } from "react-native-fluidbottomnavigation";
// import ReducersProps from '../data/local/reducers/ReducersProps'
// import { connect } from "react-redux"
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import WebHandler from "../data/remote/WebHandler";

// import Urls from '../data/remote/Urls';
// import MyUtils from '../utils/Utils';
// import Prefmanager from '../data/local/Prefmanager'
// import Video from 'react-native-video';
// import FastImage from 'react-native-fast-image';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// class CartDetail extends Component {
//     constructor(props) {
//         super(props)
//     this.state = {
//         count: 0,
//         addon3 : '',
//         price: [],
//         gsl : 0,
//         //name: props.route.params.name,
//         name : 'Edit File'

//     }
//     }
//     onPress = () => {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }
//     async componentWillMount(){
//         let gsl = await AsyncStorage.getItem('gsl');
//         let parsed2 = JSON.parse(gsl);
//         this.setState({ gsl: parsed2 });
//         alert(this.state.gsl)
//         // let addon3 = await AsyncStorage.getItem('gsl');
//         // let parsed = JSON.parse(addon3);
//         // // alert(parsed)
//         // this.setState({ addon3: parsed })
//         // var addons = this.state.addon3[this.state.addon3.length - 3]
//         // var price = this.state.addon3[this.state.addon3.length - 2]
//         // this.setState({ addon3: addons , price : price })
//         // let price3 = await AsyncStorage.getItem('price3');
//         // let parsed2 = JSON.parse(price3);
//         // this.setState({ price3: parsed2 })
//     }
//  remove()
//  {
//     //AsyncStorage.removeItem('addon3');
//     this.props.navigation.navigate('SubCatDetail')
//  }
//     render() {
//         return (
//             <View style={styles.container}>

//                 <View style={{ flexDirection: "row", marginVertical: Height(5), justifyContent: "space-between" }}>
//                     <Text style={{ fontSize: 25, ...mediumTextFont,color:"black" ,marginLeft:Width(4)}}>BASKET  ({this.state.name})</Text>
//                     <Entypo onPress={()=> this.remove()} name='cross' color={primaryColor} size={Width(10)} style={{ top: -3 }} />
//                 </View>
//                 <View style={{
//                     margin: 6,
//                     flexDirection: 'row',
//                     marginTop: Height(-4),
//                     borderColor: primaryColor,
//                     backgroundColor: 'black',
//                     borderBottomWidth: 1,
//                 }}>
//                 </View>
//                 <View style={{marginTop:Height(3),marginLeft:Width(4)}}>
//                     <Text style={{fontSize:16,...mediumTextFont,color:"black"}}>Your items</Text>
//                 </View>

//                 {/* {this.state.addon3.map((number) => */}
//                 <View style={{marginTop:Height(3),flexDirection:"row",justifyContent:"space-between",}}>
//                     <Text style={{ fontSize:16,...mediumTextFont,color:"black",marginLeft:Width(4)}}>{this.state.gsl}</Text>
//                     <Text style={{ fontSize:16, ...mediumTextFont,color:"black",marginHorizontal:Width(4)}}>{this.state.price}</Text>
//                 </View>
// {/* )} */}



//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,

//         backgroundColor: "#fff"
//     },
//     button: {
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         // padding: 10,
//         // marginBottom: 10
//     }
// })

// export default CartDetail;