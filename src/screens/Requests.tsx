import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRequests } from '../redux/actions'
import { container } from '../utils/helper'
import RequestCard from '../components/Common/RequestCard'
import { requestsProps } from '../interfaces/common'

type props = {
  allRequests: requestsProps[],
  getRequestsData: any
}

const Requests = ({allRequests,getRequestsData}: props) => {
  useEffect(()=>{
    getRequestsData();
  }, [])
  return (
    <ScrollView style={[styles.requestScreen, container]}>
      <View style={styles.wrapper}>
        {
          allRequests.map((data, i:number)=>{
            return (
              <RequestCard key={"requestCard"+i} requestData={data}/>
            )
          })
        }
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
  }
})