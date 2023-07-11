import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconSet from '../../styles/icons/Icons'
import { borderColor, cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import { shadowGenerator } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { resetReducerAction, setOverlayComponent } from '../../redux/actions'
import { connect } from 'react-redux'
import { navigate } from '../../navigations/NavigationService'
import { ibusiness } from '../../interfaces/business'
import store from '../../redux/store'
import { bottomTabProps } from '../../interfaces/common'

type props = {
  openOverlay: any,
  selectedBusiness: ibusiness,
  allTabs: bottomTabProps[],
  selectedTab: number
}

const gotoDashboard = ()=>{
  let st = store.dispatch;
  st(resetReducerAction("tabReducer"));
  st(resetReducerAction("clientReducer"));
  st(resetReducerAction("packageReducer"))
  navigate("Dashboard");
}

const mainHeader: React.FC<props> = ({openOverlay, selectedBusiness, allTabs, selectedTab}: props) => {
  return (
    <View style={styles.header}>
      <View style={styles.mainHeaderText}>
        <TouchableOpacity style={styles.orgLogo}>
          <IconSet name='building' size={20} color={iconColor}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orgDropDown, shadowGenerator(2,2)]} onPress={()=>{gotoDashboard()}}>
          <View style={styles.businessNameView}>
            <Text style={styles.orgName}>{selectedBusiness.name.toUpperCase()}</Text>
            <Text style={styles.location}>{", " + selectedBusiness.location.toLowerCase()}</Text>
          </View>
          <IconSet name='left-small' color={iconColor} size={25}/>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.userView}>
      </View> */}
      <Text style={styles.tabName}>{allTabs[selectedTab].name.toUpperCase()}</Text>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
})

const mapStateToProps = (state:any)=>({
  selectedBusiness: state.dashboard.selectedBusiness,
  allTabs: state.bottomTab.allTabs,
  selectedTab: state.bottomTab.activeComponentId
})

export default connect(mapStateToProps, mapDispatchToProps)(mainHeader)

const styles = StyleSheet.create({
  header:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20
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
    flex: 0.8,
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
    fontSize: fontSize.xmedium,
    color: iconColor
  },
  location:{
    fontSize: fontSize.small,
    color: "gray"
  },
  businessNameView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'baseline',
    flexWrap: "wrap"
  },
  tabName:{
    fontSize: fontSize.small,
    color: borderColor
  },
  mainHeaderText:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  orgLogo:{
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: cardColor,
    elevation: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2
  }
})