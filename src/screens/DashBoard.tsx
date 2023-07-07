import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { orgProps } from '../interfaces/common'
import DashboardOverlay from '../components/Common/DashboardOverlay'
import { ScrollView } from 'react-native-gesture-handler'
import { logout, resetStateAction } from '../redux/actions/authActions'
import { connect } from 'react-redux'
import { getOwnerById } from '../services/apiCalls/serviceCalls'

type props = {
  logout: any,
  resetAuthState: any,
}

const DashBoard = ({logout, resetAuthState}: props) => {

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
  ] as orgProps[]);

  const [showOverlay, setShowOverlay] = useState(false as boolean);

  const openOverlay = ()=>{
    toggleOverlay();
  }

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const tester = async ()=>{
    let res = await getOwnerById("7bcd340f-1ad5-44f9-baa1-d85280b190ab");
    console.log(res)
  }

  useEffect(()=>{
    resetAuthState();
    // tester()
  },[])

  return (
    <View style={[container, styles.dashboardScreen]}>
      <View style={styles.titleRow}>
        <TitleComponent
          title='Dashboard'
          subTitle='Hear you can find all your organizations'
        />
        <View style={styles.rightBtnView}>
          <TouchableOpacity onPress={()=>{openOverlay()}}>
            <AntDesign size={30} name='plus' color={textColorPrimary}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{logout()}}>
            <AntDesign size={25} name='logout' color={textColorPrimary}/>
          </TouchableOpacity>
        </View>
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

const mapDispatchToProps = (dispatch: any)=>({
  logout: ()=>{dispatch(logout())},
  resetAuthState: ()=>{dispatch(resetStateAction())},
});

const mapStateToProps = (state: any)=>({
  fetchData: state.fetch
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)

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
  },
  rightBtnView:{
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  }
})