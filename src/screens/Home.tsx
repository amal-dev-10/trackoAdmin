import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { container, shadowGenerator, wordSplitter } from '../utils/helper'
import { fontSize } from '../styles/fonts'
import { cardColor, iconColor, textColorPrimary } from '../styles/colors'
import { key, subTitleStyle } from '../styles/constants'
import ExpiryCard from '../components/Common/ExpiryCard'
import { setOverlayComponent } from '../redux/actions'
import { connect } from 'react-redux'

type props = {
  openOverlay: any
}

const Home = ({openOverlay}: props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: "100%"}}>
      <Text style={[styles.welcomeText, styles.child]}>{"Hi, " + "Amal Dev"}</Text>
      {/* balance quick view */}
        <View style={[styles.balanceView, styles.child]}> 
          <View style={[styles.leftRight, styles.left]}>
            <Text style={[key]}>TOTAL COLLECTED</Text>
            <Text style={styles.value}>$ 23,400</Text>
            <Text style={styles.month}>JUNE</Text>
          </View>
          <View style={[styles.leftRight, styles.right]}>
            <Text style={[key]}>TODAY</Text>
            <Text style={styles.value}>$ 1,200</Text>
          </View>
        </View>
      {/* // */}

      {/* quick stats */}
        <View style={[styles.statsView, shadowGenerator(2,2), styles.child]}>
          <View style={styles.statSection}>
            <Text style={[key]}>{wordSplitter("Total Members")}</Text>
            <Text style={styles.statsValue}>201</Text>
          </View>
          <View style={styles.statSection}>
            <Text style={[key]}>{wordSplitter("Total Subscribers")}</Text>
            <Text style={styles.statsValue}>110</Text>
            <Text style={styles.additional}>JUNE</Text>
          </View>
          <View style={styles.statSection}>
            <Text style={[key]}>{wordSplitter("New Members")}</Text>
            <Text style={styles.statsValue}>+5</Text>
            <Text style={styles.additional}>JUNE</Text>
          </View>
          <View style={styles.statSection}>
            <Text style={[key]}>{wordSplitter("Expired Subscription")}</Text>
            <Text style={styles.statsValue}>15</Text>
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
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.scrollView}
            contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 1}}
          >
            <ExpiryCard/>
            <ExpiryCard/>
            <ExpiryCard/>
          </ScrollView>
        </View>
    </ScrollView>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
})

export default connect(null, mapDispatchToProps)(Home)

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
  }
})