import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
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
} from '../utils/Style';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numColumns: 2,
      userSelected: {},
      modalVisible: false,
      data: [
        {id: 1, image: require('../images/ceilingGlass/1.jpg')},
        {id: 2, image: require('../images/ceilingGlass/2.jpg')},
        {id: 3, image: require('../images/ceilingGlass/3.jpg')},
        {id: 4, image: require('../images/ceilingGlass/4.jpg')},
        {id: 5, image: require('../images/ceilingGlass/5.jpg')},
        {id: 6, image: require('../images/ceilingGlass/6.jpg')},
        // {id: 7, image: require('../images/blueIcon.png')},
        // {id: 8, image: require('../images/blueIcon.png')},
      ],
    };
  }

  clickEventListener = (item) => {
    this.setState({userSelected: item}, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    var itemDimension = Dimensions.get('window').width / this.state.numColumns;
    return (
      <View>
        <TouchableOpacity
          style={[styles.item, {height: itemDimension}]}
          onPress={() => {
            this.clickEventListener(item);
          }}>
          <Image
            style={{height: itemDimension - 2, width: itemDimension - 2}}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({id: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <FlatList
                    data={this.formatRow(this.state.data, this.state.numColumns)}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={this.renderItem}
                    numColumns={this.state.numColumns} /> */}
        <View style={{marginVertical: Height(2), marginHorizontal: Width(1.4)}}>
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
         Ceiling Glass Design
          </Text>
        </View>

        <FlatList
          // contentContainerStyle={{ flexGrow: 1 }}
          data={this.formatRow(this.state.data, this.state.numColumns)}
          keyExtractor={(item) => {
            return item.id;
          }}
          numColumns={this.state.numColumns}
          showsVerticalScrollIndicator={false}
          // onEndReached={() => { this.handleOnLoadMore() }}

          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  borderRadius: 15,
                  flex: 0.5,
                  padding: Width(2),

                  backgroundColor: '#fff',
                  margin: Width(2),
                  // shadowColor: "#000",
                  //   shadowOffset: {
                  //     width: 0,
                  //     height: 10,
                  //   },
                  //   shadowOpacity: 0.53,
                  //   shadowRadius: 13.97,
                  //   elevation: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.clickEventListener(item);
                  }}>
                  <Image
                    style={{
                      // width: Width(43),
                      width: Width(45),
                      height: Height(25),
                      marginLeft: Width(-1.5),
                      borderRadius: 15,
                      marginVertical: Height(1),
                      padding: Width(2),
                      //   borderWidth: 1, borderColor: "#eee"
                    }}
                    source={item.image}
                  />
                </TouchableOpacity>
                <View style={{}}>
                  {/* <View style={{}}>
                <TouchableOpacity onPress={() => { this.clickEventListener(item) }} style={{ backgroundColor: primaryColor, width: Width(29), height: Height(4), borderRadius: 5, justifyContent: "center", alignSelf:"center"}}>
                  <Text style={{ ...textFont, fontSize: 13, color: "#fff", textAlign: "center" }}>Preview</Text>
                </TouchableOpacity>
             </View> */}
                </View>
              </View>
            );
          }}
        />

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                  <Image
                    style={{
                       width: "100%",
                      height: ScreenHeight,
                    //     marginTop: 30,
                    //   alignContent:"center",
                    //   alignItems:"center",
                      resizeMode: 'contain',
                    }}
                    source={this.state.userSelected.image}
                  />
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                  style={styles.btnClose}>
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },

  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    flex: 1,
    // borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    // marginTop: 20,
  },
  popupContent: {
    //alignItems: 'center',
    // margin: 5,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  popupHeader: {
    // marginBottom: 45,
  },
  popupButtons: {
    // marginTop: 15,
    // flexDirection: 'row',
    // borderTopWidth: 1,
    // borderColor: '#eee',
    // justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'black',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtClose: {
    // color: '#fff',
    // top: -7,
  },
});
