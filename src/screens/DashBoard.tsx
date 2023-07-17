import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { apiResponse } from '../interfaces/common'
import DashboardOverlay from '../components/Common/DashboardOverlay'
import { ScrollView } from 'react-native-gesture-handler'
import { logout, resetStateAction } from '../redux/actions/authActions'
import { connect } from 'react-redux'
import { getAllBusiness, getOwnerById } from '../services/apiCalls/serviceCalls'
import { setAllBusinesses, setOverlayComponent, setSelectedBusiness } from '../redux/actions'
import { ibusiness } from '../interfaces/business'
import { navigate } from '../navigations/NavigationService'
import IconSet from '../styles/icons/Icons'

type props = {
  resetAuthState: any,
  allBusiness: any[],
  setAllBusiness: any,
  selectBusiness: any,
  openOverlay: any
}

const DashBoard = ({resetAuthState, allBusiness, setAllBusiness, selectBusiness, openOverlay}: props) => {

  const [showOverlay, setShowOverlay] = useState(false as boolean);

  // const openOverlay = ()=>{
  //   toggleOverlay();
  // }

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  // const tester = async ()=>{
  //   let res = await getOwnerById("7bcd340f-1ad5-44f9-baa1-d85280b190ab");
  //   console.log(res)
  // }

  const gotoDashboard = (businessData: ibusiness)=>{
    selectBusiness(businessData);
    navigate("Bottom");
  }

  const getMyBusiness = async ()=>{
    let resp: apiResponse | null = await getAllBusiness();
    if(resp?.status === 200){
      setAllBusiness([...resp.data]);
    }
  }

  useEffect(()=>{
    resetAuthState();
    getMyBusiness()
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
          <TouchableOpacity onPress={()=>{toggleOverlay()}}>
            <AntDesign size={25} name='plus' color={textColorPrimary}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{openOverlay(2)}}>
            <IconSet name='user-circle-o' color={textColorPrimary} size={35}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardView} showsVerticalScrollIndicator={false}>
        {
          allBusiness.map((data: ibusiness, i:number)=>{
            return(
              <DashboardCard
                icon={"building"}
                id={data?.uid || ""}
                orgName={data.name}
                onPress={()=>{gotoDashboard(data)}}
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
  resetAuthState: ()=>{dispatch(resetStateAction())},
  setAllBusiness: (businessArray: any[])=>{dispatch(setAllBusinesses(businessArray))},
  selectBusiness: (businessData: any)=>{dispatch(setSelectedBusiness(businessData))},
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
});

const mapStateToProps = (state: any)=>({
  fetchData: state.fetch,
  allBusiness: state.dashboard.businesses
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
    width: "100%",
    padding: 5
  },
  rightBtnView:{
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  }
})