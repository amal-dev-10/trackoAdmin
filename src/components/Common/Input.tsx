import { KeyboardType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { borderColor, iconColor, inputFocusColor, secondaryColor, textColorPrimary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import { shadowGenerator } from '../../utils/helper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionic from 'react-native-vector-icons/Ionicons';


type inputProps = {
    placeHolder: string,
    onInput: Function,
    keyBoardType: KeyboardType,
    icon: string,
    valid: boolean,
    msg: string,
    id: number,
    value: string,
    focus: boolean,
    editable: boolean,
    showVerifyBtn?: boolean,
    verifyBtnClicked?: any
}

const Input = ({placeHolder, onInput, keyBoardType, icon, valid, msg, id, value, focus, editable, showVerifyBtn, verifyBtnClicked}:inputProps) => {
    const [f, setF] = useState(focus  as boolean);
    const [placeText, setPlaceText] = useState(placeHolder as string);
    const [showValid, setShowValid] = useState(false as boolean);
    const [edit, setEdit] = useState(editable as boolean)
    const input = useRef<TouchableOpacity>(null);
    const textInput = useRef<TextInput>(null);
    const [v, setV] = useState(valid as boolean);

    useEffect(()=>{
        setPlaceText(placeHolder);
        setV(valid);
        setEdit(editable);
    }, [placeHolder, valid, editable]);

    useEffect(()=>{
        if(f){
            input.current?.focus();
        }else if(!value){
            // setShowValid(false);
        }
    }, [f])
  return (
    <TouchableOpacity style={[styles.inputView, f ? [styles.focused, shadowGenerator(2, 2)] : styles.unFocused]} ref={input} onPress={()=>{textInput.current?.focus();}}>
        {
            (f || value) ?
            <Text style={styles.focusedText}>{f || value ? placeText : ""}</Text> : <></>
        }
        <View style={styles.inputMainView}>
            <Icon name={icon} size={25} color={iconColor}/>
            <TextInput 
                placeholder={!f ? placeText : ""} 
                onChangeText={(e: string)=>{onInput(id, e); setShowValid(true)}}
                onFocus={(e)=>{setF(true);}}
                onBlur={()=>{setF(false);}}
                style={styles.input}
                placeholderTextColor={iconColor}
                cursorColor={borderColor}
                keyboardType={keyBoardType}
                value={value}
                editable={edit}
                ref={textInput}
            />
            {
                showValid ?
                    v  ?
                        <Ionic name={"md-checkmark-outline"} size={25} color={secondaryColor}/>
                    : <Ionic name={"close"} size={25} color={"crimson"}/> 
                : <></>
            }
            {
                (showVerifyBtn && v) ? 
                    <TouchableOpacity style={styles.verifyBtn} onPress={()=>{verifyBtnClicked()}}>
                        <Text style={styles.verifyText}>Verify</Text>
                    </TouchableOpacity>
                : <></>
            }
        </View>
        {
            (!v && msg) ? 
                <Text style={styles.msg}>{"* " + msg}</Text>
            : <></>
        }
    </TouchableOpacity>
  )
}

export default Input

const styles = StyleSheet.create({
    inputView:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        width: "100%",
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        padding: 10
    },
    focused:{
        backgroundColor: inputFocusColor,
        // padding: 10,
    },
    unFocused:{
        borderBottomWidth: 2,
        borderBottomColor: borderColor
    },
    focusedText:{
        fontSize: fontSize.xSmall,
        marginLeft: 30,
        color: iconColor
    },
    input:{
        flex: 1,
        padding: 0
    },
    inputMainView:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    msg:{
        position: "absolute",
        bottom: -20,
        right: 0,
        color: "crimson",
        fontSize: fontSize.xSmall
    },
    verifyBtn:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    verifyText:{
        color: textColorPrimary,
        fontSize: fontSize.small,
        fontWeight: "500"
    }
})