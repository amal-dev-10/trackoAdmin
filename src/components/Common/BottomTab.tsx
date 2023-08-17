import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import { tabDataInterface } from '../../interfaces/common'
import IconSet from '../../styles/icons/Icons'
import { connect } from 'react-redux'
import { cancelApiCall, tabIconClicked } from '../../redux/actions'


type bottomTabProp = {
  tabData: tabDataInterface,
  tabIconClicked: any,
  cancelApi: any
}

const BottomTab = ({tabData, tabIconClicked, cancelApi}: bottomTabProp) => {
  const clickTabIcon = (id: number)=>{
    let urls: {[key: number]: string[]} = {
      0: ["client/expiredMembership", "client/transactions", "business/homeStats/"],
      1: ["client/filterCount", "client/getAllClients"],
      3: ["business/insights"],
      4: ["business/packages"]
    };
    Object.entries(urls).forEach(([key, value])=>{
      if(parseInt(key) != id){
        value.forEach((x)=>{cancelApi(x)})
      }
    })
    setTimeout(()=>{
      tabIconClicked(id)
    }, 50)
  }
  return (
    <View style={[styles.bottomTab]}>
      {
        tabData.allTabs.map((data, i:number)=>{
          return (
            <TouchableOpacity disabled={data.active} style={styles.tab} onPress={()=>{!data.active ? clickTabIcon(data.id) : ''}} key={"tab"+i} activeOpacity={0.7}>
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
  tabIconClicked: (id: number)=>dispatch(tabIconClicked(id)),
  cancelApi: (url: string)=>dispatch(cancelApiCall(url))
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