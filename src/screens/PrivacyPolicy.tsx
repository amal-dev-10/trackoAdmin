import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { setLoader } from '../redux/actions'
import { connect } from 'react-redux'
import Loading from '../components/Common/Loading'
import { borderColor } from '../styles/colors'

const PrivacyPolicy = () => {
  const [error, setError] = useState<boolean>(false);
  const renderLoading = () => (
    <Loading/>
  );
  return (
    <>
        {
          !error ? 
          <WebView
            source={{uri: Config?.PRIVACY_POLICY || "https://trackoweb-e3623.web.app/privacy-policy"}}
            style={{flex: 1}}
            startInLoadingState={true}
            renderLoading={renderLoading}
            onError={()=>{setError(true)}}
          />
          : <View style={{flex: 1}}><Text style={{textAlign: "center", marginTop: 30, color: borderColor}}>Cannot load Privacy policy now. Try again later</Text></View>
        }
      </>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
})

export default connect(null, mapDispatchToProps)(PrivacyPolicy)

const styles = StyleSheet.create({})