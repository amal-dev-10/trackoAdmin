import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isAuthenticatedAction, setTokenAction } from '../redux/actions/authActions'
import auth from '@react-native-firebase/auth'
import { navigate } from '../navigations/NavigationService'
import { container } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { textColorPrimary } from '../styles/colors'

type props = {
  setIsAuthenticated: any,
  setToken: any
}

const Splash = ({setIsAuthenticated, setToken}: props) => {

  const authStateChanged = async ()=>{
    try{
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
    catch(err){
      console.log(err)  
    }
  }

  useEffect(()=>{
    authStateChanged()
  }, [])

  return (
    <View style={[container, styles.splashScreen]}>
      <IconSet name='tracko-logo' size={23} color={textColorPrimary}/>
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