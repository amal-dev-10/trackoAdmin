import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { container } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { orgProps } from '../interfaces/common'
import DashboardOverlay from '../components/Common/DashboardOverlay'
import { ScrollView } from 'react-native-gesture-handler'

const DashBoard = () => {

  const [org, setOrg] = useState([
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    },
    {
      icon: "building",
      id: "PR-01-2023",
      orgName: "World Fitness center"
    }
  ] as orgProps[]);
  const [showOverlay, setShowOverlay] = useState(false as boolean);

  const openOverlay = ()=>{
    toggleOverlay();
  }

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <View style={[container, styles.dashboardScreen]}>
      <View style={styles.titleRow}>
        <TitleComponent
          title='Dashboard'
          subTitle='Hear you can find all your organizations'
        />
        <TouchableOpacity onPress={()=>{openOverlay()}}>
          <AntDesign size={30} name='plus' color={textColorPrimary}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardView} showsVerticalScrollIndicator={false}>
        {
          org.map((data, i:number)=>{
            return(
              <DashboardCard
                icon={data.icon}
                id={data.id}
                orgName={data.orgName}
                key={i}
              />
            )
          })
        }
      </ScrollView>
      {
        showOverlay &&
        <DashboardOverlay
          show={showOverlay}
          close={()=>{toggleOverlay()}}
        />
      }
    </View>
  )
}

export default DashBoard

const styles = StyleSheet.create({
  dashboardScreen:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    gap: 25
  },
  titleRow:{
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardView:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    width: "100%"
  }
})