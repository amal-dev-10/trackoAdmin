import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container } from '../utils/helper'
import IconSet from '../styles/icons/Icons';
import { iconColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { connect } from 'react-redux';
import { overlayComponent } from '../interfaces/common';
import { setOverlayComponent } from '../redux/actions';
import Profile from './Profile';
import Transactions from './Transactions';
import TermsAndConditions from './TermsAndConditions';
import Settings from './Settings';

type props={
    component: overlayComponent,
    openOverlay: any
}

const Overlay = ({component, openOverlay}: props) => {
  return (
    <Modal visible={component.id != 0} presentationStyle='fullScreen'>
        <View style={[styles.overlayScreen, container]} >
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{openOverlay(0)}} style={styles.icon}>
                    <IconSet name='left-small' color={iconColor} size={30}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{component.name}</Text>
            </View>
            <View style={styles.content}>
                {
                    component.id === 1 &&
                    <Transactions/> //individual transactions
                }
                {
                    component.id === 2 &&
                    <Profile/> //profile
                }
                {
                    component.id === 3 &&
                    <Transactions type="all"/> //all transactions
                }
                {
                    component.id === 4 &&
                    <TermsAndConditions/> //terms and conditions
                }
                {
                    component.id === 5 &&
                    <Settings/> //terms and conditions
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
    openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
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