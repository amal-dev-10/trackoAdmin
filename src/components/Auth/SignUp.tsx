import {StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, valueBinder } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { iconColor, textColorSecondary } from '../../styles/colors'
import Button from '../Common/Button'
import { apiResponse, inputProps } from '../../interfaces/common'
import Input from '../Common/Input'
import { KeyboardType } from 'react-native'
import TitleComponent from '../Common/TitleComponent'
import { connect } from 'react-redux'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { navigate } from '../../navigations/NavigationService'
import { saveOwner } from '../../services/apiCalls/serviceCalls'

type props = {
  user: FirebaseAuthTypes.UserCredential,
}

const SignUp = ({user}: props) => {
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

    const [allInputTrue, setAllInputTrue] = useState(false as boolean);

    const validation = ()=>{
      let check: boolean = inputList.every((x)=>{return x.value != ""})
      setAllInputTrue(check);
    }

    const signUpClicked = async ()=>{
      if(allInputTrue){
        let data = {
          phoneNumber: user.user.phoneNumber,
          uid: user.user.uid,
          name: inputList[1].value,
          phoneVerified: true
        }
        let res: apiResponse | null = await saveOwner(data);
        if(res?.status === 200){
          navigate("MainStack")
        }else{
          //error
        }
      }
    }

    useEffect(()=>{
      let temp = inputList;
      temp[0].value = user.user.phoneNumber || "";
      setInputList([...temp])
    }, [])
  return (
    <View style={[container, styles.signUpScreen]}>
      <TitleComponent
        title='EDIT'
        subTitle='Please enter your details'
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
          onTouch={()=>{signUpClicked()}}
          text='SAVE'
          width='50%'
          key={0}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  user: state.auth.data.user || "",
});

export default connect(mapStateToProps, null)(SignUp)

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