import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { inputProps } from '../../interfaces/common'
import Input from './Input'
import { valueBinder } from '../../utils/helper'
import { KeyboardType } from 'react-native'
import { BlurView } from '@react-native-community/blur'


type overlayProps = {
    show: boolean,
    close: Function
} 

const DashboardOverlay = (props:overlayProps) => {
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
                        onTouch={()=>{}}
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

export default DashboardOverlay

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