import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadowGenerator } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { profileButtonProps } from '../interfaces/common'
import { setOverlayComponent } from '../redux/actions'

type props = {
    profileBtnList: profileButtonProps[],
    profileDetails: any,
    openOverlay: any
}

const Profile = ({profileBtnList, profileDetails, openOverlay}: props) => {
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
    },[])
  return (
    <View style={styles.profileView}>
        <View style={[styles.profileCard, shadowGenerator()]}>
            <IconSet name='user-o' color={iconColor} size={80}/>
            <Text style={styles.textName}>AMAL DEV</Text>
            <Text style={styles.orgName}>WORLD FITNESS CENTER</Text>
            <View style={styles.ratingView}>
                {
                    stars
                }
                <Text>4.6</Text>
            </View>
        </View>
        <View style={styles.btnView}>
            {
                profileBtnList.map((data, i: number)=>{
                    return (
                        <TouchableOpacity 
                            style={[styles.profileBtn]} 
                            key={"profileBtn" + i}
                            onPress={()=>{openOverlay(data.id)}}
                        >
                            <IconSet name={data.icon} size={16} color={textColorPrimary}/>
                            <Text style={styles.btnText}>{data.name}</Text>
                        </TouchableOpacity>
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
    openOverlay: (componentId: number)=>{dispatch(setOverlayComponent(componentId))}
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
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        minWidth: "50%"
    },
    textName:{
        fontSize: fontSize.xmedium,
        fontWeight: "700",
        color: textColorSecondary
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
        justifyContent: "flex-start",
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
    }
})