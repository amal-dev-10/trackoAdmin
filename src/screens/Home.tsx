import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, shadowGenerator, showToast, wordSplitter } from '../utils/helper'
import { fontSize } from '../styles/fonts'
import { cardColor, iconColor, textColorPrimary } from '../styles/colors'
import { key, subTitleStyle } from '../styles/constants'
import ExpiryCard from '../components/Common/ExpiryCard'
import { setHomeStatsAction, setOverlayComponent } from '../redux/actions'
import { connect } from 'react-redux'
import { apiResponse } from '../interfaces/common'
import { getEndedSubscriptions, getHomeStats } from '../services/apiCalls/serviceCalls'
import { mainStat } from '../interfaces/business'
import { iExpiredData } from '../interfaces/iClient'

type props = {
  openOverlay: any,
  setHomeStat: any,
  stat: mainStat
}

const Home = ({openOverlay, setHomeStat, stat}: props) => {

  const [endedSubs, setEndedSubs] = useState([] as iExpiredData[]);
  const [showLoader, setShowLoader] = useState(false as boolean);

  const getHomeStatsService = async ()=>{
    let resp: apiResponse = await getHomeStats();
    if(resp.status === 200){
      setHomeStat(resp.data);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Stat fetching failed !")
  }
  }

  const getEndedSubs = async ()=>{
    let resp: apiResponse = await getEndedSubscriptions();
    if(resp.status === 200){
      setEndedSubs([...resp.data]);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Ended subscriptions data failed !")
  } 
  }

  const getAllData = async ()=>{
    getHomeStatsService();
    setShowLoader(true);
    await getEndedSubs();
    setShowLoader(false);
  }

  useEffect(()=>{
    getAllData()
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: "100%"}}>
      <Text style={[styles.welcomeText, styles.child]}>{"Hi, " + "Amal Dev"}</Text>
      {/* balance quick view */}
        <View style={[styles.balanceView, styles.child]}> 
          <View style={[styles.leftRight, styles.left]}>
            <Text style={[key]}>TOTAL COLLECTED</Text>
            <Text style={styles.value}>₹ {parseInt(stat.totalAmount).toLocaleString()}</Text>
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
            <Text style={styles.statsValue}>{stat.totalSubscribers}</Text>
            <Text style={styles.additional}>{stat?.month?.toUpperCase() || "MONTH"}</Text>
          </View>
          <View style={styles.statSection}>
            <Text style={[key]}>{wordSplitter("New Members")}</Text>
            <Text style={styles.statsValue}>+{stat.newMembers}</Text>
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
          <View style={styles.titleView}>
            <Text style={[subTitleStyle]}>ENDED SUBSCRIPTIONS</Text>
            <TouchableOpacity style={styles.titleBtn}>
              <Text style={styles.titleBtnText}>View All</Text>
            </TouchableOpacity>
          </View>
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
    </ScrollView>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  setHomeStat: (data: mainStat)=>{dispatch(setHomeStatsAction(data))}
})

const mapStateToProps = (state: any)=>({
  stat: state.homeStat
})

const ExpiryLoader = ()=>{
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
              <View style={styles.imageLoader}>
                <ActivityIndicator
                  size={"large"}
                  color={"#303030c8"}
                />
              </View>
              <View style={styles.detailMainLoader}>
                <View style={styles.detailLoader}>
                  <View style={styles.keyLoader}></View>
                  <View style={styles.valueLoader}></View>
                </View>
                <View style={styles.detailLoader}>
                  <View style={styles.keyLoader}></View>
                  <View style={styles.valueLoader}></View>
                </View>
              </View>
              <View style={styles.buttonLoader}></View>
              <View style={styles.buttonLoader}></View>
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
  }
})