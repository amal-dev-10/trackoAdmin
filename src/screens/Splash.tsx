import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isAuthenticatedAction, setTokenAction } from '../redux/actions/authActions'
import auth from '@react-native-firebase/auth'
import { navigate } from '../navigations/NavigationService'
import { container } from '../utils/helper'

type props = {
  setIsAuthenticated: any,
  setToken: any
}

const Splash = ({setIsAuthenticated, setToken}: props) => {

  const authStateChanged = async ()=>{
    let unSubscribe = auth().onAuthStateChanged(async (user)=>{
      let token = await user?.getIdToken();
      if(token){
        setIsAuthenticated(true);
        setToken(token);
        navigate("MainStack");
      }else{
        setIsAuthenticated(false);
        setToken("");
        navigate("AuthStack");
      }
      unSubscribe();
    });
  }

  useEffect(()=>{
    authStateChanged()
  }, [])

  return (
    <View style={[container, styles.splashScreen]}>
      <Text>Splash</Text>
    </View>
  )
}

const mapDipatchToProps = (dispatch: any)=>({
  setIsAuthenticated: (is: boolean)=>{dispatch(isAuthenticatedAction(is))},
  setToken: (token: string)=>{dispatch(setTokenAction(token))}
})

export default connect(null, mapDipatchToProps)(Splash)

const styles = StyleSheet.create({
  splashScreen:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})