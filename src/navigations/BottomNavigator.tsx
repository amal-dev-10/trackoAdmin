import { StyleSheet, View } from 'react-native';
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
import Overlay from '../screens/Overlay';
import { useEffect } from 'react';

type bottomTabPropsInt = {
  bottomTabData: tabDataInterface,
  allOverlays: overlayComponent[]
}

const BottomNavigator = ({bottomTabData, allOverlays}: bottomTabPropsInt) => {

  return (
    <View style={[container,styles.main]}>
      <View style={styles.headerBottomView}>
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
        <BottomTab tabData={bottomTabData}/>
      </View>
      {
        allOverlays.map((data, i: number)=>{
          return (
            <Overlay key={"overlay" +i} overlayData={data}/>
          )
        })
      }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  bottomTabData: state.bottomTab,
  allOverlays: state.overlay.opendedComponents
});

export default connect(mapStateToProps)(BottomNavigator);

const styles = StyleSheet.create({
  main:{
    display: "flex",
    flexDirection: "column",
    gap: 10,
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