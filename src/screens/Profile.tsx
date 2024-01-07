import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadowGenerator } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, textColorPrimary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { iOwner, profileButtonProps } from '../interfaces/common'
import { resetReducerAction, setIdTransactions, setOverlayComponent, setTransactionMode, toggleSubButton } from '../redux/actions'
import { logout } from '../redux/actions/authActions'
import packageJson from '../../package.json';
import store from '../redux/store'

type props = {
    profileBtnList: profileButtonProps[],
    openOverlay: any,
    toggleButton: any,
    signOut: any,
    setId: any,
    mode: any,
    ownerDetail: iOwner
}

const Profile = ({profileBtnList, openOverlay, toggleButton, signOut, mode, setId, ownerDetail}: props) => {

    useEffect(()=>{
        return ()=>{
            let st = store.dispatch;
            st(resetReducerAction("profileReducer"));
        }
    },[])
  return (
    <View style={styles.profileView}>
        <View style={[styles.profileCard, shadowGenerator()]}>
            <View style={styles.details}>
                <Text style={styles.textName}>{ownerDetail?.name}</Text>
                <Text style={styles.phoneNumberText}>{ownerDetail?.phoneNumber}</Text>
                <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
                    <IconSet name='pencil' size={15} color={iconColor}/>
                    <Text style={styles.profileEdit}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <IconSet name='user-circle-o' color={iconColor} size={80}/>
        </View>
        <View style={styles.btnView}>
            {
                profileBtnList.map((data, i: number)=>{
                    return (
                        <View style={styles.buttonView} key={"profileBtn" + i}>
                            <TouchableOpacity 
                                style={[styles.profileBtn]}
                                activeOpacity={0.7}
                                onPress={()=>{
                                    if(!data.subButtons.length){
                                        data.name === "LOGOUT" ? signOut() : openOverlay(data.id);
                                    }else{
                                        LayoutAnimation.configureNext({
                                            duration: 200, // Adjust the frame rate by changing the duration
                                            update: {
                                              type: LayoutAnimation.Types.linear ,
                                            },
                                          });
                                        toggleButton(data.id);
                                    }
                                    // !data.subButtons.length ? openOverlay(data.id) : toggleButton(data.id)
                                }}
                            >
                                <View style={styles.buttonFirst}>
                                    <IconSet name={data.icon} size={16} color={textColorPrimary}/>
                                    <Text style={styles.btnText}>{data.name}</Text>
                                </View>
                                {
                                    data.subButtons?.length ?
                                    <IconSet name='angle-left' color={iconColor} size={20} style={{transform:[{rotate: "180deg"}]}}/> : <></>
                                }
                            </TouchableOpacity>
                            {
                                (data.subButtons.length && data.opened) ?
                                    <View style={styles.subButtonView}>
                                      {
                                        data.subButtons.map((d, i:number)=>{
                                            return (
                                                <TouchableOpacity style={[styles.profileBtn, styles.subButton]} key={"subButton" + i} onPress={()=>{openOverlay(d.id)}}>
                                                    <IconSet name={d.icon} size={16} color={textColorPrimary}/>
                                                    <Text style={styles.btnText}>{d.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                      }  
                                    </View>
                                : <></>
                            }
                        </View>
                    )
                })
            }
        </View>
        <View style={styles.versionView}>
            <IconSet name='tracko-logo' size={10} color={borderColor}/>
            <Text style={styles.versionName}>{`V ${packageJson.version}`}</Text>
        </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    profileBtnList: state.profile.buttons,
    ownerDetail: state.auth.user 
});

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (componentId: number)=>{dispatch(setOverlayComponent(componentId))},
    toggleButton: (id: number)=>{dispatch(toggleSubButton(id))},
    signOut: ()=>{dispatch(logout())},
    setId: (id: string)=>{dispatch(setIdTransactions(id))},
    mode: (mode: string)=>{dispatch(setTransactionMode(mode))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    profileView:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 35,
        paddingVertical: 15
    },
    profileCard:{
        padding: 20,
        backgroundColor: cardColor,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        width: "100%"
    },
    textName:{
        fontSize: fontSize.medium,
        fontWeight: "700",
        color: textColorPrimary
    },
    orgName:{
        color: iconColor,
        fontSize: fontSize.small
    },
    btnView:{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "flex-start"
    },
    profileBtn:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        justifyContent: "space-between",
        backgroundColor: cardColor,
        padding: 15,
        borderRadius: 10,
        width: "100%",
        elevation: 2
        // borderBottomWidth: 1,
        // borderBottomColor: borderColor
    },
    btnText:{
        color: iconColor,
        fontSize: fontSize.small
    },
    versionView:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    versionName:{
        color: borderColor, 
        fontSize: fontSize.xSmall
    },
    details:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'center',
        gap: 5
    },
    profileEdit:{
        color: iconColor,
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    },
    editBtn:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        marginTop: 15
    },
    buttonFirst:{
        display: "flex",
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    buttonView:{
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    subButtonView:{
        display: 'flex',
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 10
    },
    subButton:{
        width: "80%",
        justifyContent: "flex-start"
    },
    phoneNumberText:{
        color: borderColor,
        fontSize: fontSize.small
    }
})