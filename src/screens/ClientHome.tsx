import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MembershipCard from '../components/Common/MembershipCard'
import { iMembership, iMembershipDetails } from '../interfaces/iClient'
import { apiResponse, iOwner } from '../interfaces/common'
import { getMyMembership } from '../services/apiCalls/serviceCalls'
import { connect } from 'react-redux'
import { setMembershipAction } from '../redux/actions'
import { setRoute } from '../utils/helper'
import { ibusiness } from '../interfaces/business'
import { cardColor, iconColor, primaryColor } from '../styles/colors'
import Svg, { Defs, G, Path } from 'react-native-svg'

type props = {
    setMembership: any,
    membership: iMembership,
    user: iOwner,
    businessData: ibusiness
}

const ClientHome = ({membership, setMembership, user, businessData}: props) => {
    const [mData, setMData] = useState<iMembership>();
    const getMyMembershipDetails = async ()=>{
        let res: apiResponse = await getMyMembership();
        if(res.status === 200){
            let d = res.data as iMembershipDetails;
            let data = {
                clientId: user.uid,
                memberShipDetails: d || {} as iMembershipDetails,
                name: user.name,
                phoneVerified: businessData?.clientVerified,
                phoneNumber: user.phoneNumber,
                profileImageUrl: "",
                since: ""
            } as iMembership
            setMData(data)
            setMembership(data)
        }
    }
    const start = ()=>{
        getMyMembershipDetails()
    }

    useEffect(()=>{
        setRoute("ClientHome")
        start()
    }, [])
  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={{height: "100%"}} contentContainerStyle={{paddingTop: 10}}>
        <View style={styles.clientHome}>
            {
                mData?.clientId ?
                <MembershipCard
                    membershipData={mData as iMembership}
                /> : <MembershipLoader/>
            }
        </View>
    </ScrollView>
  )
}

const MembershipLoader = ()=>{
    const [cardDimension, setCardDimension] = useState({width:0, height: 0} as {width: number, height: number})
    const colorValue = new Animated.Value(0);
    const backgroundColor = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#1e1e1ec3", "#1e1e1e41"],
    });
    
    Animated.loop(
        Animated.sequence([
            Animated.timing(colorValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(colorValue, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }),
        ])
    )
    return (
        <View style={styles.memberShipCard}>
            <View style={styles.card}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <View style={{display: "flex",
                        flexDirection: "column", gap: 2}}>
                            <Animated.View style={[backgroundColor, {
                                backgroundColor: "#181818",
                                height: 10,
                                width: 80
                            }]}></Animated.View>
                            <Animated.View style={[backgroundColor, {
                                backgroundColor: "#181818",
                                height: 10,
                                width: 60
                            }]}></Animated.View>
                    </View>
                    <Animated.View style={[backgroundColor, {
                        height: 20,
                        width: 60,
                        backgroundColor: "#181818"
                    }]}></Animated.View>
                </View>
                <Animated.View style={[backgroundColor, {
                    height: 30,
                    width: "100%",
                    backgroundColor: "#181818"
                }]}></Animated.View>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch: any)=>({
    setMembership: (data: iMembership)=> dispatch(setMembershipAction(data))
})

const mapStateToProps = (state: any)=>({
    membership: state.clientHome?.membership,
    user: state.auth.user,
    businessData: state.dashboard.selectedBusiness
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientHome)

const styles = StyleSheet.create({
    clientHome: {
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    card:{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        justifyContent: "space-between",
        left: 0,
        gap: 5,
        zIndex: 99,
        padding: 20,
        width: "100%",
        height: "100%",
    },
    memberShipCard:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        position: "relative",
        backgroundColor: cardColor,
        elevation: 6,
        height: Dimensions.get("screen").height * 0.23,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: primaryColor,
    },
    svgContainer:{
        height: "100%",
        width: "30%",
    },
})