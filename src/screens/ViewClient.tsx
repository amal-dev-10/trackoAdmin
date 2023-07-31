import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, primaryColor, textColorPrimary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { key } from '../styles/constants'
import { fomatFirstLetterCapital, makeCall, openWhatsapp, wordSplitter } from '../utils/helper'
import { connect } from 'react-redux'
import { setIdTransactions, setOverlayComponent, setTransactionMode, setTransactions, showActivatePackage } from '../redux/actions'
import { iClient, iMembership } from '../interfaces/iClient'
import { iTransactions, openOverlayParameter } from '../interfaces/common'

type buttons = {
    id: number,
    name: string,
    icon: string,
}

type viewClientProps = {
    showActivatePack: any,
    clientData: iMembership,
    openOverlay: any,
    setId: any,
    mode: any
}

const ViewClient = ({showActivatePack, clientData, openOverlay, setId, mode}:viewClientProps) => {
    const [firstRowButtons, setFirstRowButtons] = useState([
        {
            id: 0,
            icon: "phone",
            name: "Call"
        },
        {
            id: 1,
            icon: "whatsapp",
            name: "Whatsapp"
        },
        {
            id: 2,
            icon: "pencil",
            name: "Edit"
        }
    ] as buttons[]);

    const [secondRowButtons, setSecondRowButtons] = useState([
        {
            id: 3,
            icon: "exchange",
            name: "Transactions"
        },
        {
            id: 4,
            icon: "credit-card",
            name: "Membership"
        }
    ] as buttons[]);

    const buttonClicked = async (id: number)=>{
        switch(id){
            case 0:
                await makeCall(clientData.phoneNumber);
                break;
            case 1:
                await openWhatsapp(clientData.phoneNumber);
                break;
            case 3:
                setId(clientData.clientId);
                mode("client");
                openOverlay(1);
                break;
            case 4:
                showActivatePack(true);
                break;
            default:
                break
        }
    }

  return (
    <View style={styles.viewClientScreen}>
        <View style={styles.detailView}>
            <IconSet name='user-circle-o' size={90} color={iconColor}/>
            <View style={[styles.nameView]}>
                <Text style={styles.nameText}>{fomatFirstLetterCapital(clientData.name.toUpperCase())}</Text>
                <Text style={styles.phoneText}>{clientData.phoneNumber}</Text>
            </View>
        </View>
        {/* <View style={styles.memberSince}>
            <IconSet name='user-o' size={20} color={iconColor}/>
            <Text>Member since 2020</Text>
        </View> */}
        <View style={styles.statRow}>
            <View style={styles.section}>
                <Text style={key}>{wordSplitter("Active membership")}</Text>
                <Text style={styles.value}>
                    {
                        (clientData?.memberShipDetails?.tier && !clientData.memberShipDetails?.expired) ?
                        clientData?.memberShipDetails?.tier.toUpperCase() 
                        : "NA"
                    }
                </Text>
                <Text style={styles.subKey}>Pack</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.section}>
                <Text style={key}>{wordSplitter("Expires In")}</Text>
                <Text style={styles.value}>
                    { 
                        (clientData?.memberShipDetails?.expireIn && !clientData.memberShipDetails?.expired) ?
                            clientData?.memberShipDetails?.expireIn
                        : clientData.memberShipDetails?.expired ? "EXPIRED" : "NA"
                    }
                </Text>
                <Text style={styles.subKey}>Days</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.section}>
                <Text style={key}>{wordSplitter("Member since")}</Text>
                <Text style={styles.value}>
                    {
                        clientData?.since ?
                        clientData?.since
                        : "NA"
                    }
                </Text>
                <Text style={styles.subKey}>Year</Text>
            </View>
        </View>
        <View>
            <View style={styles.quickButtons}>
                {
                    firstRowButtons.map((s, i:number)=>{
                        return (
                            <RoundButton data={s} key={i} onTouch={()=>{buttonClicked(s.id)}}/>
                        )
                    })
                }
            </View>
            <View style={styles.quickButtons}>
                {
                    secondRowButtons.map((s, i:number)=>{
                        return (
                            <RoundButton data={s} key={i} onTouch={()=>{buttonClicked(s.id)}}/>
                        )
                    })
                }
            </View>
        </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
    showActivatePack: (show:boolean)=>{dispatch(showActivatePackage(show))},
    openOverlay: (id: openOverlayParameter)=>{dispatch(setOverlayComponent(id))},
    setId: (id: string)=>{dispatch(setIdTransactions(id))},
    mode: (mode: string)=>{dispatch(setTransactionMode(mode))}
});

const mapStateToProps = (state: any)=>({
    clientData: state.client.selectedClient
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewClient)

type props = {
    data: buttons,
    onTouch: any
}

const RoundButton = (props: props)=>{
    return (
        <TouchableOpacity style={styles.longButton} activeOpacity={0.7} onPress={()=>{props.onTouch()}}>
            <IconSet name={props.data.icon} size={20} color={iconColor}/>
            <Text>{props.data.name}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    viewClientScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 20,
    },
    detailView:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
    },
    nameView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    nameText:{
        fontSize: fontSize.medium,
        color: textColorPrimary
    },
    phoneText:{
        fontSize: fontSize.small,
        color: borderColor
    },
    memberSince:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    longButton:{
        // height: Dimensions.get("window").width * 0.1,
        // width: "100%",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: cardColor,
        padding: 12,
        elevation: 3,
        margin: 5,
        flex: 1
    },
    quickButtons:{
        display: "flex",
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        flexWrap: "wrap",
    },
    buttonView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    main:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        backgroundColor: cardColor,
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    blurComponent:{
        height: 100,
        width: 100
    },
    section:{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    statRow:{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    divider:{
        width: 2,
        backgroundColor: borderColor,
        borderRadius: 10,
        height: "100%"
    },
    value:{
        color: goldColor,
        fontSize: fontSize.xmedium
    },
    subKey:{
        fontSize: fontSize.xSmall,
        color: borderColor
    }
})