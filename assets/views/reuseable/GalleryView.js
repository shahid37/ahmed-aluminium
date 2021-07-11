import React, { Component } from 'react'
import { Text, View, PermissionsAndroid, Platform, ScrollView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'
// import MyHeader from './MyHeader'
import { primaryColor, textFont } from '../../utils/Style'
import FIcons from 'react-native-vector-icons/Feather'
import Button from '../reuseable/Button'
// import Videoplayer from "../reuseable/video/player"
import Utils from '../../utils/Utils'
import Prefmanager from '../../data/local/Prefmanager'

const SINGLE_SELECTION = "single", MULTI_SELECTION = "multi"
const PHOTOS_ONLY = "Photos", PHOTOS_VIDEOS = "All"
const IMAGE_TYPE = "image/jpeg", VIDEO_TYPE = "video/mp4"

const MAX_SELECTION_COUNT = 10
const DEF_PP_COUNT = 20
const colWidth = ((Dimensions.get("screen").width / 5) - 15)
const myUtils = new Utils()
const prefs = new Prefmanager()

class GalleryView extends Component {

    constructor(props) {
        super()
        this.state = {
            albums: [{ loadAll: true, title: "All" }],
            photos: [],
            selectedAlbumIndex: 0,
            selectedPhotoIndex: 0,
            hasMoreImages: false,
            lastLoaded: DEF_PP_COUNT,

            selectedMediaFiles: props.route.params?.selectedMediaFiles ?? [],
            assetsType: props.route.params?.assetsType ?? PHOTOS_ONLY,
            selectionMode: props.route.params?.selectionMode ?? SINGLE_SELECTION,
            maxCount: props.route.params?.maxCount ?? MAX_SELECTION_COUNT
        }
    }

    componentDidMount() {
        prefs.loadSelectedMedias((mediaFiles) => {
            if (mediaFiles) {
                this.setState({ selectedMediaFiles: mediaFiles })
            }
        })
        this.loadData()
    }

    renderHeaderView() {
        let { photos, selectedMediaFiles } = this.state
        let selectedIndx = selectedMediaFiles.length > 0 ? (selectedMediaFiles.length - 1) : 0
        if (photos.length > 0) {
            let selectedFile = selectedMediaFiles.length > 0 ? selectedMediaFiles[selectedIndx].filePath : photos[selectedIndx].node.image.uri
            let selectedFileType = selectedMediaFiles.length > 0 ? selectedMediaFiles[selectedIndx].type : photos[selectedIndx].node.type
            let isVideoFile = selectedFileType == VIDEO_TYPE
            return (
                <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
                    {isVideoFile &&
                        <View style={{ height: 250 }}>
                            <Videoplayer video={selectedFile} height={250} />
                        </View>
                    }
                    {!isVideoFile &&
                        <Image
                            style={{ height: 250, width: "100%", borderRadius: 7 }}
                            source={{ uri: selectedFile }}
                        />
                    }
                </View>
            )
        }
    }

    handleOnSelect(item, index) {
        let { selectedMediaFiles, selectionMode, maxCount } = this.state
        let sIndx = selectedMediaFiles.findIndex(i => (
            i.filePath == item.node.image.uri
        ))

        if (sIndx > -1) {
            selectedMediaFiles.splice(sIndx, 1)
        } else {
            if (selectedMediaFiles.length == 1 && selectionMode == SINGLE_SELECTION) {
                selectedMediaFiles = []
            }
            if (selectedMediaFiles.length < maxCount) {
                let mediaFile = {
                    type: item.node.type,
                    filePath: item.node.image.uri
                }
                selectedMediaFiles.push(mediaFile)
            }
        }
        this.setState({ selectedMediaFiles })
    }

    renderItemView(item, index) {
        let { selectedMediaFiles, selectionMode } = this.state
        let sIndx = selectedMediaFiles.findIndex(i => (
            i.filePath == item.node.image.uri
        ))
        let isSelected = (sIndx > -1)
        return (
            <TouchableOpacity
                onPress={() => this.handleOnSelect(item, index)}
            >
                <View style={{ margin: 5, }}>
                    <Image
                        style={{ borderRadius: 7, width: colWidth, height: colWidth }}
                        source={{ uri: item.node.image.uri }}
                    />
                    {myUtils.isVideoType(item.node.type) &&
                        <View style={{
                            position: "absolute", backgroundColor: "rgba(0,0,0,0.4)",
                            right: 5, bottom: 5, borderRadius: 100, padding: 5,
                            justifyContent: "center", alignItems: "center",
                        }}>
                            <FIcons name={"play"} size={18} color={"#fff"} />
                        </View>
                    }
                    {(isSelected) &&
                        <View style={{
                            position: "absolute", flex: 1, backgroundColor: "rgba(0,0,0,0.4)",
                            left: 0, right: 0, top: 0, bottom: 0, borderRadius: 7,
                            justifyContent: "center", alignItems: "center",
                        }}>
                            <FIcons name={selectionMode == MULTI_SELECTION ? "check" : "camera"} size={24} color={"#fff"} />
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { theme, language } = this.props
        let { albums, photos, selectedAlbumIndex, selectedMediaFiles, maxCount, selectionMode } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                {/* <MyHeader navigation={this.props.navigation} title={"Gallery"} /> */}
                <View style={{ flex: 1, padding: 10 }}>
                    <View>
                        <ScrollView horizontal>
                            {albums.map((album, indx) => {
                                return (
                                    <TouchableOpacity key={indx}
                                        style={{
                                            paddingHorizontal: 10,
                                            borderBottomColor: (indx == selectedAlbumIndex) ? primaryColor : null,
                                            borderBottomWidth: (indx == selectedAlbumIndex) ? 1 : 0
                                        }}
                                        onPress={() => this.handleOnAlbumSelect(indx)}
                                    >
                                        <Text style={{
                                            ...textFont, fontSize: 15,
                                            color: (indx == selectedAlbumIndex) ? theme.text : theme.secondaryText,
                                        }}>
                                            {album.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <FlatList
                        style={{ flex: 1, marginVertical: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        data={photos}
                        ListHeaderComponent={this.renderHeaderView()}
                        // stickyHeaderIndices={[0]}
                        renderItem={({ item, index }) => this.renderItemView(item, index)}
                        numColumns={5}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => this.handleOnLoadMore()}
                    />

                </View>

                <View style={{
                    position: "absolute", left: 0, bottom: 0, right: 0,
                    alignItems: "center", marginBottom: 40
                }}>
                    <Button
                        label={`Apply ${(selectionMode == MULTI_SELECTION) ? `${selectedMediaFiles.length}/${maxCount}` : ""}`}
                        onPress={() => { this.handleOnApply() }}
                        bgStyle={{ fontSize: 14, padding: 0, width: 180 }}
                        isFocused={true}
                    />
                </View>
            </View>
        )
    }

    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    async loadData() {
        if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
            return;
        }
        let { assetsType } = this.state
        CameraRoll.getAlbums({ assetType: assetsType })
            .then((albums) => {
                // console.log(JSON.stringify(albums))
                this.setState({ albums: this.state.albums.concat(albums) })
                this.handleOnAlbumSelect(0)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    handleOnAlbumSelect(albumIndex) {
        let { albums, assetsType } = this.state
        this.setState({ selectedAlbumIndex: albumIndex, selectedPhotoIndex: 0 })
        let album = albums[albumIndex]
        let albumProps = {
            first: DEF_PP_COUNT,
            assetType: assetsType,
        }
        if (!album.loadAll) {
            albumProps = {
                first: DEF_PP_COUNT,
                assetType: assetsType,
                groupTypes: "Album",
                groupName: album.title
            }
        }
        CameraRoll.getPhotos(albumProps)
            .then(r => {
                this.setState({
                    photos: r.edges,
                    hasMoreImages: r.page_info.has_next_page
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    handleOnLoadMore() {
        let { albums, photos, hasMoreImages, lastLoaded, selectedAlbumIndex, assetsType } = this.state
        if (hasMoreImages) {
            let album = albums[selectedAlbumIndex]
            let albumProps = {
                first: DEF_PP_COUNT,
                assetType: assetsType,
            }
            if (!album.loadAll) {
                albumProps = {
                    first: DEF_PP_COUNT,
                    assetType: assetsType,
                    groupTypes: "Album",
                    groupName: album.title
                }
            }
            albumProps.after = lastLoaded ? lastLoaded.toString() : null
            CameraRoll.getPhotos(albumProps)
                .then(r => {
                    this.setState({
                        photos: photos.concat(r.edges),
                        hasMoreImages: r.page_info.has_next_page,
                        lastLoaded: r.page_info.end_cursor
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    handleOnApply() {
        let { selectedMediaFiles, selectionMode } = this.state
        // let picPath = photos[selectedPhotoIndex].node.image.uri
        if (selectedMediaFiles.length > 0) {
            try {
                if (selectionMode == SINGLE_SELECTION) {
                    this.props.route.params.onSelected(selectedMediaFiles[0].filePath)
                } else {
                    this.props.route.params.onSelected(selectedMediaFiles)
                }
                this.props.navigation.goBack()
            } catch (ex) {

            }
        }
    }

}

export default connect(ReducersProps, null)(GalleryView)