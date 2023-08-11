import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import Otp from '../components/Auth/Otp';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const authStack = createStackNavigator();

const AuthStack = () => {
  useEffect(()=>{
    const back = BackHandler.addEventListener("hardwareBackPress", ()=>{
        return true
    });
    return ()=>{back.remove()}
  }, []);
  return (
    <authStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <authStack.Screen name='Login' component={Login}/>
        <authStack.Screen name='Otp' component={Otp}/>
        <authStack.Screen name='Signup' component={SignUp}/>
    </authStack.Navigator>
  )
}

export default AuthStack
