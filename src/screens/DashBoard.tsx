import { BackHandler, StyleSheet, View, LayoutAnimation, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute, showToast } from '../utils/helper'
import TitleComponent from '../components/Common/TitleComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { borderColor, cardColor, iconColor, textColorPrimary } from '../styles/colors'
import { TouchableOpacity } from 'react-native'
import DashboardCard from '../components/Common/DashboardCard'
import { apiResponse, iOwner } from '../interfaces/common'
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
import { fontSize } from '../styles/fonts'
import Button from '../components/Common/Button'

type props = {
  resetAuthState: any,
  allBusiness: any[],
  setAllBusiness: any,
  selectBusiness: any,
  openOverlay: any,
  updateSettings: any,
  selectedBusiness: ibusiness,
  settings: iBusinessSettings[],
  ownerDetail: iOwner
}

const DashBoard = ({resetAuthState, allBusiness, setAllBusiness, selectBusiness, openOverlay, selectedBusiness, updateSettings, settings, ownerDetail}: props) => {
  let clickCount: number = 0;
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
          subTitle='Hear you can find all your organizations'
        />
        <View style={styles.rightBtnView}>
          {
            (ownerDetail?.subscription && ownerDetail?.subscription?.status === "active") &&
            <TouchableOpacity onPress={()=>{toggleOverlay()}}>
              <AntDesign size={25} name='plus' color={textColorPrimary}/>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={()=>{openOverlay(2)}}>
            <IconSet name='user-circle-o' color={textColorPrimary} size={35}/>
          </TouchableOpacity>
        </View>
      </View>
        {
          (ownerDetail.subscription === undefined || ownerDetail.subscription.status != "active") &&
          <View style={styles.subscriptionView}>
            <View style={styles.container}>
              <View style={styles.headerActivate}>
                  <Text style={styles.title}>Subscribe Now</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.desc}>{
                  "Unlock all the powers of TRACKO ADMIN. Choose from the variety of monthly or yearly subscription plan according to your budget. SUBSCRIBE NOW!"
                }</Text>
              </View>
              <View style={styles.footer}>
                  <Button
                      onTouch={()=>{openOverlay(14)}}
                      text='Upgrade'
                      width='50%'
                  />
              </View>
            </View>
          </View>
        }
        {
          (allBusiness.length && !(ownerDetail.subscription === undefined || ownerDetail.subscription.status != "active")) ?
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
          (fetchFailed != undefined && (ownerDetail.subscription && ownerDetail.subscription.status === "active")) &&
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
  ownerDetail: state.auth.user,
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
  },
  desc:{
    color: borderColor,
    fontSize: fontSize.small,
    textAlign: "center"
  },
  container:{
    backgroundColor: cardColor,
    elevation: 3,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    borderRadius: 10,
    padding: 10,
    width: "90%"
  },
  headerActivate:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomColor: "#1d1d1d",
      borderBottomWidth: 2
  },
  detail:{
      // flex: 1,
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection: "column",
      gap: 10,
  },
  title:{
      color: iconColor,
      fontSize: fontSize.medium
  },
  footer:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10
  },
  subscriptionView:{
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    width: "100%"
  }
})