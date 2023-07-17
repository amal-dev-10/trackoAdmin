import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, shadowGenerator, valueBinder } from '../../utils/helper'
import { borderColor, cardColor, iconColor, secondaryColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { inputProps } from '../../interfaces/common'
import { KeyboardType } from 'react-native'
import { connect } from 'react-redux'
import { signInWithPhoneNumber } from '../../redux/actions/authActions'
import { Svg, Path, Defs, G } from 'react-native-svg';

type props = {
  signInWithPhoneNumber: any
}

const Login = ({signInWithPhoneNumber}: props) => {
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

  const sendOtpClicked = ()=>{
    if(allInputsValid){
      signInWithPhoneNumber(inputList[0].value)
    }
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
      <View style={[styles.loginCard]}>
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
            onTouch={()=>{sendOtpClicked()}}
            width='50%'
          />
        </View>
      </View>
      <Svg
        width={Dimensions.get("window").width}
        height={400}
        viewBox={`0 0 ${Dimensions.get("window").width} 400`}
        fill="none"
        // {...props}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <G filter="url(#filter0_d_39_460)">
          <Path
            d="M149 53.968C97.4-13.93 29.5 62.238 2 108.81V447h408V67.026c-72.8-29.249-161.333-20.892-196.5-13.058-38.4 12.187-59 5.078-64.5 0z"
            fill="#2C2C2C"
          />
          <Path
            d="M149 53.968C97.4-13.93 29.5 62.238 2 108.81V447h408V67.026c-72.8-29.249-161.333-20.892-196.5-13.058-38.4 12.187-59 5.078-64.5 0z"
            stroke="#444"
          />
        </G>
        <Defs></Defs>
      </Svg>
    </SafeAreaView>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  signInWithPhoneNumber: (phoneNumber: string) => dispatch(signInWithPhoneNumber(phoneNumber)),
});

export default connect(null, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  loginView:{
    display: "flex",
    flexDirection: "column",
  },
  loginCard:{
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 35,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 25,
    paddingBottom: 25,
    bottom: 0,
    zIndex: 99
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