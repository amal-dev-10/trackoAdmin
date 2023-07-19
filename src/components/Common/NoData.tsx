import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconSet from '../../styles/icons/Icons'
import { borderColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'

type props = {
    onTouch?: any,
    buttons?: string[],
    text: string,
    fetchFailed: boolean,
    data: any
}

const NoData = (props: props) => {
    const [title, setTitle] = useState("" as string);
    const [msg, setMsg] = useState("" as string);
    const [buttonList, setButtonList] = useState([] as string[]);
    const [noDataFound, setNoDataFound] = useState(undefined as boolean | undefined);
    function checkNoData(data: any): boolean {
        if (Array.isArray(data)) {
            if(data.length === 0){return true}else{return false};
        } else if (typeof data === 'object' && data !== null) {
            if(Object.entries(data).length === 0){return true}else{return false};
        } else {
            if(Object.entries(data).length === 0){return true}else{return false};
        }
    }


    useEffect(()=>{
        if(props.fetchFailed === true){
            setMsg("Failed to fetch data from server. Please try again later.");
            setTitle("FAILED !");
            setButtonList([]);
        }else{
            let noData: boolean = checkNoData(props.data);
            setNoDataFound(noData);
            if(noData){
                setMsg(props.text);
                setTitle("MESSAGE !");
                props?.buttons ? 
                setButtonList(props.buttons) : setButtonList([])
            }
        }
    }, [props]);
    
  return (
    (noDataFound === true || props.fetchFailed === true) ?
    <View style={styles.noDataView}>
        <Text style={styles.noDataLogo}>{title}</Text> 
        <Text style={styles.noDataText}>{msg}</Text>
        <View style={styles.buttonRow}>
            {
                (buttonList && buttonList?.length) ? 
                    buttonList.map((d, i:number)=>{
                        return (
                            <TouchableOpacity 
                                onPress={()=>{props.onTouch(d)}} 
                                style={styles.button}
                                key={"button"+i}
                            >
                                <Text style={styles.buttonText}>{d.toUpperCase()}</Text>
                            </TouchableOpacity>
                        )
                    })
                : <></>
            }
        </View>
    </View> : <></>
  )
}

export default NoData

const styles = StyleSheet.create({
    noDataView:{
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        width: "100%",
        paddingTop: 50
    },
    button:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: borderColor,
        padding: 10,
        paddingHorizontal: 20
    },
    buttonText:{
        fontSize: fontSize.small,
        color: borderColor
    },
    noDataText:{
        width: "90%",
        textAlign: "center",
        color: borderColor,
        fontSize: fontSize.small
    },
    buttonRow:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        justifyContent: "center"
    },
    noDataLogo:{
        fontSize: fontSize.medium,
        fontWeight: "600",
        color: "gray"
    }
})