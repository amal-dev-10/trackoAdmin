import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import { tabDataInterface } from '../../interfaces/common'
import { shadowGenerator } from '../../utils/helper'
import IconSet from '../../styles/icons/Icons'
import { connect } from 'react-redux'
import { tabIconClicked } from '../../redux/actions'


type bottomTabProp = {
  tabData: tabDataInterface,
  tabIconClicked: any
}

const BottomTab = ({tabData, tabIconClicked}: bottomTabProp) => {
  return (
    <View style={[styles.bottomTab]}>
      {
        tabData.allTabs.map((data, i:number)=>{
          return (
            <TouchableOpacity disabled={data.active} style={styles.tab} onPress={()=>{!data.active ? tabIconClicked(data.id) : ''}} key={"tab"+i} activeOpacity={0.7}>
              <IconSet name={data.icon} color={data.active ? textColorPrimary : iconColor} size={22}/>
              {
                data.active &&
                <View style={styles.indicator}></View>
              }
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  tabIconClicked: (id: number)=>dispatch(tabIconClicked(id))
})

const mapStateToProps = (state: any)=>({
  tabData: state.bottomTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomTab)

const styles = StyleSheet.create({
  bottomTab:{
    backgroundColor: cardColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    width: "100%",
    height: "100%",
    elevation: 3
  },
  tab:{
    borderStartColor: "red",
    flex: 1,
    padding: 5,
    display: 'flex',
    justifyContent:"center",
    alignItems: "center",
    height: "100%",
    width: undefined
  },
  indicator:{
    position: "absolute",
    height: 2,
    backgroundColor: textColorPrimary,
    bottom: 0,
    width: "60%",
    borderRadius: 20
  }
})