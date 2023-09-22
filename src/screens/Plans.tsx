import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontSize } from '../styles/fonts'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { connect } from 'react-redux'
import { apiResponse, iSubscription } from '../interfaces/common'
import PlanCard from '../components/Common/PlanCard'
import IconSet from '../styles/icons/Icons'
import { setOverlayComponent, setSavedCardsAction, setSubscriptionDetailAction } from '../redux/actions'
import { showToast } from '../utils/helper'
import { createSubscription, getAllSavedCards, getSubsriptionPlans } from '../services/apiCalls/serviceCalls'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'


type newType = iSubscription & {selected?: boolean}

type props = {
    plans: newType[],
    setSubscriptionPlans: any,
    openOverlay: any,
    setSavedCard: any
}

// type iKeys = {
//     paymentIntent: string,
//     ephemeralKey: string,
//     customer: string
// }

type iKeys = {
    clientSecret: string,
    subscriptionId: string,
    customerId: string
}

const Plans = ({plans, setSubscriptionPlans, openOverlay, setSavedCard}: props) => {
    
    const [msg, setMsg] = useState<string>("");

    const selectPackClicked = (id: string)=>{
        let temp = plans.map((x)=>{
            if(x.id === id){
                x.selected = true
            }else{
                x.selected = false
            }
            return x
        });
        setSubscriptionPlans([...temp]);
    }

    const checkOutNowClicked = async ()=>{
        openOverlay(15);
    }

    const getAllData = async ()=>{
        let resp: apiResponse = await getSubsriptionPlans();
        if(resp && resp.status === 200){
            let temp: iSubscription[] = resp.data.map((x: newType, i:number)=>{
                i === 0 ? x.selected = true : x.selected = false;
                return x
            });
            if(!temp.length){
                setMsg("No subscription plans available.");
            }else{
                setMsg("");
            }
            setSubscriptionPlans([...temp]);
        }else{
            showToast("Something went wrong.")
        }
    }
    
    useEffect(()=>{
        getAllData();
        return ()=>{setSubscriptionPlans([])}
    }, [])
  return (
    <View style={styles.planScreen}>
        <Text style={styles.title}>{"CHOOSE\nYOUR PLAN"}</Text>
        <View style={styles.planView}>
            {
                plans.length ? 
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            plans.map((x, i: number)=>{
                                return (
                                    <PlanCard data={x} key={"planCard" + i} packSelected={(id: string)=>{selectPackClicked(id)}}/>
                                )
                            })
                        }
                    </ScrollView>
                : msg ? <Text style={styles.msg}>{msg}</Text> : <></>
            }
        </View>
        <View style={styles.center}>
            {
                plans.length ?
                <TouchableOpacity style={styles.checkOutBtn} activeOpacity={0.7} onPress={()=>{checkOutNowClicked()}}>
                    <Text style={styles.btnText}>CHECK OUT NOW</Text>
                    <IconSet name='right-small' size={25} color={borderColor}/>
                </TouchableOpacity>
                : <></>
            }
        </View>
    </View>
  )
}


const mapStateToProps = (state: any)=>({
    plans: state.monetization.subscriptionPlans
})

const mapDispatchToProps = (dispatch: any)=>({
    setSubscriptionPlans: (data: iSubscription[])=>{dispatch(setSubscriptionDetailAction(data))},
    openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
    setSavedCard: (data: any[])=>{dispatch(setSavedCardsAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans)

const styles = StyleSheet.create({
    planScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        paddingTop: 20
    },
    title:{
        fontSize: fontSize.xLarge,
        color: textColorPrimary,
        fontWeight: "300",
        marginBottom: 20,
        textAlign: "left"
    },
    planView:{
        flex: 1,
    },
    checkOutBtn:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        backgroundColor: textColorPrimary,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: "96%"
    },
    center:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingVertical: 15
    },
    btnText:{
        fontSize: fontSize.xmedium,
        color: borderColor,
        fontWeight: "700"
    },
    paymentScreenContainer:{
        flex: 1,
        backgroundColor: cardColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    msg: {
        color: borderColor,
        fontSize: fontSize.small,
        textAlign: "center",
        marginVertical: 30
    }
})