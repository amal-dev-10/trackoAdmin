import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconSet from '../../styles/icons/Icons'
import { cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import { shadowGenerator } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import Icon from 'react-native-vector-icons/FontAwesome';

const mainHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={[styles.orgDropDown, shadowGenerator(2,2)]}>
        <Text style={styles.orgName}>WORLD FITNESS CENTER</Text>
        <IconSet name='down-open' color={iconColor} size={30}/>
      </TouchableOpacity>
      <View style={styles.userView}>
        <TouchableOpacity onPress={()=>{}}>
          <IconSet name='user-circle-o' color={textColorPrimary} size={40}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default mainHeader

const styles = StyleSheet.create({
  header:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orgDropDown:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 10,
    padding:5,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 0.7,
    height: "100%",
    backgroundColor: cardColor,
    borderRadius: 10
  },
  userView:{
    height: "100%",
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  orgName:{
    fontSize: fontSize.small,
    color: iconColor
  }
})