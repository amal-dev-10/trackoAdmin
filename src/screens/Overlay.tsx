import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container } from '../utils/helper'
import IconSet from '../styles/icons/Icons';
import { iconColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { connect } from 'react-redux';
import { overlayComponent } from '../interfaces/common';
import { closeOverlayComponent, setOverlayComponent } from '../redux/actions';
import Profile from './Profile';
import Transactions from './Transactions';
import TermsAndConditions from './TermsAndConditions';
import Settings from './Settings';
import AddClients from './AddClients';

type props={
    // component: overlayComponent,
    overlayData: overlayComponent,
    closeOverlay: any
}

const Overlay = ({overlayData, closeOverlay}: props) => {
    // useEffect(()=>{
    //     const backHandler = BackHandler.addEventListener("hardwareBackPress",()=>{return false})
    //     return () => backHandler.remove()
    // },[])
  return (
    <Modal visible={overlayData.id != 0} presentationStyle='fullScreen' animationType='fade'>
        <View style={[styles.overlayScreen, container]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{closeOverlay(overlayData.id)}} style={styles.icon}>
                    <IconSet name='left-small' color={iconColor} size={30}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{overlayData.name}</Text>
            </View>
            <View style={styles.content}>
                {
                    overlayData.id === 1 &&
                    <Transactions/> //individual transactions
                }
                {
                    overlayData.id === 2 &&
                    <Profile/> //profile
                }
                {
                    overlayData.id === 3 &&
                    <Transactions type="all"/> //all transactions
                }
                {
                    overlayData.id === 4 &&
                    <TermsAndConditions/> //terms and conditions
                }
                {
                    overlayData.id === 5 &&
                    <Settings/> //terms and conditions
                }
                {
                    overlayData.id === 6 &&
                    <AddClients/> // add new client
                }
            </View>
        </View>
    </Modal>
  )
}

const mapStateToProps = (state: any)=>({
    component: state.overlay.component
});

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
    closeOverlay: (id: number)=>{dispatch(closeOverlayComponent(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)

const styles = StyleSheet.create({
    overlayScreen:{
        padding: 15,
        display: "flex",
        flexDirection: "column",
        gap: 15,
    },
    header:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    content:{
        flex: 1,
    },
    icon:{
        position: "absolute",
        left: 0,
        paddingRight: 10,
    },
    headerText:{
        fontSize: fontSize.xmedium,
        fontWeight: "700"
    }
})