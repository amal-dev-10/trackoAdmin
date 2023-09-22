import { Dimensions, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadowGenerator, showToast } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, textColorPrimary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { apiResponse, iOwner, iSubscribedData, iSubscriptionData, profileButtonProps } from '../interfaces/common'
import { confirmAction, confirmModalPropertiesAction, resetReducerAction, setIdTransactions, setOverlayComponent, setTransactionMode, showConfirmModalAction, toggleSubButton, updateOwnerAction } from '../redux/actions'
import { logout } from '../redux/actions/authActions'
import packageJson from '../../package.json';
import store from '../redux/store'
import { cancelMySubscription } from '../services/apiCalls/serviceCalls'
import { ibusiness } from '../interfaces/business'
import ProgressBar from '../components/Common/ProgressBar'

type props = {
    profileBtnList: profileButtonProps[],
    openOverlay: any,
    toggleButton: any,
    signOut: any,
    setId: any,
    mode: any,
    ownerDetail: iOwner,
    confirmation: boolean,
    setConfirm: any,
    setProperties: any,
    showModal: any,
    allBusiness: ibusiness[],
    updateOwner: any
}

type iStat = {
    key: string,
    value: string
}

const Profile = ({profileBtnList, openOverlay, toggleButton, signOut, confirmation, setConfirm, setProperties, ownerDetail, showModal, allBusiness, updateOwner}: props) => {
    const [planMsg, setPlanMsg] = useState<string>("");
    const [dateMsg, setDateMsg] = useState<string>("");
    const [status, setStatus] = useState<string | undefined>(ownerDetail?.subscription?.status) 
    const [stat, setStat] = useState<iStat[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [daysLeft, setDaysLeft] = useState<number>(0);
    
    const generatePlanName = (stts: string)=>{
        let msg = "";
        let dMsg = "";
        if(stts){
            switch (stts){
                case "active":
                    msg = ownerDetail?.subscribedData?.name.toUpperCase() || "";
                    if(ownerDetail.subscription?.expiresOn){
                        dMsg = `Expires on ${new Date(ownerDetail?.subscription?.expiresOn * 1000).toDateString()}`;
                    }
                    break;
                default:
                    msg = stts?.toUpperCase();
                    if(ownerDetail.subscription?.expiresOn){
                        dMsg = `${stts[0].toUpperCase() + stts.slice(1).toLowerCase()} at ${new Date(ownerDetail?.subscription?.expiresOn * 1000).toDateString()}`;
                    }
                    break;
            }
        }else{
            msg = "GET YOUR FIRST SUBSCRIPTION"
        }
        setPlanMsg(msg);
        setDateMsg(dMsg);
    }

    const cancelSubscriptionClicked = async ()=>{
        showModal(true);
        setProperties({
            msg: "Sure that you want to cancel your subscription.\nNote: Payment you made towards the subscription will not be refunded.",
            title: "Confirmation"
        });
    }

    const cancelSubscription = async ()=>{
        let resp: apiResponse = await cancelMySubscription({subscriptionId: ownerDetail?.subscription?.id || ""});
        if(resp && resp.status === 200){
            let res: {
                subscription: iSubscriptionData,
                subscribedData: iSubscribedData
            } = resp.data;
            updateOwner({...ownerDetail, ...res});
            showToast("Subscription canceled."); 
        }else{
            showToast("Couldn't cancel the subscription.")
        }
    }

    const generateStat = ()=>{
        let numOfBusiness: number = allBusiness.length;
        let numOfVerified: number = 0;
        let numOfPending: number = 0;
        allBusiness.forEach((x)=>{
            if(x.verified){
                numOfVerified = numOfVerified + 1;
            }else{
                numOfPending = numOfPending + 1;
            }
        });
        setStat([
            {key: "Num of\nBusiness added", value: String(numOfBusiness)},
            {key: "Num of\nRequest verified", value: String(numOfVerified)},
            {key: "Num of\nRequest pending", value: String(numOfPending)},
        ]);
    }

    const calculateProgress = ()=>{
        if(ownerDetail.subscription?.expiresOn && ownerDetail.subscription.startDate){
            let start = new Date(ownerDetail.subscription?.startDate * 1000).getTime();
            let end = new Date(ownerDetail.subscription?.expiresOn * 1000).getTime();
            let currentDate = new Date().getTime();
            let totalDays = Math.floor((end - start)/(1000*60*60*24)) - 1;
            let daysPassed = Math.floor((currentDate - start)/(1000*60*60*24));
            let percentage = (daysPassed/totalDays)*100;
            setProgress(percentage);
            setDaysLeft(totalDays-daysPassed);
        }
    }

    useEffect(()=>{
        if(confirmation){
            cancelSubscription();
            setConfirm(false);
        }
    }, [confirmation])

    useEffect(()=>{
        setStatus(ownerDetail?.subscription?.status);
        generatePlanName(ownerDetail?.subscription?.status || "");
        calculateProgress();
    }, [ownerDetail])

    useEffect(()=>{
        generatePlanName(ownerDetail?.subscription?.status || "");
        generateStat();
        calculateProgress();
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
                <Text style={styles.emailId}>{ownerDetail?.emailId}</Text>
                <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
                    <IconSet name='pencil' size={15} color={iconColor}/>
                    <Text style={styles.profileEdit}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <IconSet name='user-circle-o' color={iconColor} size={80}/>
        </View>
        <ScrollView 
            style={{flex: 1, width: Dimensions.get("window").width * 0.93}}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.sectionView}>
                <View style={styles.sectionTitleView}>
                    <Text style={styles.sectionTitle}>MY BUSINESS</Text>
                </View>
                <View style={styles.statView}>
                    {
                        stat.map((x, i:number)=>{
                            return (
                                <View style={styles.statCard} key={"stat" + i}>
                                    <Text style={styles.statKey}>{x.key}</Text>
                                    <Text style={styles.statValue}>{x.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.btnView}>
                {
                    (ownerDetail.subscribedData && ownerDetail.subscribedData) &&
                    <View style={styles.sectionView}>
                        <View style={styles.sectionTitleView}>
                            <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
                        </View>
                        {
                            status === "active" &&
                            <TouchableOpacity style={styles.upgrade} activeOpacity={0.6} onPress={()=>{openOverlay(14)}}>
                                <Text style={styles.upgradeText}>Get new subscription</Text>
                            </TouchableOpacity>
                        }
                        <View style={styles.subscriptionCard}>
                            {
                                (ownerDetail.subscription?.status === "active" && progress) ?
                                <ProgressBar widthPercentage={progress}/> : <></>
                            }
                            <View style={styles.top}>
                                <View style={styles.topFirst}>
                                    <Text 
                                        style={[
                                            styles.planName,
                                            status === "active" && {color: goldColor},
                                            status === "canceled" && {color: borderColor},
                                            status === "expired" && {color: "crimson"}
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {planMsg}
                                    </Text>
                                    {
                                        (status === "active" && ownerDetail?.subscription?.nextInvoice) &&
                                        <Text style={styles.nextInvoice}>Next invoice on {new Date(ownerDetail.subscription.nextInvoice).toDateString()}</Text>
                                    }
                                </View>
                                <View style={styles.topSecond}>
                                    {
                                        dateMsg &&
                                        <View style={styles.expiryView}>
                                            <IconSet name='clock' size={15} color={textColorPrimary}/>
                                            <Text>{dateMsg}</Text>
                                        </View>
                                    }
                                    {
                                        ownerDetail.subscription?.status === "active" &&
                                        <Text style={styles.daysLeft}>{daysLeft + " days left"}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.bottom}>
                                {
                                    status === "active" &&
                                    <TouchableOpacity 
                                        style={styles.subsBtns}
                                        onPress={()=>{cancelSubscriptionClicked()}}
                                    >
                                        <Text style={styles.subsBtnsText}>Cancel Subscription</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    ((status === "canceled" || status === "expired") || ownerDetail.subscription === undefined || status === "incomplete") && 
                                    <TouchableOpacity 
                                        style={styles.subsBtns}
                                        onPress={()=>{openOverlay(14)}}
                                    >
                                        <Text style={styles.subsBtnsText}>Upgrade Now</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                }
                <View style={styles.sectionView}>
                    <View style={styles.sectionTitleView}>
                        <Text style={styles.sectionTitle}>MORE</Text>
                    </View>
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
        </ScrollView>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    profileBtnList: state.profile.buttons,
    ownerDetail: state.auth.user,
    confirmation: state.confirmation.confirm,
    allBusiness: state.dashboard.businesses, 
});

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (componentId: number)=>{dispatch(setOverlayComponent(componentId))},
    toggleButton: (id: number)=>{dispatch(toggleSubButton(id))},
    signOut: ()=>{dispatch(logout())},
    setId: (id: string)=>{dispatch(setIdTransactions(id))},
    mode: (mode: string)=>{dispatch(setTransactionMode(mode))},
    setProperties: (data: {msg?: string, title?: string})=>{dispatch(confirmModalPropertiesAction(data))},
    setConfirm: (confirm: boolean)=>{dispatch(confirmAction(confirm))},
    showModal: (show: boolean)=>{dispatch(showConfirmModalAction(show))},
    updateOwner: (data: iOwner)=>{dispatch(updateOwnerAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    profileView:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
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
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        // gap: 10,
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
        // paddingTop: 10,
        width: "100%",
        marginVertical: 20
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
        // gap: 5
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
    subscriptionCard:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: cardColor,
        borderRadius: 10,
        height: Dimensions.get("window").height * 0.23,
        elevation: 3,
        
    },
    top:{
        flex: 1,
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    bottom:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: "26%",
        backgroundColor: goldColor,
        borderRadius: 10
    },
    subsBtns:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        flex: 1
    },
    subsBtnsText: {
        fontSize: fontSize.xmedium,
        color: borderColor,
        fontWeight: "400"
    },
    planName:{
        fontSize: fontSize.large,
        color: goldColor,
        fontWeight: "600",
        width: "90%"
    },
    expiryView:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 5
    },
    nextInvoice:{
        fontSize: fontSize.small,
        color: borderColor
    },
    topFirst: {
    },
    topSecond: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    emailId:{
        fontSize: fontSize.small,
        color: borderColor
    },
    statView:{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    statCard: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cardColor,
        borderRadius: 10,
        padding: 10,
        flex: 1
    },
    statKey: {
        color: borderColor,
        fontSize: fontSize.small,
        textAlign: "center"
    },
    statValue: {
        color: textColorPrimary,
        fontSize: fontSize.medium,
        fontWeight: "600"
    },
    sectionView:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginVertical: 10
    },
    sectionTitleView: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    sectionTitle: {
        fontSize: fontSize.small,
        color: borderColor,
        fontWeight: "400"
    },
    topView:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    daysLeft: {
        fontSize: fontSize.small,
        color: borderColor,
    },
    upgrade:{
        padding: 10,
        paddingVertical: 15,
        backgroundColor: cardColor,
        borderRadius: 10,
        elevation: 3,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    upgradeText:{
        fontSize: fontSize.xmedium,
        color: borderColor
    }
})