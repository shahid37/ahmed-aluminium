import { StyleSheet } from 'react-native';
import AppConfig from './AppConfig';

const primaryColor = AppConfig.primaryColor
const secondryColor = AppConfig.secondryColor
const primaryColorLite=AppConfig.primaryColorLite
const fontColor=AppConfig.fontColor
const errorColor=AppConfig.errorColor


const defaultFont = AppConfig.regularFonts
const mediumFont = AppConfig.mediumFonts
const boldFont = AppConfig.boldFonts

const textFont = { fontFamily: defaultFont }
const mediumTextFont = { fontFamily: mediumFont }
const boldTextFont = { fontFamily: boldFont }

const textDefault = {
    color: secondryColor
}
const Headingstyle = StyleSheet.create({
    h2: {
        ...mediumTextFont,
        fontSize: 24
    },
})
const Buttonstyle = StyleSheet.create({
    buttonContainer: {
        backgroundColor: secondryColor,
        paddingVertical: 15,
        paddingLeft: 10,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        paddingLeft: 10,
        fontFamily: defaultFont
    },
})
const outLineBtn = StyleSheet.create({
    buttonContainer: {
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 30,
        alignItems: "center",
        marginVertical: 10,
        justifyContent: 'center'
    },
    buttonText: {
        ...mediumTextFont,
    },
})
const Empty = StyleSheet.create({
    coverfill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: 'white'
    },

    cover: {
        flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center'
    },
    image: {
        height: 250,
        width: 250
    },
    text: {
        ...textDefault
    }
})
const formDefault = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        marginBottom: 10,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 0,
        color: '#000',
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    inputLoc: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    icon: {
        position: 'relative',
        top: -2.883,
        paddingBottom: 3,
        paddingRight: 10,
        right: -4
    },
    inputsection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bottomset: {
        position: "absolute", left: 0, right: 0, bottom: 10, paddingRight: 0, paddingLeft: 30, backgroundColor: '#FEFEFE'
    },
})
export {
    Buttonstyle, Empty, textFont, formDefault, outLineBtn, primaryColor, secondryColor, defaultFont, textDefault, Headingstyle,
    mediumTextFont, boldTextFont,primaryColorLite,fontColor,errorColor
}
