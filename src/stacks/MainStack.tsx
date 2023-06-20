import {createStackNavigator} from '@react-navigation/stack'
import DashBoard from '../screens/DashBoard';
import BottomNavigator from '../navigations/BottomNavigator';

const mainStack = createStackNavigator();

const MainStack = () => {
  return (
    <mainStack.Navigator initialRouteName='Bottom' screenOptions={{headerShown: false}}>
        <mainStack.Screen name='Dashboard' component={DashBoard}/>
        <mainStack.Screen name='Bottom' component={BottomNavigator}/>
    </mainStack.Navigator>
  )
}

export default MainStack