import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { setLoader } from '../redux/actions'
import Loading from '../components/Common/Loading'
import NoData from '../components/Common/NoData'
import { borderColor, iconColor } from '../styles/colors'


const TermsAndConditions = () => {
  const [error, setError] = useState<boolean>(false)
  const renderLoading = () => (
    <Loading/>
  );

  return (
      <>
        {
          !error ? 
            <WebView
              source={{uri: Config?.TERMS_AND_CONDITIONS || "https://trackoweb-e3623.web.app/terms-and-conditions"}}
              style={{flex: 1}}
              startInLoadingState={true}
              renderLoading={renderLoading}
              onHttpError={()=>{setError(true)}}
            />
          : <View style={{flex: 1}}><Text style={{textAlign: "center", marginTop: 30, color: borderColor}}>Cannot load Terms and Condition now. Try again later</Text></View>
        }
      </>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
})

export default connect(null, mapDispatchToProps)(TermsAndConditions)

const styles = StyleSheet.create({})