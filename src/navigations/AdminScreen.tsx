import { BackHandler, StyleSheet, View } from 'react-native';
import { container, showToast, tabBarHeight } from '../utils/helper';
import MainHeader from '../components/Common/MainHeader';
import BottomTab from '../components/Common/BottomTab';
import { primaryColor } from '../styles/colors';
import {overlayComponent, tabDataInterface } from '../interfaces/common';
import { connect } from 'react-redux';
import Home from '../screens/Home';
import Clients from '../screens/Clients';
import Requests from '../screens/Requests';
import Insights from '../screens/Insights';
import Packages from '../screens/Packages';
import { setLoader } from '../redux/actions';
import { useEffect, useState } from 'react';
import MainLoader from '../components/Loader/MainLoader';

type bottomTabPropsInt = {
  bottomTabData: tabDataInterface,
  showLoader: any
}

const AdminScreen = ({bottomTabData, showLoader}: bottomTabPropsInt) => {
  let clickCount: number = 0

  useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress", ()=>{
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
    })
  }, [])
  return (
    <View style={[container,styles.main]}>
      <View style={[styles.headerBottomView, {marginBottom: 10}]}>
        <MainHeader/>
      </View>
      <View style={styles.screenRenderView}>
        {
          bottomTabData.activeComponentId === 0 && <Home/>
        }
        {
          bottomTabData.activeComponentId === 1 && <Clients/>
        }
        {
          bottomTabData.activeComponentId === 2 && <Requests/>
        }
        {
          bottomTabData.activeComponentId === 3 && <Insights/>
        }
        {
          bottomTabData.activeComponentId === 4 && <Packages/>
        }
      </View>
      <View style={[styles.headerBottomView, styles.bottomHeight]}>
        <BottomTab/>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  bottomTabData: state.bottomTab,
  allOverlays: state.overlay.opendedComponents
});

const mapDispatchToProps = (dispatch: any)=>({
  showLoader: (show: boolean)=>{dispatch(setLoader(show))}
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);

const styles = StyleSheet.create({
  main:{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: primaryColor
  },
  screenRenderView:{
    display: "flex",
    flex: 1,
  },
  headerBottomView:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHeight:{
    height: tabBarHeight,
  }
})