import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getRequests, setClientMode, setOverlayComponent } from '../redux/actions'
import { container, setRoute, shadowGenerator } from '../utils/helper'
import RequestCard from '../components/Common/RequestCard'
import { requestsProps } from '../interfaces/common'
import { borderColor, cardColor, textColorPrimary } from '../styles/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NoData from '../components/Common/NoData'

type props = {
  allRequests: requestsProps[],
  getRequestsData: any,
  openOverlay: any,
  clientMode: any
}

const Requests = ({allRequests,getRequestsData, openOverlay, clientMode}: props) => {
  const [fetchFailed, setFetchFailed] = useState(true as boolean | undefined);

  const noDataButtonClicked = (button: string)=>{
    if(button === "Add Client"){
      clientMode("add");
      openOverlay(6);
    }
  }

  useEffect(()=>{
    setRoute("Requests")
    getRequestsData();
  }, [])
  return (
    <View style={[container]}>
      {
        allRequests?.length ? 
          <ScrollView style={[styles.requestScreen]} showsVerticalScrollIndicator={false}>
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
        : <></>
      }
      {
        fetchFailed != undefined &&
        <NoData 
          text='No pending or new requests from clients. You can directly add client to your business here'
          onTouch={(button: string) => { noDataButtonClicked(button) } }
          buttons={["Add Client"]}
          data={allRequests} 
          fetchFailed={false}
        />
      }

      <TouchableOpacity style={[styles.requestCard, shadowGenerator()]} onPress={()=>{clientMode("add");openOverlay(6)}}>
        <AntDesign size={25} name='plus' color={textColorPrimary}/>
        {/* <Text style={styles.addText}>Click here to add clients to your organization</Text> */}
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  allRequests: state.requests.allRequests
});

const mapDispatchToProps = (dispatch: any)=>({
  getRequestsData: ()=>{dispatch(getRequests())},
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  clientMode: (mode: string)=>{dispatch(setClientMode(mode))}
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
    position: "absolute",
    backgroundColor: cardColor,
    borderRadius: Dimensions.get("window").width * 0.15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.18,
    width: Dimensions.get("window").width * 0.18,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#1e1e1e",
    right: 0,
    bottom: 10
  },
  addText:{
    textAlign: "center",
    color: borderColor
  }
})