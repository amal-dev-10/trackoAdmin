import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { borderColor, cardColor, iconColor } from '../../styles/colors'
import Button from './Button'
import { fontSize } from '../../styles/fonts'
import { confirmationModal } from '../../interfaces/common'
import { connect } from 'react-redux'
import { confirmAction, confirmModalPropertiesAction, showConfirmModalAction } from '../../redux/actions'

type props = {
    modalData: confirmationModal,
    setProperties: any,
    setConfirm: any,
    showModal: any,
}

const Confirmation = ({modalData, setConfirm, setProperties, showModal}: props) => {
    
    const cancelAction = ()=>{
        setConfirm(false); 
        showModal(false)
    }

    useEffect(()=>{
        setProperties({
            msg: "You have selected BASIC PLAN to remove.\nSure you want to delete ?",
            title: "Confirmation"
        })
    }, []) 
  return (
    modalData.showConfirmModal ?
    <Modal transparent onRequestClose={()=>{cancelAction()}} animationType='fade'>
        <View style={styles.confirmationView}>
            <View style={styles.container}>
                <View style={styles.headerActivate}>
                    <Text style={styles.title}>{modalData.title}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.msg}>
                        {
                            modalData.msg
                        }
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Button
                        onTouch={()=>{setConfirm(true); showModal(false)}}
                        text='Confirm'
                        width='40%'
                    />
                    <Button
                        onTouch={()=>{cancelAction()}}
                        text='Cancel'
                        width='40%'
                        borderLess={true}
                    />

                </View>
            </View>
        </View>
    </Modal>
    : <></>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
    setProperties: (data: {msg: string, title: string})=>{dispatch(confirmModalPropertiesAction(data))},
    showModal: (show: boolean)=>{dispatch(showConfirmModalAction(show))},
    setConfirm: (confirm: boolean)=>{dispatch(confirmAction(confirm))}
});

const mapStateToProps = (state: any)=>({
    modalData: state.confirmation
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)

const styles = StyleSheet.create({
    confirmationView:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f0fbc"
    },
    container:{
        backgroundColor: cardColor,
        elevation: 3,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        minHeight: "30%",
        // maxHeight: "70%",
        width: "90%"
    },
    headerActivate:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#1d1d1d",
        borderBottomWidth: 2
    },
    detail:{
        flex: 1,
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "column",
        gap: 10
    },
    title:{
        color: iconColor,
        fontSize: fontSize.xmedium
    },
    footer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    msg:{
        color: borderColor,
        fontSize: fontSize.small,
        textAlign: "center",
        width: "90%"
    }
})