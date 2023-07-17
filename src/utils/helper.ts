import { Dimensions, Linking, ToastAndroid } from 'react-native';
import { iconColor, primaryColor } from '../styles/colors';

export const container = {
    flex: 1,
    backgroundColor: primaryColor,
}

export const shadowGenerator = (x: number = 0, y: number = 0, color: string= "#000000")=>{
    let shadow = {
        shadowColor: color,
        shadowOffset: {width: x, height: y},
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 4,
    };
    return shadow
}

export const getResponsiveFontSize = (fontSize: number) => {
    const screenWidth = Dimensions.get('window').width;
    const referenceScreenWidth = 375; // Reference screen width for font size calculation

    const scaleFactor = screenWidth / referenceScreenWidth;
    const responsiveFontSize = Math.round(fontSize * scaleFactor);

    return responsiveFontSize;
};

export const toCamelCase = (str: string): string => {
    return str.replace(/[-_ ](.)/g, (_, char) => char.toUpperCase());
}

export const valueBinder = (list: any, id: number, value: string)=>{
    let temp = list;
    let index: number = temp.findIndex((x: any)=>{return x.id === id})
    if(index > -1){
      temp[index].value = value
    };
    return temp
}

export const wordSplitter = (text: string)=>{
    return text.split(' ').join("\n")
}

// calculating height
const TAB_BAR_HEIGHT_RATIO = 0.07; // 7%
export const windowHeight = Dimensions.get('window').height;
export const tabBarHeight = windowHeight * TAB_BAR_HEIGHT_RATIO;


export const showToast = (msg: string)=>{
    ToastAndroid.showWithGravity(
        msg, 
        ToastAndroid.SHORT, 
        ToastAndroid.CENTER,
    );
}

export const makeCall = async (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
    // await Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (!supported) {
    //       console.log("Phone call not supported");
    //     } else {
    //       Linking.openURL(url);
    //     }
    //   })
    //   .catch(error => console.log("Error:", error));
};

export const openWhatsapp = async (phoneNumber: string) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
    // await Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (!supported) {
    //       console.log("Phone call not supported");
    //     } else {
    //       Linking.openURL(url);
    //     }
    //   })
    //   .catch(error => console.log("Error:", error));
};