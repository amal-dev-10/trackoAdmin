import { Dimensions, Linking, ToastAndroid } from 'react-native';
import { iconColor, primaryColor } from '../styles/colors';
import store from '../redux/store';
import { setRouteNameAction } from '../redux/actions';

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

export const fomatFirstLetterCapital = (sentence: string)=>{
    let words: string[] = sentence.split(" ");
    let result: string = "";
    words.forEach((w)=>{
        let formatedWord: string = w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase();
        if(!result){
            result = formatedWord;
        }else{
            result = result + " " + formatedWord
        }
    });
    return result
}

export const setRoute = (routeName: string)=>{
    let st = store;
    st.dispatch(setRouteNameAction(routeName));
}

export const calculateDaysBetweenDates = (startDate: Date, endDate: Date): number => {
    startDate.setHours(0,0,0,0);
    endDate.setHours(23, 59, 59, 999);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.round(daysDifference);
}

export const getHourGap = (milliseconds: number)=>{
    let notified: number = milliseconds;
    let now: number = new Date().getTime();
    let hours = (now - notified) / (1000 * 60 * 60);
    return Math.floor(hours)
}

export const formatTime = (durationInHours: number)=> {
    if (durationInHours < 1) {
      return `${Math.round(durationInHours * 60)} mins`;
    } else if (durationInHours < 24) {
      return `${Math.round(durationInHours)} hrs`;
    } else if (durationInHours < 24 * 30) {
      return `${Math.round(durationInHours / 24)} days`;
    } else {
      return `${Math.round(durationInHours / (24 * 30))} months`;
    }
  }