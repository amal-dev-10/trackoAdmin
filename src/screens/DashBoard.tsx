import { BackHandler, StyleSheet, View, LayoutAnimation, Animated, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { container, setRoute, showToast } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cardColor, textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { apiResponse } from '../interfaces/common'
import DashboardOverlay from '../components/Common/DashboardOverlay'
import { resetStateAction } from '../redux/actions/authActions'
import { connect } from 'react-redux'
import { getAddedOrg, getAllBusiness, getClientBusinessSettings, sendRequest, widthdrawRequest } from '../services/apiCalls/serviceCalls'
import { resetSelectedBusinessAction, setAllBusinesses, setLoader, setOverlayComponent, setSelectedBusiness, updateBusinessSettingsAction } from '../redux/actions'
import { iBusinessSettings, iClientOrgs, ibusiness } from '../interfaces/business'
import { navigate } from '../navigations/NavigationService'
import IconSet from '../styles/icons/Icons'
import NoData from '../components/Common/NoData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { iBusinessClientSettings } from '../interfaces/iClient'

type props = {
  resetAuthState: any,
  allBusiness: (ibusiness | iClientOrgs)[],
  setAllBusiness: any,
  selectBusiness: any,
  openOverlay: any,
  updateSettings: any,
  selectedBusiness: ibusiness,
  settings: iBusinessSettings[],
  resetSelectedBusiness: any,
  setLoading: any
}

const DashBoard = ({resetAuthState, setLoading, resetSelectedBusiness, allBusiness, setAllBusiness, selectBusiness, openOverlay, selectedBusiness, updateSettings, settings}: props) => {
  let clickCount: number = 0;
  const loginMode = useRef<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false as boolean);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [servieMsg, setServiceMsg] = useState("" as string);
  const [reload, setReload] = useState(false as boolean);
  const [refreshing, setRefreshing] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const gotoDashboard = async (businessData: any)=>{
    setLoading(true);
    try{
      let tempBusinessData = businessData;
      let temp = settings;
      let s = [] as {id: string, enabled: boolean}[]
      if(loginMode.current === "admin"){
        s = JSON.parse(businessData?.settings || "[]")
      }else if(loginMode.current === "client"){
        let res: apiResponse = await getClientBusinessSettings(businessData?.uid || "");
        let d = res.data as iBusinessClientSettings
        if(res?.status === 200){
          s = JSON.parse(d?.settings || "[]");
          tempBusinessData.clientVerified = d.phoneVerified;
        }
      }
      s?.forEach((x)=>{
        let index: number = temp.findIndex((d)=>{return d.id === x.id});
        if(index > -1){
          temp[index].enabled = x.enabled
        }
      });
      updateSettings([...temp]);
      selectBusiness(tempBusinessData);
      if(loginMode.current?.toLowerCase() === "admin"){
        setRoute("Home");
        navigate("AdminScreen");
      }else if(loginMode.current?.toLowerCase() === "client"){
        setRoute("Home");
        navigate("ClientScreen");
      }
    }
    catch(err){
      console.log(err)
    }
    setLoading(false);
  }

  const getMyBusiness = async ()=>{
    setAllBusiness([]);
    let resp: apiResponse | null = null;
    if(loginMode.current === "admin"){
      resp = await getAllBusiness();
    }else if(loginMode.current === "client"){
      resp = await getAddedOrg();
    }
    if(resp){
      setServiceMsg(resp?.message || "");
      if(resp?.status === 200){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAllBusiness([...resp?.data]);
        setFetchFailed(false)
      }else if(resp?.status === 500 || resp?.status === undefined){
        setFetchFailed(true)
      }
    }else{
      showToast("Something went wrong.")
    }
  }

  const sendRequestNow = async (data: iClientOrgs)=>{
    let resp: apiResponse = await sendRequest(data?.uid || "");
    if(resp.status === 200){
        let temp = allBusiness as iClientOrgs[]
        let index = allBusiness.findIndex((x)=>{return x.uid === data.uid});
        if(index > -1){
          temp[index].requested = resp.data?.requested
        }
        setAllBusiness(temp);
        showToast("Request send successfully.");
    }else{
        showToast("Something went wrong.")
    }
  }

  const widthdrawRequestNow = async (data: iClientOrgs)=>{
    let resp: apiResponse = await widthdrawRequest(data?.uid || "");
    if(resp.status === 200){
      let temp = allBusiness as iClientOrgs[]
      let index = allBusiness.findIndex((x)=>{return x.uid === data.uid});
      if(index > -1){
        temp.splice(index, 1);
      }
      setAllBusiness(temp);
      showToast("Request withdrawn successfully.");
    }else{
        showToast("Something went wrong.")
    }
  }

  const start = async ()=>{
    await getLoginMode();
    setFetchFailed(undefined);
    resetSelectedBusiness();
    getMyBusiness();
    resetAuthState();
    setRefreshing(false)
  }

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when the user pulls to refresh
    start(); // Fetch data again when refreshing
  };

  useEffect(()=>{
    if(reload){
      start();
      setReload(false);
    }
  }, [reload]);
  
  const getLoginMode = async ()=>{
    let m = await AsyncStorage.getItem("loginMode");
    loginMode.current = m;
  }

  useEffect(()=>{
    setRoute("Dashboard");
    const backAction = ()=>{
      clickCount = clickCount + 1;
      if(clickCount === 2){
        BackHandler.exitApp();
        clickCount = 0
      }else{
        showToast("Back press again to exit the app.")
        setTimeout(()=>{
          clickCount = 0;
        }, 2000)
      }
      return false
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
          subTitle={`Hear you can find all ${loginMode.current?.toLowerCase() === "admin" ? 'your organizations' : loginMode.current?.toLowerCase() === "client" ? 'organizations you added' : ''}`}
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
            <View style={{flex:1, width: "100%"}}>
              <FlatList
                data={allBusiness}
                keyExtractor={(item) => item.uid || ""}
                renderItem={({item})=>(
                  <DashboardCard
                    data={item}
                    onPress={()=>{gotoDashboard(item)}}
                    key={item.uid}
                    loginMode={loginMode.current}
                    onSendRequest={(data: iClientOrgs)=>{sendRequestNow(data)}}
                    onWithdrawRequest={(data: iClientOrgs)=>{widthdrawRequestNow(data)}}
                  />                
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[cardColor]}
                    tintColor={'#ff0000'}
                    title="Pull to refresh" // Set a title while refreshing
                    titleColor={'#ff00ff'} // Customize the title color while refreshing
                  />
                }
                showsVerticalScrollIndicator={false}
              />
            </View> 
          : <></>
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
  updateSettings: (data: iBusinessSettings)=>{dispatch(updateBusinessSettingsAction(data))},
  resetSelectedBusiness: ()=>{dispatch(resetSelectedBusinessAction())},
  setLoading: (loading: boolean)=> dispatch(setLoader(loading))
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