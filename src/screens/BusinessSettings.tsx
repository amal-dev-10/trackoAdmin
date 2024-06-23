import { Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { setSelectedBusiness, updateBusinessSettingsAction } from '../redux/actions'
import { connect } from 'react-redux'
import { iBusinessSettings, ibusiness } from '../interfaces/business'
import Button from '../components/Common/Button'
import { apiResponse } from '../interfaces/common'
import { updateBusinessSettings } from '../services/apiCalls/serviceCalls'
import { showToast } from '../utils/helper'

type props = {
  settings: iBusinessSettings[],
  updateSettings: any,
  selectedBusiness: ibusiness,
  setSelBusiness: any,
  loginMode: string | null
}

const BusinessSettings = ({settings, updateSettings, selectedBusiness, setSelBusiness, loginMode}: props) => {

  const [timeId, setTimeId] = useState(0 as number);
  const [knowMore, setKnowMore] = useState("" as string);

  const showKnowMore = (msg: string)=>{
    setKnowMore(msg);
  }

  const settingsChanged = (id: string)=>{
    if(timeId){
      clearTimeout(timeId);
      setTimeId(0);
    }
    let temp = settings.map((x)=>{
      if(x.id === id){
        x.enabled = !x.enabled;
      };
      return x
    });
    updateSettings([...temp]);
    let t = setTimeout(()=>{
      startUpdatingSettings()
      setTimeId(0);
    }, 3000);
    setTimeId(t);
  }

  const startUpdatingSettings = async ()=>{
    let n = settings.map((x: any)=>{
      delete x.knowMore;
      delete x.name;
      return x
    }) as iBusinessSettings[];
    let resp: apiResponse = await updateBusinessSettings(n);
    if(resp.status === 200){
      if(loginMode === "client"){
        setSelBusiness({...selectedBusiness, clientVerified: n[0].enabled} as ibusiness)
      }
    }else{
      showToast("Something went wrong.");
    }
  }

  return (
    <View style={styles.businessSettingsView}>
      {
        settings.map((d, i: number)=>{
          return (
            <TouchableOpacity 
              style={styles.settingsCard} 
              activeOpacity={0.7} 
              key={"settings" + i}
              onPress={()=>{showKnowMore(d.knowMore)}}
            >
              <View style={[styles.col]}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.settingsText}>{d.name}</Text>
                {
                  d.knowMore ? 
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={()=>{showKnowMore(d.knowMore)}}>
                      <Text style={styles.btnText}>Know more</Text>
                    </TouchableOpacity>
                  : <></>
                }
              </View>
              <View style={styles.switchView}>
                <Text style={styles.enabledText}>{d.enabled ? "ON" : "OFF"}</Text>
                <Switch
                  value={d.enabled}
                  thumbColor={textColorPrimary}
                  trackColor={{false: primaryColor}}
                  style={{elevation: 3}}
                  onChange={()=>{settingsChanged(d.id)}}
                />
              </View>
            </TouchableOpacity>
          )
        })
      }
      <KnowMore msg={knowMore} show={knowMore ? true : false} closeClicked={()=>{setKnowMore("")}}/>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  updateSettings: (data: iBusinessSettings)=>{dispatch(updateBusinessSettingsAction(data))},
  setSelBusiness: (data: ibusiness)=> dispatch(setSelectedBusiness(data))
});

const mapStateToProps = (state: any)=>({
  settings: state.businessSettings.settings,
  selectedBusiness: state.dashboard.selectedBusiness,
  loginMode: state.appState.loginMode
});

const KnowMore = ({msg, show, closeClicked}: {msg: string, show: boolean, closeClicked: any})=>{
  const [showModal, setShowModal] = useState(show as boolean);
  useEffect(()=>{
    setShowModal(show)
  }, [show])
  return (
    showModal ? 
      <Modal transparent onRequestClose={()=>{closeClicked()}}>
        <View style={styles.confirmationView}>
          <View style={styles.container}>
            <View style={styles.headerActivate}>
                <Text style={styles.title}>KNOW MORE</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.msg}>
                  {
                    msg
                  }
              </Text>
            </View>
            <View style={styles.footer}>
              <Button
                  onTouch={()=>{closeClicked()}}
                  text='Close'
                  width='40%'
                  borderLess={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    : <></>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettings)

const styles = StyleSheet.create({
  businessSettingsView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 10
  },
  settingsCard:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: cardColor,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: borderColor,
    width: "100%"
  },
  settingsText:{
    fontSize: fontSize.small,
    color: iconColor,
  },
  enabledText:{
    fontSize: fontSize.small,
    color: borderColor
  },
  switchView:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  col:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    // gap: 5
  },
  btn: {
    // padding: 5
  },
  btnText:{
    fontSize: fontSize.xSmall,
    color: borderColor
  },
  confirmationView:{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11111154"
},
container:{
    backgroundColor: cardColor,
    elevation: 3,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    // minHeight: "30%",
    // maxHeight: "70%",
    width: "90%"
},
headerActivate:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#1d1d1d",
    borderBottomWidth: 2
},
detail:{
    // flex: 1,
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "column",
    gap: 10
},
title:{
    color: iconColor,
    fontSize: fontSize.xmedium
},
footer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 10
},
msg:{
    color: borderColor,
    fontSize: fontSize.small,
    textAlign: "center",
    width: "90%"
}
})