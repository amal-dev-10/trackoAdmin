import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isAuthenticatedAction, phoneAuthSuccess, setTokenAction } from '../redux/actions/authActions'
import auth from '@react-native-firebase/auth'
import { navigate } from '../navigations/NavigationService'
import { container, showToast } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { textColorPrimary } from '../styles/colors'
import { apiResponse, iOwner } from '../interfaces/common'
import { getOwnerById } from '../services/apiCalls/serviceCalls'
import { Timestamp } from 'firebase/firestore'

type props = {
  setIsAuthenticated: any,
  setToken: any,
  setOwner: any
}

const Splash = ({setIsAuthenticated, setToken, setOwner}: props) => {

  const authStateChanged = async ()=>{
    try{
      let unSubscribe = auth().onAuthStateChanged(async (user)=>{
        let token = await user?.getIdToken();
        if(token){
          setToken(token);
          setIsAuthenticated(true);
          let res: apiResponse = await getOwnerById(user?.uid || "");
          if(res?.status === 200){
            setOwner(res.data);
            navigate("MainStack");
          }else{
            setOwner({
              name: "",
              createdDate: Timestamp.now(),
              phoneNumber: user?.phoneNumber?.replace("+91", "") || "",
              phoneVerified: true,
              rating: "",
              uid: user?.uid || ""
            });
            navigate("AuthStack");
            navigate("Signup");
          }
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
      <IconSet name='tracko-logo' size={20} color={textColorPrimary}/>
    </View>
  )
}

const mapDipatchToProps = (dispatch: any)=>({
  setIsAuthenticated: (is: boolean)=>{dispatch(isAuthenticatedAction(is))},
  setToken: (token: string)=>{dispatch(setTokenAction(token))},
  setOwner: (data: iOwner)=>{dispatch(phoneAuthSuccess(data))},
})

export default connect(null, mapDipatchToProps)(Splash)

const styles = StyleSheet.create({
  splashScreen:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})