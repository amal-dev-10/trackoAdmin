import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openWhatsapp, shadowGenerator } from '../../utils/helper'
import IconSet from '../../styles/icons/Icons'
import { cardColor, iconColor, primaryColor, textColorPrimary } from '../../styles/colors'
import { key } from '../../styles/constants'
import { fontSize } from '../../styles/fonts'
import { iExpiredData } from '../../interfaces/iClient'
import { openOverlayParameter } from '../../interfaces/common'
import { setIdTransactions, setOverlayComponent, setTransactionMode } from '../../redux/actions'
import { connect } from 'react-redux'

type props = {
  data: iExpiredData,
  openOverlay: any,
  mode: any,
  setId: any
}

const ExpiryCard = ({data, mode, openOverlay, setId}: props) => {
  const [ended, setEnded] = useState(data as iExpiredData);
  useEffect(()=>{setEnded(data)},[data]);

  const viewTransaction = ()=>{
    setId(data.clientId);
    mode("client");
    openOverlay(1);
  }

  return (
    <View style={[styles.expiryCard, shadowGenerator(2,2)]}>
      <View style={[styles.imageSection, styles.common]}>
        <IconSet name='user-o' size={60} color={iconColor}/>
        <Text style={styles.nameTag}>{ended.name.toUpperCase()}</Text>
      </View>
      <View style={styles.spacer}></View>
      <View style={[styles.detailSection, styles.common]}>
        <View style={styles.part}>
          <Text style={[key]}>Subscription Ended</Text>
          <Text style={styles.value}>{ended.endedString.toUpperCase()}</Text>
        </View>
        <View style={styles.part}>
          <Text style={[key]}>Package</Text>
          <Text style={styles.value}>{ended.tier.toUpperCase()}</Text>
        </View>
      </View>
      <View style={[styles.buttonSection, styles.common]}>
        <TouchableOpacity style={styles.btn}  activeOpacity={0.7} onPress={()=>{openWhatsapp(data.phoneNumber)}}>
          <Text style={styles.btnText}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}  activeOpacity={0.7} onPress={()=>{viewTransaction()}}>
          <Text style={styles.btnText}>View Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: openOverlayParameter)=>{dispatch(setOverlayComponent(id))},
  setId: (id: string)=>{dispatch(setIdTransactions(id))},
  mode: (mode: string)=>{dispatch(setTransactionMode(mode))}
});

export default connect(null, mapDispatchToProps)(ExpiryCard)

const styles = StyleSheet.create({
  expiryCard:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: cardColor,
    width: Dimensions.get("window").width * 0.45,
    flex: 1,
    marginRight: 10
  },
  common: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  imageSection:{
    alignItems: "center",
    justifyContent:"center",
    gap: 10
  },
  detailSection:{
    alignItems: "flex-start",
    flex: 1,
    gap: 10
  },
  buttonSection:{
    flex: 0.2,
    gap: 20
  },
  part:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  value:{
    color: "white",
    fontSize: fontSize.xmedium
  },
  nameTag:{
    fontSize: fontSize.xmedium,
    fontWeight: "700"
  },
  btn:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10
  },
  spacer:{
    height: 2,
    backgroundColor: primaryColor,
    width: "80%"
  },
  btnText:{
    color: textColorPrimary
  }
})