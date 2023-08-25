import { BackHandler, StyleSheet, View, LayoutAnimation, Animated } from 'react-native'
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
import { setAllBusinesses, setOverlayComponent, setSelectedBusiness, updateBusinessSettingsAction } from '../redux/actions'
import { iBusinessSettings, ibusiness } from '../interfaces/business'
import { navigate } from '../navigations/NavigationService'
import IconSet from '../styles/icons/Icons'
import NoData from '../components/Common/NoData'

type props = {
  resetAuthState: any,
  allBusiness: any[],
  setAllBusiness: any,
  selectBusiness: any,
  openOverlay: any,
  updateSettings: any,
  selectedBusiness: ibusiness,
  settings: iBusinessSettings[]
}

const DashBoard = ({resetAuthState, allBusiness, setAllBusiness, selectBusiness, openOverlay, selectedBusiness, updateSettings, settings}: props) => {

  const [showOverlay, setShowOverlay] = useState(false as boolean);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [servieMsg, setServiceMsg] = useState("" as string);
  const [reload, setReload] = useState(false as boolean);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const gotoDashboard = (businessData: ibusiness)=>{
    let temp = settings;
    let s = JSON.parse(selectedBusiness?.settings || "[]") as {id: string, enabled: boolean}[]
    s.forEach((x)=>{
      let index: number = temp.findIndex((d)=>{return d.id === x.id});
      if(index > -1){
        temp[index].enabled = x.enabled
      }
    });
    updateSettings([...temp]);
    setRoute("Home");
    selectBusiness(businessData);
    navigate("Bottom");
  }

  const getMyBusiness = async ()=>{
    let resp: apiResponse | null = await getAllBusiness();
    setServiceMsg(resp?.message || "");
    if(resp?.status === 200){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setAllBusiness([...resp.data]);
      setFetchFailed(false)
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true)
    }
  }

  const start = ()=>{
    getMyBusiness();
    resetAuthState();
  }

  useEffect(()=>{
    if(reload){
      start();
      setReload(false);
    }
  }, [reload]);

  useEffect(()=>{
    setRoute("Dashboard")
    const backAction = ()=>{
      return true
    }
    start();
    let backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
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
                    // icon={"building"}
                    // location={data?.location || ""}
                    // logo={data?.logoUrl || ""}
                    // orgName={data.name}
                    data={data}
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
            tryAgainClicked={()=>{setReload(true)}}
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
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  updateSettings: (data: iBusinessSettings)=>{dispatch(updateBusinessSettingsAction(data))}
});

const mapStateToProps = (state: any)=>({
  fetchData: state.fetch,
  allBusiness: state.dashboard.businesses,
  selectedBusiness: state.dashboard.selectedBusiness,
  settings: state.businessSettings.settings,
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