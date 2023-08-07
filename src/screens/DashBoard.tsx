import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { apiResponse } from '../interfaces/common'
import DashboardOverlay from '../components/Common/DashboardOverlay'
import { ScrollView } from 'react-native-gesture-handler'
import { resetStateAction } from '../redux/actions/authActions'
import { connect } from 'react-redux'
import { getAllBusiness } from '../services/apiCalls/serviceCalls'
import { setAllBusinesses, setOverlayComponent, setSelectedBusiness } from '../redux/actions'
import { ibusiness } from '../interfaces/business'
import { navigate } from '../navigations/NavigationService'
import IconSet from '../styles/icons/Icons'
import NoData from '../components/Common/NoData'

type props = {
  resetAuthState: any,
  allBusiness: any[],
  setAllBusiness: any,
  selectBusiness: any,
  openOverlay: any
}

const DashBoard = ({resetAuthState, allBusiness, setAllBusiness, selectBusiness, openOverlay}: props) => {

  const [showOverlay, setShowOverlay] = useState(false as boolean);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [servieMsg, setServiceMsg] = useState("" as string);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const gotoDashboard = (businessData: ibusiness)=>{
    selectBusiness(businessData);
    navigate("Bottom");
  }

  const getMyBusiness = async ()=>{
    let resp: apiResponse | null = await getAllBusiness();
    setServiceMsg(resp?.message || "");
    if(resp?.status === 200){
      setAllBusiness([...resp.data]);
      setFetchFailed(false)
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true)
    }
  }

  useEffect(()=>{
    setRoute("Dashboard")
    const backAction = ()=>{
      return true
    }
    let backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    getMyBusiness();
    resetAuthState();
    return () => backHandler.remove()
  },[]);

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
        {
          allBusiness.length ?
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
          </ScrollView> : <></>
        }
        {
          fetchFailed != undefined &&
          <NoData 
            text={servieMsg} 
            onTouch={(button: string)=>{button === "Register" ? toggleOverlay() : ""}} 
            buttons={["Register"]}
            fetchFailed={fetchFailed}
            data={allBusiness}
          />
        }
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