import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '../stacks/MainStack';
import AuthStack from '../stacks/AuthStack';
import Splash from '../screens/Splash';
import { navigationRef } from './NavigationService';

const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(()=>{
        let t = setTimeout(()=>{
            setShowSplash(false);
            if(t){
                clearTimeout(t);
            }
        }, 1000);
    },[]);
  return (
    <NavigationContainer ref={navigationRef}>
        {
            showSplash 
            ?
            <Splash/>
            :
            (isAuthenticated ? <MainStack/> : <AuthStack/>)

        }
    </NavigationContainer>
  )
}

export default RootNavigator