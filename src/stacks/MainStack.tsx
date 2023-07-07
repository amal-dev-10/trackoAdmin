import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack'
import DashBoard from '../screens/DashBoard';
import BottomNavigator from '../navigations/BottomNavigator';

const mainStack = createStackNavigator();

const MainStack = () => {
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
    <mainStack.Navigator initialRouteName='Dashboard' screenOptions={config}>
        <mainStack.Screen name='Dashboard' component={DashBoard}/>
        <mainStack.Screen name='Bottom' component={BottomNavigator}/>
    </mainStack.Navigator>
  )
}

export default MainStack