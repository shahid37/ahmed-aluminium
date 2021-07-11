//import firestore from '@react-native-firebase/firestore';
const MAX_MSGS_LOAD_COUNT = 20
const chatsCollection = firestore().collection('Chats');
export default class FSDBHandler {

    constructor() {

    }

    addNewMessageToChat(chatId, message, onCompleted) {
        console.log("====chatMessage====", message)
        chatsCollection.doc(chatId).get().then((doc) => {
            if (!doc.exists) {
                chatsCollection.doc(chatId).set({
                    "createdAt": firestore.Timestamp.now()
                })
            }
        })

        chatsCollection.doc(chatId).collection("messages")
            .add({
                "messageData": JSON.stringify(message),
                "createdAt": firestore.Timestamp.now()
            })
            .then(() => { onCompleted && onCompleted() })
            .catch((error) => console.log(error))
    }

    loadChatMessages(chatId, lastLoadedDoc, onLoaded) {
        var query = chatsCollection.doc(chatId).collection("messages")
            .orderBy("createdAt", "desc")
        if (lastLoadedDoc) {
            query = query.startAfter(lastLoadedDoc)
        }
        query = query.limit(MAX_MSGS_LOAD_COUNT)

        query.get().then((docSnap) => {
            let chatMessages = [], lastVisDoc = null
            if (docSnap && docSnap.docs.length > 0) {
                lastVisDoc = docSnap.docs[docSnap.docs.length - 1]
                docSnap.forEach((doc) => {
                    const msgDataStr = doc.get("messageData")
                    if (msgDataStr && msgDataStr != "") {
                        let messageData = JSON.parse(msgDataStr)
                        messageData.docId = doc.id
                        // messageData.pending = false
                        // messageData.resend = false
                        // messageData.sent = true
                        chatMessages.push(messageData)
                    }
                })
            }
            if (chatMessages.length < MAX_MSGS_LOAD_COUNT) {
                onLoaded(chatMessages, lastVisDoc, false)
            } else {
                this.isMoreDataExist(chatId, lastVisDoc, (isMoreExist) => {
                    onLoaded(chatMessages, lastVisDoc, isMoreExist)
                })
            }
        }).catch((error) => {
            console.log(error)
            onLoaded([], null, false)
        })
    }

    async isMoreDataExist(chatId, lastVisDoc, onLoaded) {
        let moreData = await chatsCollection.doc(chatId).collection("messages")
            .orderBy("createdAt", "desc")
            .startAfter(lastVisDoc)
            .limit(1).get()
        onLoaded((moreData && moreData.size >= 1))
    }

    startChatListener(chatId, onNewMessage) {
        let loadCount = 0
        this.stopChatListenerRef = chatsCollection.doc(chatId).collection("messages")
            .orderBy("createdAt", "desc")
            .limit(MAX_MSGS_LOAD_COUNT)
            .onSnapshot((docSnap) => {
                if (docSnap) {
                    loadCount++
                    docSnap.docChanges().forEach(docData => {
                        // if (docData.type === "added" ) {
                        // }
                        const msgDataStr = docData.doc.get("messageData")
                        if (msgDataStr && msgDataStr != "") {
                            let messageData = JSON.parse(msgDataStr)
                            messageData.docId = docData.doc.id
                            if (loadCount > 1) {
                                onNewMessage(messageData)
                            }
                        }
                    })
                }
            })
    }

    stopChatListener() {
        if (this.stopChatListenerRef) {
            this.stopChatListenerRef()
        }
    }

    addVoteToPollMessage(chatId, messageId, data) {
        let modData = objectWithoutProperties(data, ["docId"])
        chatsCollection.doc(chatId).collection("messages")
            .doc(messageId).update({ "messageData": JSON.stringify(modData) })
    }
}

const objectWithoutProperties = (obj, keys) => {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}