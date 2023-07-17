import { StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { container, shadowGenerator, valueBinder } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { cardColor, iconColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import Button from '../Common/Button'
import TitleComponent from '../Common/TitleComponent'
import { verfyOtpCode } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type optInputInterface = {
  value: string,
  id: number,
  error: boolean
}

type props = {
  verifyOtp: any,
  confirmation: FirebaseAuthTypes.ConfirmationResult,
}

const Otp = ({verifyOtp, confirmation}: props) => {
  const [inputList, setInputList] = useState([] as optInputInterface[]);
  const [timer, setTimer] = useState(5 as number);
  let interval: number;
  const textInputRefs = useRef<Array<TextInput | null>>([]);
  const otpLength: number = 6;

  const verifyOtpClicked = async ()=>{
    let validation: boolean = inputList.every((x)=>{return x.value.length > 0});
    if(validation){
      let code: string = ""
      inputList.forEach((x)=>{
        code = code + x.value
      });
      await verifyOtp(code, confirmation);
      clearInterval(interval)
      //send otp
    }else{
     makeError(true);
    }
  };

  const resendOtp = ()=>{

  }

  const makeError = (er: boolean)=>{
    let temp = inputList;
    temp.map((x)=>{
      x.error = er
      return
    });
    setInputList([...temp]);
  }

  useEffect(()=>{
    let temp = [];
    for(let i=0; i<otpLength; i++){
      let t = {
        id: i,
        value: "",
        error: false
      }
      temp.push(t);
    };
    setInputList([...temp]);
    textInputRefs.current[0]?.focus();
    let t = timer;
    interval = setInterval(()=>{
      setTimer(t);
      if(t === 0){
        clearInterval(interval);
      }else{
        t--;
      }
    }, 1000);
  }, []);

  return (
    <View style={[container, styles.otpScreen]}>
      <TitleComponent
        title='One-Time Password'
        subTitle='Enter the One-time password received to your phone number'
      />
      <View style={styles.main}>
        <View style={styles.optInputView}>
          {
            inputList.map((input, i:number)=>{
              return(
                <View style={[styles.otpInput, shadowGenerator(2, 2), input.error ? styles.borderRed : {}]} key={i}>
                  <TextInput  
                    style={styles.realInput} 
                    cursorColor={cardColor} 
                    keyboardType='number-pad'
                    value={input.value}
                    ref={(r)=>{
                      textInputRefs.current[input.id] = r
                    }}
                    onKeyPress={(ev)=>{
                      const { nativeEvent: { key: keyValue } } = ev;
                      if(keyValue != "Backspace" && keyValue != "Enter"){
                        makeError(false);
                        let temp = valueBinder(inputList, input.id, keyValue) as optInputInterface[]
                        setInputList([...temp]);
                        textInputRefs.current[input.id + 1]?.focus();
                      }else if(keyValue != "Enter"){     
                        if(!input.value.length){
                          textInputRefs.current[input.id - 1]?.focus();
                          let temp = valueBinder(inputList, input.id-1, "") as optInputInterface[]
                          setInputList([...temp]);
                        }else{
                          let temp = valueBinder(inputList, input.id, "") as optInputInterface[]
                          setInputList([...temp]);
                        }
                      }
                    }}
                    maxLength={1}
                  />
                </View>
              )
            })
          }
        </View>
        <View style={styles.resendView}>
          <Text style={styles.resendPara}>Didn’t receive OTP? </Text>
          {
            timer === 0 ?
            <TouchableOpacity onPress={()=>{resendOtp()}} activeOpacity={0.7}>
              <Text style={styles.resendBtn}>Resend</Text>
            </TouchableOpacity> : <Text style={{color: textColorPrimary}}>{"00:" + `${timer < 10 ? "0" : ""}${timer}`}</Text>
          }
        </View>
      </View>
      <View style={styles.buttonView}>
        <Button
          onTouch={()=>{verifyOtpClicked()}}
          text='VERIFY'
          width='50%'
          key={0}
        />
      </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  verifyOtp: async (code: string, confirm: FirebaseAuthTypes.ConfirmationResult)=>{await dispatch(verfyOtpCode(code, confirm))}
})

const mapStateToProps = (state: any)=>({
  confirmation: state.auth.data.confirmation,
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)

const styles = StyleSheet.create({
  otpScreen:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 50,
    padding: 20
  },
  main:{
    display: "flex",
    flexDirection: "column",
    gap: 30,
    justifyContent: "flex-start"
  },
  optInputView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10
  },
  otpInput:{
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cardColor,
    borderRadius: 15,
    height: Dimensions.get("window").width / 8,
    width: Dimensions.get("window").width / 8
  },
  realInput:{
    padding: 0,
    textAlign: "center",
    fontSize: fontSize.large
  },
  buttonView:{
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30
  },
  resendView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  resendPara:{
    fontSize: fontSize.small
  },
  resendBtn:{
    color: textColorPrimary
  },
  borderRed:{
    borderWidth: 2,
    borderColor: "crimson"
  }
})