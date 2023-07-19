import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, showToast } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, iconColor } from '../styles/colors'
import MembershipCard from '../components/Common/MembershipCard'
import { apiResponse, memberShipProps } from '../interfaces/common'
import { setAllClients, setOverlayComponent, setSelectedClient } from '../redux/actions'
import { connect } from 'react-redux'
import { iClient, iMembership } from '../interfaces/iClient'
import { getAllClients } from '../services/apiCalls/serviceCalls'
import NoData from '../components/Common/NoData'

type props = {
  setSelectedClient: any,
  setClients: any,
  clients: iMembership[],
  businessId: string,
  openOverlay: any
}

const Clients = ({clients, setClients, setSelectedClient, businessId, openOverlay}: props) => {

  const [searchText, setSearchText] = useState("" as string);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);

  const getAllClientsFromDb = async ()=>{
    let resp: apiResponse = await getAllClients(businessId);
    if(resp.status === 200){
      setClients(resp.data)
      setFetchFailed(false)
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true);
    }
  }

  useEffect(()=>{
    if(!clients.length){
      getAllClientsFromDb()
    }
  }, [])

  return (
    <View style={[styles.clientScreen, container]}>
      {
        clients?.length ? 
          <View style={styles.searchView}>
            <IconSet name='search' color={iconColor} size={25}/>
            <TextInput
              style={styles.input}
              placeholder='Search'
              onChangeText={(e)=>{setSearchText(e)}}
              keyboardType='default'
              cursorColor={iconColor}
            />
          </View>
        : <></>
      }
      {
        clients.length ? 
        <ScrollView showsVerticalScrollIndicator={false} style={styles.clientScroll}>
          {
            clients.map((data, i:number)=>{
              return(
                <MembershipCard
                  membershipData={data}
                  key={"member" + i}
                />
              )
            })
          }
        </ScrollView> : <></>
      }
      {
        fetchFailed != undefined &&
          <NoData 
            text='No clients are added in this business account. Add your clients here.' 
            onTouch={(button: string)=>{button === "Add Client" ? openOverlay(6) : ""}} 
            buttons={["Add Client"]}
            fetchFailed={fetchFailed}
            data={clients}
          />
      }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  clients: state.client.clients,
  businessId: state.dashboard.selectedBusiness.uid
});

const mapDispatchToProps = (dispatch: any)=>({
  setClients: (data: iMembership[])=>dispatch(setAllClients(data)),
  setSelectedClient: (data: iMembership)=>dispatch(setSelectedClient(data)),
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients)

const styles = StyleSheet.create({
  clientScreen:{
    display: "flex",
    flexDirection: 'column',
    gap: 20
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