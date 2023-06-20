import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, shadowGenerator, valueBinder } from '../../utils/helper'
import { borderColor, cardColor, iconColor, secondaryColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { inputProps } from '../../interfaces/common'
import { KeyboardType } from 'react-native'

const Login = () => {
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
      editable: true,
      id: 0
    }
  ] as inputProps[]);
  const [allInputsValid, setAllInputsValid] = useState(false as boolean)

  const validation = ()=>{
    let temp = inputList;
    inputList.forEach((inputs)=>{
      if(!inputs.value || inputs.value.length < 10){
        temp[inputs.id].valid = false;
        temp[inputs.id].msg = "Enter a valid phone number"
      }else{
        temp[inputs.id].valid = true;
        temp[inputs.id].msg = ""
      }
    });
    setInputList([...temp]);
  }

  useEffect(()=>{
    let t: boolean = inputList.every((x)=>{return x.valid});
    setAllInputsValid(t);
  }, [inputList]);

  return (
    <SafeAreaView style={[container, styles.loginView]}>
      <View style={styles.brandHeader}>
        <Text style={styles.logo}>TRACKO</Text>
      </View>
      <View style={styles.loginTexts}>
        <View>
          <Text style={styles.firstPara}>
            Welcome to<Text style={styles.brand}> TRACKO! </Text>
          </Text>
          <Text  style={styles.firstPara}>The Ultimate subscription Manager</Text>
        </View>
        <Text style={styles.secondPara}>
          Manage your subscriptions, data of your
          clients of your organization.
        </Text>
      </View>
      <View style={[styles.loginCard, shadowGenerator(0, 3)]}>
        <View style={styles.loginTextView}>
          <Text style={styles.loginText}>Login</Text>
          <Text  style={styles.secondPara}>Please sign in using your credentials</Text>
        </View>
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
        <View style={styles.buttonView}>
          <Button
            text='GET OTP'
            onTouch={()=>{}}
            width='50%'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  loginView:{
    display: "flex",
    flexDirection: "column",
  },
  loginCard:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 35,
    backgroundColor: cardColor,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 25,
    paddingBottom: 25
  },
  firstPara:{
    color: textColorSecondary,
    fontSize: fontSize.large
  },
  secondPara:{
    color: iconColor,
    fontSize: fontSize.small
  },
  brand:{
    fontWeight: "700"
  },
  loginTexts:{
    display: 'flex',
    justifyContent: "flex-start",
    flex: 1,
    gap: 10,
    padding: 20
  },
  brandHeader:{
    width: "100%",
    padding: 20
  },
  logo:{
    fontSize: fontSize.large,
    fontWeight: "800",
    color: textColorPrimary
  },
  loginText:{
    fontSize: fontSize.xLarge,
    color: textColorSecondary
  },
  loginTextView:{
    display: "flex",
    gap: 10
  },
  buttonView:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})