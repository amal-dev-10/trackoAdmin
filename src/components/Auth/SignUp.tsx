import {StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { container, valueBinder } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { iconColor, textColorSecondary } from '../../styles/colors'
import Button from '../Common/Button'
import { inputProps } from '../../interfaces/common'
import Input from '../Common/Input'
import { KeyboardType } from 'react-native'
import TitleComponent from '../Common/TitleComponent'

const SignUp = () => {
  const [inputList, setInputList] = useState(
    [
      {
        value: "",
        msg: "",
        placeHolder: "Phone Number",
        keyBoardType: 'phone-pad',
        icon: 'cellphone',
        valid: false,
        name: "phoneNumber",
        focus: true,
        id: 0,
        editable: false
      },
      {
        value: "",
        msg: "",
        placeHolder: "Name",
        keyBoardType: 'default',
        icon: 'signature-freehand',
        valid: false,
        name: "name",
        focus: false,
        id: 1,
        editable: true
      }
    ] as inputProps[]);

    const validation = ()=>{
      
    }
  return (
    <View style={[container, styles.signUpScreen]}>
      <TitleComponent
        title='Sign up'
        subTitle='Please enter your details to register'
      />
      <View style={styles.inputViews}>
      {
          inputList. map((data)=>{
            return (
              <Input
                placeHolder={data.placeHolder}
                onInput={(id: number, e: string)=>{
                  let temp = valueBinder(inputList, id, e) as inputProps[]; 
                  setInputList([...temp]);
                  validation();
                }}
                keyBoardType={data.keyBoardType as KeyboardType}
                icon={data.icon}
                valid={data.valid}
                msg={data.msg}
                id={data.id}
                key={data.id}
                value={data.value}
                focus={data.focus}
                editable={data.editable}
              />
            )
          })
        }
      </View>
      <View style={styles.buttonView}>
        <Button
          onTouch={()=>{}}
          text='VERIFY'
          width='50%'
          key={0}
        />
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  signUpScreen:{
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 30,
    padding: 20
  },
  buttonView:{
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
    width: "100%"
  },
  inputViews:{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  }
})