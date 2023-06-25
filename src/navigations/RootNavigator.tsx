import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '../stacks/MainStack';
import AuthStack from '../stacks/AuthStack';
import Splash from '../screens/Splash';

const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowSplash(false);
        }, 1000)
    },[])
  return (
    <NavigationContainer>
        {
            showSplash 
            ?
            <Splash/>
            :
            isAuthenticated ? <MainStack/> : <AuthStack/>

        }
    </NavigationContainer>
  )
}

export default RootNavigator