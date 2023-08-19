import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { borderColor, iconColor, textColorPrimary } from '../../styles/colors'
import Button from './Button'
import { showToast } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'

type props = {
    checkOTPClicked: any
}

const PhoneCodeInput = ({checkOTPClicked}: props) => {
    const [value, setValue] = useState("" as string);
    const checkClicked = ()=>{
        if(value){
            checkOTPClicked(value);
        }else{
            showToast("Enter OTP to verify.")
        }
    }
  return (
    <View style={styles.otpInput}>
      <TextInput
        onChangeText={(e: string)=>{setValue(e)}}
        placeholder='OTP'
        placeholderTextColor={borderColor}
        cursorColor={borderColor}
        keyboardType={"number-pad"}
        value={value}
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={(()=>{checkClicked()})} activeOpacity={0.7}>
        <Text style={{color: textColorPrimary, fontSize: fontSize.small}}>Check</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhoneCodeInput

const styles = StyleSheet.create({
    otpInput:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 10,
        borderBottomWidth: 2,
        borderColor: borderColor,
        // padding: 5
        paddingHorizontal: 10
    },
    input:{
        flex: 1
    },
    btn:{
        paddingVertical: 5,
        paddingHorizontal: 10
    }
})