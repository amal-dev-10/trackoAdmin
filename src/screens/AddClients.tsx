import { KeyboardType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiResponse, inputProps } from '../interfaces/common';
import Input from '../components/Common/Input';
import { showToast, valueBinder } from '../utils/helper';
import Button from '../components/Common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { borderColor, iconColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import IconSet from '../styles/icons/Icons';
import { iClient, iMembership } from '../interfaces/iClient';
import { addNewClient, sendVerificationCode, updateClient, verifyOTPCode } from '../services/apiCalls/serviceCalls';
import { connect } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { closeOverlayComponent, setAllClients, updateClientAction } from '../redux/actions';
import PhoneCodeInput from '../components/Common/PhoneCodeInput';

type props = {
  selectedBusinessId: string,
  allClients: iMembership[],
  setClientToState: any,
  mode: string,
  selectedClient: iMembership,
  updateClientDetail: any,
  closeOverlay: any
}

const AddClients = ({selectedBusinessId, allClients, setClientToState, mode, selectedClient, updateClientDetail, closeOverlay}: props) => {
  const [allValid, setAllValid] = useState(false as boolean);
  const [selectedDate, setSelectedDate] = useState("" as any);
  const [showCalender, setShowCalender] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false as boolean);
  const [phoneVerified, setPhoneVerified] = useState(false as boolean);
  const inputs = [
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
  const [inputList, setInputList] = useState([...inputs]);

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
    if(mode != "edit"){
      valid ? updates[1].showVerifyBtn = true : updates[1].showVerifyBtn = false;
    }
    setInputList([...updates]);
    setAllValid((valid && selectedDate));
  }

  const createNewClient = async ()=>{
    if(allValid){
      let data: iClient = {
        countryCode: "+91",
        name: inputList[0].value,
        phoneNumber: inputList[1].value,
        phoneVerified: phoneVerified,
        dateOfBirth: selectedDate ? Timestamp.fromDate(selectedDate) : Timestamp.fromDate(new Date())
      }
      let resp: apiResponse = await addNewClient(selectedBusinessId, data);
      if(resp?.status === 200 && Object.entries(resp.data).length){
        let temp = allClients;
        temp.concat([resp.data]);
        setClientToState(JSON.parse(JSON.stringify(temp)));
        let inputs = inputList.map((s)=>{
          s.showVerifyBtn = false;
          s.value = ""; 
          return s
        });
        setInputList([...inputs]);
        showToast("Client added successfully !")
      }else if(resp?.status === 200 && !Object.entries(resp.data).length){
        showToast(resp.message);
      }else if(resp?.status === 500 || resp?.status === undefined){
        showToast("Data fetch failed !");
      }
    }else{
      showToast("Verify all details.")
    }
  }

  const updateClientClicked = async ()=>{
    let data = {
      name: inputList[0].value,
      phoneVerified:phoneVerified
    } as iClient;
    let resp : apiResponse = await updateClient(selectedClient?.clientId || "", data);
    if(resp.status === 200){
      updateClientDetail({...resp.data});
      closeOverlay(9);
      showToast("Updated Successfully.")
    }else{
      showToast("Something went wrong.")
    }
  }

  const verifyBtnClicked = async ()=>{
    let resp: apiResponse = await sendVerificationCode(`+91${inputList[1].value}`);
    if(resp?.status === 200){
      let temp = inputList;
      temp[1].showVerifyBtn = false;
      setInputList([...temp]);
      setShowOTPInput(true);
    }else{
      setShowOTPInput(false);
      showToast("Something went wrong.")
    }
  }

  const checkOTPClicked = async (code: string)=>{
    let resp: apiResponse = await verifyOTPCode(`+91${inputList[1].value}`, code);
    if(resp?.status === 200){
      let temp = inputList;
      temp[1].showVerifyBtn = false;
      temp[1].editable = false;
      setPhoneVerified(true);
      setInputList([...temp]);
      setShowOTPInput(false);
      showToast(resp.message);
    }else{
      showToast("Verification failed.");
      setPhoneVerified(false);
      setShowOTPInput(false);
    }
  }

  useEffect(()=>{
    validation();
  }, [selectedDate])

  useEffect(()=>{
    if(mode === "edit"){
      let inputIndex = inputs.findIndex((x)=>{return x.name === "clientName"});
      if(inputIndex > -1){
      }
      let tempInput = inputs[inputIndex]
      setInputList([tempInput]);
      let temp = inputList.map((x)=>{
        if(x.name === "clientName"){
          x.value = selectedClient.name;
        }else if(x.name === "phoneNumber"){
          x.value = selectedClient.phoneNumber;
          x.editable = false
          if(!selectedClient.phoneVerified){
           x.showVerifyBtn = true;
           x.valid = true;
           setPhoneVerified(false);
          }else{
            setPhoneVerified(true);
          }
        }
        return x
      });
      setInputList([...temp]);
      // if(selectedClient?.dobDate){
      //   selectedDate(new Date(selectedClient.dobDate))
      // }
    }
  }, [])

  return (
    <View style={styles.addClientScreen}>
      <View style={styles.inputView}>
        {
          inputList.map((d, i: number)=>{
            return (
              <View key={"i" + i} style={styles.inputs}>
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
                  verifyBtnClicked={()=>{verifyBtnClicked()}}
                />
                {
                  (d.showVerifyBtn && d.editable)? 
                    <Text style={styles.verifyText} key={"text" + i}>You can verify phone number now or can do it later.</Text>
                  : <></>
                }
                {
                  (showOTPInput && d.name === "phoneNumber") ? 
                    <PhoneCodeInput
                      checkOTPClicked={(val: string)=>{checkOTPClicked(val)}}
                      key={"otpInput" + i}
                    />
                  : <></>
                }
              </View>
            )
          })
        }
        {
          mode != "edit" ? 
            <View style={styles.calenderView}>
              <TouchableOpacity style={styles.dobView} onPress={()=>{setShowCalender(true)}} activeOpacity={0.7}>
                <IconSet name='user-o' color={iconColor} size={20}/>
                <Text style={styles.dobText}>{selectedDate ? selectedDate.toLocaleDateString() : "DOB"}</Text>
              </TouchableOpacity>
            </View>
          : <></>
        }
        {
          showCalender ?
          <DateTimePicker
            value={selectedDate ? selectedDate : new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            onTouchCancel={()=>{setShowCalender(false)}}
          /> : <></>
        }
      </View>
      <View style={styles.btnView}>
        {
          mode === "edit" ? 
          <Button
            onTouch={()=>{updateClientClicked()}}
            text='EDIT'
            width='35%'
          />
          :
          <Button
              onTouch={()=>{createNewClient()}}
              text='ADD'
              width='35%'
          />
        }
      </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  selectedBusinessId: state.dashboard.selectedBusiness?.uid || "",
  allClients: state.client.clients,
  mode: state.client.mode,
  selectedClient: state.client.selectedClient
})

const mapDispatchToProps = (dispatch: any)=>({
  setClientToState: (data: iMembership[])=>dispatch(setAllClients(data)),
  updateClientDetail: (data: any)=>{dispatch(updateClientAction(data))},
  closeOverlay: (id: number)=>{dispatch(closeOverlayComponent(id))}
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
    },
    verifyText:{
      color: borderColor,
      fontSize: fontSize.small,
      width: "100%",
      textAlign: "center"
    },
    inputs:{
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
})