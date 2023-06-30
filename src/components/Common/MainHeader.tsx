import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconSet from '../../styles/icons/Icons'
import { cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import { shadowGenerator } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { setOverlayComponent } from '../../redux/actions'
import { connect } from 'react-redux'
import { navigate } from '../../navigations/NavigationService'

type props = {
  openOverlay: any,
}

const mainHeader: React.FC<props> = ({openOverlay}: props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={[styles.orgDropDown, shadowGenerator(2,2)]} onPress={()=>{navigate("Dashboard")}}>
        <Text style={styles.orgName}>WORLD FITNESS CENTER</Text>
        <IconSet name='left-small' color={iconColor} size={25}/>
      </TouchableOpacity>
      <View style={styles.userView}>
        <TouchableOpacity onPress={()=>{openOverlay(2)}}>
          <IconSet name='user-circle-o' color={textColorPrimary} size={40}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
})

export default connect(null, mapDispatchToProps)(mainHeader)

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