import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { shadowGenerator } from '../../utils/helper'
import IconSet from '../../styles/icons/Icons'
import { cardColor, iconColor, primaryColor, textColorPrimary } from '../../styles/colors'
import { key } from '../../styles/constants'
import { fontSize } from '../../styles/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ExpiryCard = () => {
  return (
    <View style={[styles.expiryCard, shadowGenerator(2,2)]}>
      <View style={[styles.imageSection, styles.common]}>
        <IconSet name='user-o' size={60} color={iconColor}/>
        <Text style={styles.nameTag}>AMAL DEV</Text>
      </View>
      <View style={styles.spacer}></View>
      <View style={[styles.detailSection, styles.common]}>
        <View style={styles.part}>
          <Text style={[key]}>Subscription Ended</Text>
          <Text style={styles.value}>12 June 2023</Text>
        </View>
        <View style={styles.part}>
          <Text style={[key]}>Package</Text>
          <Text style={styles.value}>GOLD PACK PRO</Text>
        </View>
      </View>
      <View style={[styles.buttonSection, styles.common]}>
        <TouchableOpacity style={styles.btn}  activeOpacity={0.7}>
          <Text style={styles.btnText}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}  activeOpacity={0.7}>
          <Text style={styles.btnText}>View Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ExpiryCard

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