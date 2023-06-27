import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRequests } from '../redux/actions'
import { container, shadowGenerator } from '../utils/helper'
import RequestCard from '../components/Common/RequestCard'
import { requestsProps } from '../interfaces/common'
import { borderColor, cardColor, iconColor } from '../styles/colors'
import IconSet from '../styles/icons/Icons'

type props = {
  allRequests: requestsProps[],
  getRequestsData: any
}

const Requests = ({allRequests,getRequestsData}: props) => {
  useEffect(()=>{
    getRequestsData();
  }, [])
  return (
    <ScrollView style={[styles.requestScreen, container]} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        {
          allRequests.map((data, i:number)=>{
            return (
              <RequestCard key={"requestCard"+i} requestData={data}/>
            )
          })
        }
        <TouchableOpacity style={[styles.requestCard, shadowGenerator()]}>
          <IconSet name='user-o' color={iconColor} size={30}/>
          <Text style={styles.addText}>Click here to add clients to your organization</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: any)=>({
  allRequests: state.requests.allRequests
});

const mapDispatchToProps = (dispatch: any)=>({
  getRequestsData: ()=>{dispatch(getRequests())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests) 

const styles = StyleSheet.create({
  requestScreen:{
    flex: 1,
    height: "100%",
  },
  wrapper:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    flex: 1,
    height: "100%",
  },
  requestCard:{
    backgroundColor: cardColor,
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "48%"
  },
  addText:{
    textAlign: "center",
    color: borderColor
  }
})