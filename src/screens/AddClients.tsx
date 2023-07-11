import { KeyboardType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiResponse, inputProps } from '../interfaces/common';
import Input from '../components/Common/Input';
import { valueBinder } from '../utils/helper';
import Button from '../components/Common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { borderColor, cardColor, iconColor, textColorSecondary } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import IconSet from '../styles/icons/Icons';
import { iClient, iMembership } from '../interfaces/iClient';
import { addNewClient } from '../services/apiCalls/serviceCalls';
import { connect } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { setAllClients } from '../redux/actions';

type props = {
  selectedBusinessId: string,
  allClients: iMembership[],
  setClientToState: any
}

const AddClients = ({selectedBusinessId, allClients, setClientToState}: props) => {
  const [allValid, setAllValid] = useState(false as boolean);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);
  const [inputList, setInputList] = useState(
    [
      {
        value: "",
        msg: "",
        placeHolder: "Client Name",
        keyBoardType: 'default',
        icon: 'signature-freehand',
        valid: false,
        name: "clientName",
        focus: false,
        id: 0,
        editable: true,
        showVerifyBtn: false
      },
      {
        value: "",
        msg: "",
        placeHolder: "Phone Number",
        keyBoardType: 'default',
        icon: 'cellphone',
        valid: false,
        name: "phoneNumber",
        focus: false,
        id: 1,
        editable: true,
        showVerifyBtn: false
      }
    ] as inputProps[]
  );

  const handleDateChange = (event: any, date:any)=>{
    setShowCalender(false)
    if (date) {
      setSelectedDate(date);
    }
  }

  const validation = ()=>{
    let updates = inputList.map((x)=>{
      switch(x.name){
        case "phoneNumber":
          (x.value && x.value.length === 10) ? x.valid = true : x.valid = false;
          break
        case "clientName":
          (x.value && x.value.length >= 4) ? x.valid = true : x.valid = false;
          break
        default:
          break
      }
      return x
    });
    let valid: boolean = updates.every((x)=>{return x.valid});
    valid ? updates[1].showVerifyBtn = true : updates[1].showVerifyBtn = false;
    setInputList([...updates]);
    setAllValid(valid);
  }

  const createNewClient = async ()=>{
    let data: iClient = {
      countryCode: "+91",
      name: inputList[0].value,
      phoneNumber: inputList[1].value,
      phoneVerified: false,
      dateOfBirth: Timestamp.fromDate(selectedDate)
    }
    let resp: apiResponse = await addNewClient(selectedBusinessId, data);
    if(resp.status === 200){
      let temp = allClients;
      temp.push(resp.data);
      setClientToState([...temp])
      let inputs = inputList.map((s)=>{s.value = ""; return s});
      setInputList([...inputs])
    }else if(resp.status === 406){

    }
    console.log(resp)
  }

  return (
    <View style={styles.addClientScreen}>
      <View style={styles.inputView}>
        {
          inputList.map((d, i: number)=>{
            return (
              <Input
                placeHolder={d.placeHolder}
                onInput={(id: number, e: string)=>{
                  let temp = valueBinder(inputList, id, e) as inputProps[]; 
                  setInputList([...temp]);
                  validation();
                }}
                keyBoardType={d.keyBoardType as KeyboardType}
                icon={d.icon}
                valid={d.valid}
                msg={d.msg}
                id={d.id}
                key={d.id}
                value={d.value}
                focus={d.focus}
                editable={d.editable}
                showVerifyBtn={d.showVerifyBtn}
              /> 
            )
          })
        }
        <View style={styles.calenderView}>
          <TouchableOpacity style={styles.dobView} onPress={()=>{setShowCalender(true)}}>
            <IconSet name='user-o' color={iconColor} size={20}/>
            <Text style={styles.dobText}>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        {
          showCalender ?
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            onTouchCancel={()=>{setShowCalender(false)}}
          /> : <></>
        }
      </View>
      <View style={styles.btnView}>
        <Button
            onTouch={()=>{createNewClient()}}
            text='ADD'
            width='35%'
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  selectedBusinessId: state.dashboard.selectedBusiness?.uid || "",
  allClients: state.client.clients
})

const mapDispatchToProps = (dispatch: any)=>({
  setClientToState: (data: iMembership[])=>dispatch(setAllClients(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddClients)

const styles = StyleSheet.create({
    addClientScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 20
    },
    inputView:{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      justifyContent: "flex-start",
      flex: 1
    },
    phoneView:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    btnView:{
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    },
    dobView:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: borderColor,
      padding: 12,
      gap: 15,
      width: "50%",
      borderRadius: 10
    },
    dobText:{
      fontSize: fontSize.small,
      color: iconColor
    },
    calenderView:{
      width: "100%",
      marginHorizontal: 5
    }
})