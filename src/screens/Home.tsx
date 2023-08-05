import { ActivityIndicator, Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute, shadowGenerator, showToast, wordSplitter } from '../utils/helper'
import { fontSize } from '../styles/fonts'
import { amountColor, borderColor, cardColor, goldColor, iconColor, textColorPrimary, unitColor } from '../styles/colors'
import { key, subTitleStyle } from '../styles/constants'
import ExpiryCard from '../components/Common/ExpiryCard'
import { setHomeStatsAction, setOverlayComponent, setTransactionMode } from '../redux/actions'
import { connect } from 'react-redux'
import { apiResponse, iTransactions } from '../interfaces/common'
import { calculateExpiry, getClientTransactions, getEndedSubscriptions, getHomeStats } from '../services/apiCalls/serviceCalls'
import { mainStat } from '../interfaces/business'
import { iExpiredData } from '../interfaces/iClient'

type props = {
  openOverlay: any,
  setHomeStat: any,
  stat: mainStat,
  mode: any
}

const Home = ({openOverlay, setHomeStat, stat, mode}: props) => {

  const [endedSubs, setEndedSubs] = useState([] as iExpiredData[]);
  const [recentTransaction, setRecentTransactions] = useState([] as iTransactions[]);
  const [showLoader, setShowLoader] = useState(false as boolean);

  const viewAllTransactions = ()=>{
    mode("all");
    openOverlay(1);
  }

  const getHomeStatsService = async ()=>{
    let resp: apiResponse = await getHomeStats();
    if(resp?.status === 200){
      setHomeStat(resp.data);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Stat fetching failed !")
    }
  }

  const getEndedSubs = async ()=>{
    let resp: apiResponse = await getEndedSubscriptions();
    if(resp?.status === 200){
      setEndedSubs([...resp.data]);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Ended subscriptions data failed !")
    } 
  }

  const getRecenetTransactions = async ()=>{
    let resp: apiResponse = await getClientTransactions("all", 3);
    if(resp?.status === 200){
      setRecentTransactions([...resp.data]);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Failed to load recent transactions !")
    }
  }

  const getAllData = async ()=>{
    getHomeStatsService();
    getRecenetTransactions()
    setShowLoader(true);
    await getEndedSubs();
    setShowLoader(false);
  }

  useEffect(()=>{
    setRoute("Home");
    getAllData();
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: "100%"}}>
      <View style={{padding: 4}}>
        {/* balance quick view */}
          <View style={[styles.balanceView, styles.child]}> 
            <View style={[styles.leftRight, styles.left]}>
              <Text style={[key]}>TOTAL COLLECTED</Text>
              <Text style={styles.value}>₹ {parseInt(stat.amountThisMonth).toLocaleString()}</Text>
              <Text style={styles.month}>{stat?.month?.toUpperCase() || "MONTH"}</Text>
            </View>
            <View style={[styles.leftRight, styles.right]}>
              <Text style={[key]}>TODAY</Text>
              <Text style={styles.value}>₹ {parseInt(stat.amountToday).toLocaleString()}</Text>
            </View>
          </View>
        {/* // */}

        {/* quick stats */}
          <View style={[styles.statsView, shadowGenerator(2,2), styles.child]}>
            <View style={styles.statSection}>
              <Text style={[key]}>{wordSplitter("Total Members")}</Text>
              <Text style={styles.statsValue}>{stat.totalMembers}</Text>
            </View>
            <View style={styles.statSection}>
              <Text style={[key]}>{wordSplitter("Total Subscribers")}</Text>
              <Text style={styles.statsValue}>{stat.membershipThisMonth}</Text>
              <Text style={styles.additional}>{stat?.month?.toUpperCase() || "MONTH"}</Text>
            </View>
            <View style={styles.statSection}>
              <Text style={[key]}>{wordSplitter("New Members")}</Text>
              <Text style={styles.statsValue}>+{stat.newMembersThisMonth}</Text>
              <Text style={styles.additional}>{stat?.month?.toUpperCase() || "MONTH"}</Text>
            </View>
            <View style={styles.statSection}>
              <Text style={[key]}>{wordSplitter("Expired Subscription")}</Text>
              <Text style={styles.statsValue}>{stat.expiredSubs}</Text>
              <Text style={styles.additional}>TODAY</Text>
            </View>
          </View>
        {/* // */}

        {/* expired subs */}
          <View style={styles.endedSubView}>
            {
              endedSubs.length ? 
                <View style={styles.titleView}>
                  <Text style={[subTitleStyle]}>ENDED SUBSCRIPTIONS</Text>
                  <TouchableOpacity style={styles.titleBtn}>
                    <Text style={styles.titleBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              : <></>
            }
            {
              !showLoader ?   
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.scrollView}
                  contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 1}}
                >
                  {
                    endedSubs.map((d, i:number)=>{
                      return (
                        <ExpiryCard key={"expired"+i} data={d}/>
                      )
                    })
                  }
                </ScrollView>
              : <ExpiryLoader/>
            }
          </View>
          <View style={styles.endedSubView}>
            {
              recentTransaction.length ? 
                <View style={styles.titleView}>
                  <Text style={[subTitleStyle]}>RECENT TRANSACTIONS</Text>
                  <TouchableOpacity style={styles.titleBtn} onPress={()=>{viewAllTransactions()}}>
                    <Text style={styles.titleBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              : <></>
            }
            <View style={styles.recentView}>
              {
                recentTransaction.map((d, i:number)=>{
                  return (
                    <View style={styles.recentCard} key={"recent" + i}>
                      <View style={styles.left}>
                        <Text style={styles.tier}>{d.packDetails.tier.toUpperCase()}</Text>
                        <Text style={styles.date}>{d.dateString.toUpperCase()}</Text>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.name}>{`Payment by ${d?.name ? d.name : "Unknown"}`}</Text>
                        <Text style={styles.amount}>RS {d.packDetails.cost}</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
      </View>
    </ScrollView>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  setHomeStat: (data: mainStat)=>{dispatch(setHomeStatsAction(data))},
  mode: (mode: string)=>{dispatch(setTransactionMode(mode))}
})

const mapStateToProps = (state: any)=>({
  stat: state.homeStat
})

const ExpiryLoader = ()=>{

  const colorValue = new Animated.Value(0);
  // Interpolate the color value to create a "wind" effect from left to right
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
  ).start();
  
  return (
    <ScrollView
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.scrollView}
      contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 1}}
      scrollEnabled={false}
    >
      {
        [1,2].map((d,i:number)=>{
          return (
            <View style={styles.expiryCardLoader} key={"loader"+i}>
              <Animated.View style={[styles.imageLoader, { backgroundColor }]}/>
              <View style={styles.detailMainLoader}>
                <View style={styles.detailLoader}>
                  <Animated.View style={[styles.keyLoader, { backgroundColor }]}/>
                  <Animated.View style={[styles.valueLoader, { backgroundColor }]}/>
                </View>
                <View style={styles.detailLoader}>
                  <Animated.View style={[styles.keyLoader, { backgroundColor }]}/>
                  <Animated.View style={[styles.valueLoader, { backgroundColor }]}/>
                </View>
              </View>
              <Animated.View style={[styles.buttonLoader, { backgroundColor }]}/>
              <Animated.View style={[styles.buttonLoader, { backgroundColor }]}/>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  welcomeText:{
    fontSize: fontSize.medium,
    // fontWeight: "500"
  },
  balanceView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
    width: "100%"
  },
  leftRight:{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  left:{
    alignItems: "flex-start",
  },
  right:{
    alignItems: "flex-end"
  },
  value:{
    color: textColorPrimary,
    fontWeight: "600",
    fontSize: fontSize.large
  },
  month:{
    fontSize: fontSize.xSmall,
    color: "gray"
  },
  statsView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    backgroundColor: cardColor
  },
  statsValue:{
    fontSize: fontSize.medium,
    fontWeight: "600",
    color: "white"
  },
  statSection:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    height: "100%"
  },
  child:{
    marginBottom: 25
  },
  spacer:{
    width: 2,
    height: "40%",
    backgroundColor: "gray",
    borderRadius: 10
  },
  additional:{
    color: "gray",
    fontSize: fontSize.xSmall
  },
  endedSubView:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15
  },
  scrollView:{
    width: "100%",
  },
  titleBtn:{
    padding: 5,
  },
  titleView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  titleBtnText:{
    color: iconColor,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontSize: fontSize.small
  },
  expiryCardLoader:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: cardColor,
    width: Dimensions.get("window").width * 0.45,
    flex: 1,
    marginRight: 10,
  },
  imageLoader:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#1e1e1ec9"
  },
  detailLoader:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    width: "100%"
  },
  keyLoader:{
    padding: 5,
    width: "50%",
    backgroundColor: "#1e1e1ec9",
    borderRadius: 10
  },
  valueLoader:{
    padding: 10,
    width: "100%",
    backgroundColor: "#1e1e1ec9",
    borderRadius: 10
  },
  buttonLoader:{
    padding: 15,
    width: "80%",
    backgroundColor: "#1e1e1ec9",
    borderRadius: 30
  },
  detailMainLoader:{
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    gap: 10
  },
  recentView:{
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "100%"
  },
  recentCard:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: cardColor,
    borderRadius: 10,
    elevation: 3
  },
  tier:{
    fontSize: fontSize.small,
    color: textColorPrimary,
    fontWeight: "500"
  },
  name:{
    fontSize: fontSize.xSmall,
    color: "#454545"
  },
  date:{
    fontSize: fontSize.small,
    color: borderColor
  },
  amount:{
    fontSize: fontSize.xmedium,
    color: unitColor
  },
  skeletonLine: {
    height: 12,
    marginLeft: 8,
    borderRadius: 4,
  },
})