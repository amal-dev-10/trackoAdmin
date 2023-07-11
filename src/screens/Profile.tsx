import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadowGenerator } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { profileButtonProps } from '../interfaces/common'
import { setOverlayComponent, toggleSubButton } from '../redux/actions'
import { logout } from '../redux/actions/authActions'

type props = {
    profileBtnList: profileButtonProps[],
    profileDetails: any,
    openOverlay: any,
    toggleButton: any,
    signOut: any
}

const Profile = ({profileBtnList, profileDetails, openOverlay, toggleButton, signOut}: props) => {
    const [rating, setRating] = useState( 4.6 as number);
    const [stars, setStars] = useState([] as any[]);

    const ratingStarGenerator = ()=>{
        let int: number = Math.floor(rating);
        let deci: number = rating % 1;
        let temp: any[] = []
        for (let index = 0; index < int; index++) {
            temp.push(
                <IconSet name='star' color={goldColor} size={18} key={"fullStar" + index}/>
                )
        }
        if(deci != 0){
            temp.push(
                <IconSet name='star-half-alt' color={goldColor} size={18} key={"half"}/>
             )
        };
        return temp
    }

    useEffect(()=>{
        let starList = ratingStarGenerator();
        setStars([...starList]);
    },[]);

  return (
    <View style={styles.profileView}>
        <View style={[styles.profileCard, shadowGenerator()]}>
            <View style={styles.details}>
                <Text style={styles.textName}>AMAL DEV</Text>
                <View style={styles.ratingView}>
                    {
                        stars
                    }
                    <Text>4.6</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
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
                                onPress={()=>{
                                    if(!data.subButtons.length){
                                        data.name === "LOGOUT" ? signOut() : openOverlay(data.id);
                                    }else{
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
                                    <IconSet name='right-small' size={20} color={iconColor}/> : <></>
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
            <Text style={styles.versionName}>TRACKO ADMIN 1.0</Text>
        </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    profileBtnList: state.profile.buttons,
    profileDetails: state.profile.profileDetails
});

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (componentId: number)=>{dispatch(setOverlayComponent(componentId))},
    toggleButton: (id: number)=>{dispatch(toggleSubButton(id))},
    signOut: ()=>{dispatch(logout())},
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
    ratingView:{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "center"
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
    }
})