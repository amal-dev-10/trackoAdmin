import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack'
import DashBoard from '../screens/DashBoard';
import AdminScreen from '../navigations/AdminScreen'
import { connect } from 'react-redux';
import Overlay from '../screens/Overlay';
import { overlayComponent } from '../interfaces/common';
import MainLoader from '../components/Loader/MainLoader';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import ClientScreen from '../navigations/ClientScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoginModeAction, setNavTabsAction, setOrganizationSettingsAction } from '../redux/actions';

const mainStack = createStackNavigator();

type props = {
  allOverlays: overlayComponent[],
  setLoginMode: any,
  loginMode: string | null,
  setNavigationTab: any,
  setOrganizationSettings: any
}

const MainStack = ({allOverlays, setLoginMode, loginMode, setNavigationTab, setOrganizationSettings}: props) => {
  let config: StackNavigationOptions = {
    headerShown: false,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200,
        },
      },
    },
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  }

  const getLoginMode = async ()=>{
    let mode = await AsyncStorage.getItem("loginMode");
    setLoginMode(mode);
  }

  useEffect(()=>{
    setNavigationTab(loginMode);
    setOrganizationSettings(loginMode)
  }, [loginMode])

  useEffect(()=>{
    getLoginMode()
    const back = BackHandler.addEventListener("hardwareBackPress", ()=>{
        return true
    });
    return ()=>{back.remove()}
  }, []);
  return (
    <>
      <mainStack.Navigator initialRouteName='Dashboard' screenOptions={config}>
          <mainStack.Screen name='Dashboard' component={DashBoard}/>
          <mainStack.Screen name='AdminScreen' component={AdminScreen}/>
          <mainStack.Screen name='ClientScreen' component={ClientScreen}/>
      </mainStack.Navigator>
      {
        allOverlays.map((data, i: number)=>{
          return (
            <Overlay key={"overlay" +i} overlayData={data}/>
          )
        })
      }
      <MainLoader/>
    </>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  setLoginMode: (mode: string | null)=> dispatch(setLoginModeAction(mode)),
  setNavigationTab: (mode: string | null)=> {dispatch(setNavTabsAction(mode))},
  setOrganizationSettings: (mode: string | null) => dispatch(setOrganizationSettingsAction(mode))
})

const mapStateToProps = (state: any)=>({
  allOverlays: state.overlay.opendedComponents,
  loginMode: state.appState.loginMode
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStack)