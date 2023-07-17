import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack'
import DashBoard from '../screens/DashBoard';
import BottomNavigator from '../navigations/BottomNavigator';
import { connect } from 'react-redux';
import Overlay from '../screens/Overlay';
import { overlayComponent } from '../interfaces/common';

const mainStack = createStackNavigator();

type props = {
  allOverlays: overlayComponent[],
}

const MainStack = ({allOverlays}: props) => {
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
  return (
    <>
      <mainStack.Navigator initialRouteName='Dashboard' screenOptions={config}>
          <mainStack.Screen name='Dashboard' component={DashBoard}/>
          <mainStack.Screen name='Bottom' component={BottomNavigator}/>
      </mainStack.Navigator>
      {
        allOverlays.map((data, i: number)=>{
          return (
            <Overlay key={"overlay" +i} overlayData={data}/>
          )
        })
      }
    </>
  )
}

const mapStateToProps = (state: any)=>({
  allOverlays: state.overlay.opendedComponents
});

export default connect(mapStateToProps)(MainStack)