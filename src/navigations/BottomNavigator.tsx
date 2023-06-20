import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Clients from "../screens/Clients";
import Home from "../screens/Home";
import Insights from "../screens/Insights";
import Packages from "../screens/Packages";
import Requests from "../screens/Requests";
import { Text, View } from 'react-native';

const bottomTab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <>
      <View><Text>Hi</Text></View>
      <bottomTab.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
          <bottomTab.Screen name="Home" component={Home} options={{}}/>
          <bottomTab.Screen name="Clients" component={Clients}/>
          <bottomTab.Screen name="Requests" component={Requests}/>
          <bottomTab.Screen name="Insights" component={Insights}/>
          <bottomTab.Screen name="Packages" component={Packages}/>
      </bottomTab.Navigator>
    </>
  )
}

export default BottomNavigator