import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { apiResponse, inputProps } from '../../interfaces/common'
import Input from './Input'
import { valueBinder } from '../../utils/helper'
import { KeyboardType } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { connect } from 'react-redux'
import { ibusiness } from '../../interfaces/business'
import { setAllBusinesses } from '../../redux/actions'
import { addNewBusiness } from '../../services/apiCalls/serviceCalls'


type overlayProps = {
    show: boolean,
    close: Function,
    setBusiness: any,
    allBusinesses: ibusiness[]
} 

const DashboardOverlay = (props:overlayProps) => {
    const [allValid, setAllValid] = useState(false as boolean);
    const [inputList, setInputList] = useState(
        [
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
          }
        ] as inputProps[]);
        
    const validation = ()=>{
        let updates = inputList.map((x)=>{
            if(x.value){
                x.valid = true;
            }else{
                x.valid = false;
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
                verified: false,
            }
            try{
                let resp: apiResponse = await addNewBusiness(data);
                if(resp?.status === 200){
                    let temp = props.allBusinesses;
                    temp.push(resp.data);
                    props.setBusiness(temp);
                    props.close();
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

  return (
    <Modal transparent visible={props.show}>
        <BlurView
            style={{flex:1}}
            blurType="dark"
            blurAmount={12}
        >
            <View style={styles.overlayCover}>
                <View style={styles.inputView}>
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
                <View style={styles.btnView}>
                    <Button
                        onTouch={()=>{addNewBusinessClicked()}}
                        text='ADD'
                        width='35%'
                    />
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
    }
})