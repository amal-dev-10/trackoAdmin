import { StyleSheet, View, Modal, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { apiResponse, inputProps } from '../../interfaces/common'
import Input from './Input'
import { showToast, valueBinder } from '../../utils/helper'
import { KeyboardType } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { connect } from 'react-redux'
import { iClientOrgs, ibusiness } from '../../interfaces/business'
import { setAllBusinesses } from '../../redux/actions'
import { addNewBusiness, getOrgById, sendRequest, widthdrawRequest } from '../../services/apiCalls/serviceCalls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { borderColor, cardColor, iconColor } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import Icon from 'react-native-vector-icons/Entypo'


type overlayProps = {
    show: boolean,
    close: Function,
    setBusiness: any,
    allBusinesses: ibusiness[]
} 

const DashboardOverlay = (props:overlayProps) => {
    const [allValid, setAllValid] = useState(false as boolean);
    const loginMode = useRef<string | null>(null);
    const [inputList, setInputList] = useState([] as inputProps[]);
    const [searchedBusiness, setSearchedBusiness] = useState<iClientOrgs>();
        
    const validation = ()=>{
        let updates = inputList.map((x)=>{
            if(x.value){
                x.valid = true;
            }else{
                x.valid = false;
            }
            if(x.name === "contactNumber"){
                if(x.value.length === 10){
                    x.valid = true;
                }else{
                    x.valid = false;
                }
            }
            if(x.name === "orgName"){
                if(x.value.length > 4 && x.value.length <= 20){
                    x.valid = true
                    x.msg = ""
                }else{
                    x.msg = "character length should be between 4 and 20"
                    x.valid = false
                }
            }
            if(x.name === "orgId"){
                if(x.value.length === 10){
                    x.valid = true
                    x.msg = ""
                }else{
                    x.msg = "Enter a valid Organization Id"
                    x.valid = false
                }
            }
            return x
        });
        setInputList([...updates]);
        let valid: boolean = updates.every((x)=>{return x.valid});
        setAllValid(valid);
    }

    const addNewBusinessClicked = async ()=>{
        if(allValid){
            let data: ibusiness = {
                name: inputList[0].value,
                location: inputList[1].value,
                verified: true,
                contactNumber: inputList[2].value,
                countryCode: "+91"
            }
            try{
                let resp: apiResponse = await addNewBusiness(data);
                if(resp?.status === 200){
                    let temp = props.allBusinesses;
                    temp.push(resp.data);
                    props.setBusiness(temp);
                    props.close();
                }else if(resp?.status === 500 || resp?.status === undefined){
                    showToast("Data fetch failed !")
                }
            }
            catch(err){
                console.log(err)
            }
        }else{
            showToast("Fill all Details.")
        }
    }

    const searchByOrgId = async ()=>{
        if(allValid){
            let resp: apiResponse = await getOrgById(inputList[0].value);
            if(resp.status === 200){
                let data = resp.data as iClientOrgs;
                setSearchedBusiness(data);
            }else if(resp.status === 404){
                showToast("No Organization Found.")
            }else{
                showToast("Something went wrong.")
            }
        }else{
            showToast("Enter Id")
        }
    }

    const sendRequestNow = async ()=>{
        let resp: apiResponse = await sendRequest(searchedBusiness?.uid || "");
        if(resp.status === 200){
            setSearchedBusiness({
                ...searchedBusiness,
                requested: resp.data?.requested
            } as any);
            let temp = props.allBusinesses as any;
            if(searchedBusiness){
                temp.push(searchedBusiness);
            }
            props.setBusiness(temp)
            showToast("Request send successfully.");
        }else{
            showToast("Something went wrong.")
        }
    }

    const widthdrawRequestNow = async ()=>{
        let resp: apiResponse = await widthdrawRequest(searchedBusiness?.uid || "");
        if(resp.status === 200){
            setSearchedBusiness({
                ...searchedBusiness,
                requested: resp.data?.requested
            } as any);
            let temp = props.allBusinesses as any[];
            let index = temp.findIndex((x)=>{return x.uid === searchedBusiness?.uid});
            if(index > -1){
                temp.splice(index, 1);
            }
            props.setBusiness(temp);
            showToast("Request withdrawn successfully.");
        }else{
            showToast("Something went wrong.")
        }
    }

    const start = async ()=>{
        let mode = await AsyncStorage.getItem("loginMode");
        loginMode.current = mode;
        if(mode === "admin"){
            setInputList([
                {
                  value: "",
                  msg: "",
                  placeHolder: "Organization Name",
                  keyBoardType: 'default',
                  icon: 'office-building',
                  valid: false,
                  name: "orgName",
                  focus: false,
                  id: 0,
                  editable: true
                },
                {
                  value: "",
                  msg: "",
                  placeHolder: "Location",
                  keyBoardType: 'default',
                  icon: 'navigation-variant-outline',
                  valid: false,
                  name: "location",
                  focus: false,
                  id: 1,
                  editable: true
                },
                {
                  value: "",
                  msg: "",
                  placeHolder: "Contact Number",
                  keyBoardType: 'default',
                  icon: 'cellphone',
                  valid: false,
                  name: "contactNumber",
                  focus: false,
                  id: 2,
                  editable: true
                }
            ])
        }else if(mode === "client"){
            setInputList(
                [
                    {
                        value: "",
                        msg: "",
                        placeHolder: "Organization Id",
                        keyBoardType: 'number-pad',
                        icon: 'office-building',
                        valid: false,
                        name: "orgId",
                        focus: false,
                        id: 0,
                        editable: true
                    }
                ]
            )
        }
    }

    useEffect(()=>{
        start()
    }, [])

  return (
    <Modal transparent visible={props.show} animationType='slide' onRequestClose={()=>{props.close()}}>
        <BlurView
            style={{flex:1}}
            blurType="dark"
            blurAmount={12}
        >
            <View style={styles.overlayCover}>
                <View style={styles.inputView}>
                    <Text style={{color: borderColor, fontSize: fontSize.small, width: "75%", textAlign: "center"}}>Type the organization Id you wish to join and send request</Text>
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
                    {
                        searchedBusiness &&
                        <Text style={{marginBottom: 10, marginTop: 10}}>Result found</Text>
                    }
                    {
                        loginMode.current === "client" && searchedBusiness &&
                        <View style={styles.searchedBusinessCard}>
                            <View style={styles.searchedBusinessDetails}>
                                <Text style={[styles.searchedText, {fontSize: fontSize.small, color: borderColor}]}>
                                    {searchedBusiness?.shareId}
                                </Text>
                                <Text style={[styles.searchedText, {fontSize: fontSize.medium}]}>
                                    {searchedBusiness?.name.toUpperCase()}
                                </Text>
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 4}}>
                                    <Icon name={"location"} size={15} color={borderColor}/>
                                    <Text style={[styles.searchedText, {fontSize: fontSize.xSmall}]}>
                                        {searchedBusiness?.location.toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                            {
                                !searchedBusiness.alreadyClient && !searchedBusiness.requested ?
                                <Button
                                    onTouch={()=>{sendRequestNow()}}
                                    text='Request'
                                    width='35%'
                                />
                                :
                                (searchedBusiness.requested && !searchedBusiness.alreadyClient) ? 
                                <Button
                                    onTouch={()=>{widthdrawRequestNow()}}
                                    text='Requested'
                                    width='35%'
                                />
                                : <></>
                            }
                        </View>
                    }
                </View>
                <View style={styles.btnView}>
                    {
                        loginMode.current === "admin" ? 
                            <Button
                                onTouch={()=>{addNewBusinessClicked()}}
                                text='ADD'
                                width='35%'
                            />
                        : loginMode.current === "client" ? 
                            <Button
                                onTouch={()=>{searchByOrgId()}}
                                text='SEARCH'
                                width='35%'
                            />
                        : <></>
                    }
                    <Button
                        onTouch={()=>{props.close()}}
                        text='CANCEL'
                        width='35%'
                        borderLess={false}
                    />
                </View>
            </View>
        </BlurView>
    </Modal>
  )
}

const mapStateToProps = (state: any)=>({
    allBusinesses: state.dashboard.businesses
})

const mapDispatchToProps = (dispatch: any)=>({
    setBusiness: (data: ibusiness[])=>{dispatch(setAllBusinesses(data))}
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOverlay)

const styles = StyleSheet.create({
    overlayCover:{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flex: 1,
        padding: 20,
    },
    inputView:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        flex: 1,
        width: "100%"
    },
    btnView:{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 30,
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20
    },
    searchedBusinessCard:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 10,
        width: "100%",
        backgroundColor: cardColor,
        borderRadius: 5,
        elevation: 4,
    },
    searchedBusinessDetails:{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1
    },
    searchedText:{
        color: iconColor
    }
})