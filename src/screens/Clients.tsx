import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute, showToast } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, iconColor } from '../styles/colors'
import MembershipCard from '../components/Common/MembershipCard'
import { apiResponse, memberShipProps } from '../interfaces/common'
import { setAllClients, setOverlayComponent, setSelectedClient } from '../redux/actions'
import { connect } from 'react-redux'
import { iClient, iFilterQuery, iMembership } from '../interfaces/iClient'
import { getAllClients } from '../services/apiCalls/serviceCalls'
import NoData from '../components/Common/NoData'

type props = {
  setSelectedClient: any,
  setClients: any,
  clients: iMembership[],
  openOverlay: any
}

const Clients = ({clients, setClients, setSelectedClient, openOverlay}: props) => {

  const [searchText, setSearchText] = useState(null as any);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);

  const getAllClientsFromDb = async (query: iFilterQuery, disableLoader: boolean)=>{
    let resp: apiResponse = await getAllClients(query, disableLoader);
    if(resp?.status === 200){
      setClients(resp.data)
      setFetchFailed(false)
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true);
    }
  }

  useEffect(()=>{
    if(searchText != null){
      setTimeout(()=>{
        let query: iFilterQuery = {
          search: searchText as string
        }
        getAllClientsFromDb(query, true);
      }, 500)
    }
  }, [searchText])

  useEffect(()=>{
    setRoute("Clients")
    if(!clients.length){
      getAllClientsFromDb({count: 4}, false)
    }
  }, [])

  return (
    <View style={[styles.clientScreen, container]}>
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
      {
        clients.length && !fetchFailed ? 
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
            text='No clients found. Add your clients here.' 
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