import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from '../stacks/MainStack';
import AuthStack from '../stacks/AuthStack';
import Splash from '../screens/Splash';
import { navigationRef } from './NavigationService';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../components/Common/Loading';
import Confirmation from '../components/Common/Confirmation';

type props = {
    authLoader: boolean,
}

const stack = createStackNavigator();

const RootNavigator = ({authLoader}: props) => {
  return (
    <NavigationContainer ref={navigationRef}>
        <>
            <stack.Navigator screenOptions={{headerShown: false}}>
                <stack.Screen name='Splash' component={Splash}/>
                <stack.Screen name='AuthStack' component={AuthStack}/>
                <stack.Screen name='MainStack' component={MainStack}/>
            </stack.Navigator>
            {
                authLoader ? 
                <Loading/>
                : <></>
            }
            <Confirmation/>
        </>
    </NavigationContainer>
  )
}

const mapStateToProps = (state: any)=>({
    authLoader: state.auth.data.loading,
})

export default connect(mapStateToProps)(RootNavigator)