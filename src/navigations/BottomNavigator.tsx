import { BackHandler, StyleSheet, View } from 'react-native';
import { container, tabBarHeight } from '../utils/helper';
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
import { useEffect } from 'react';
import MainLoader from '../components/Loader/MainLoader';

type bottomTabPropsInt = {
  bottomTabData: tabDataInterface,
  showLoader: any
}

const BottomNavigator = ({bottomTabData, showLoader}: bottomTabPropsInt) => {
  //for loader testing
  // useEffect(()=>{
  //   showLoader(true)
  //   let t = setTimeout(()=>{
  //     showLoader(false)
  //     clearTimeout(t);
  //   }, 5000)
  // },[])
  useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress", ()=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigator);

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