import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, iconColor } from '../styles/colors'
import MembershipCard from '../components/Common/MembershipCard'
import { memberShipProps } from '../interfaces/common'
import { getMembershipData } from '../redux/actions'
import { connect, useSelector } from 'react-redux'

type props = {
  membershipData: memberShipProps[],
  getMembershipData: any
}

const Clients = ({membershipData, getMembershipData}: props) => {

  const [searchText, setSearchText] = useState("" as string);

  useEffect(()=>{
    getMembershipData()
  }, [])

  return (
    <View style={[styles.clientScreen, container]}>
      <View style={styles.searchView}>
        <IconSet name='home' color={iconColor} size={25}/>
        <TextInput
          style={styles.input}
          placeholder='Search'
          onChangeText={(e)=>{setSearchText(e)}}
          keyboardType='default'
          cursorColor={iconColor}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.clientScroll}>
        {
          membershipData.map((data, i:number)=>{
            return(
              <MembershipCard
                membershipData={data}
                key={"member" + i}
              />
            )
          })
        }
        {/* <MembershipCard
          tier='silver'
        />
        <MembershipCard
          tier='bronze'
        /> */}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  membershipData: state.memberShip.memberShips
});

const mapDispatchToProps = (dispatch: any)=>({
  getMembershipData: (id: number)=>dispatch(getMembershipData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients)

const styles = StyleSheet.create({
  clientScreen:{
    display: "flex",
    flexDirection: 'column',
    gap: 10
  },
  searchView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    borderBottomWidth: 2,
    gap: 10,
    borderBottomColor: borderColor,
    width: "100%"
  },
  input:{
    flex: 1,
    padding: 0
  },
  clientScroll:{
    flex: 1,
  }
})