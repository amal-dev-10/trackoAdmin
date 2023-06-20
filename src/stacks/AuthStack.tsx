import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import Otp from '../components/Auth/Otp';

const authStack = createStackNavigator();

const AuthStack = () => {
  return (
    <authStack.Navigator initialRouteName='Signup' screenOptions={{headerShown: false}}>
        <authStack.Screen name='Login' component={Login}/>
        <authStack.Screen name='Otp' component={Otp}/>
        <authStack.Screen name='Signup' component={SignUp}/>
    </authStack.Navigator>
  )
}

export default AuthStack
