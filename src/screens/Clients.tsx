import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute, showToast } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from '../styles/colors'
import MembershipCard from '../components/Common/MembershipCard'
import { apiResponse, memberShipProps } from '../interfaces/common'
import { setAllClients, setDropDownDatAction, setOverlayComponent, setSelectedClient } from '../redux/actions'
import { connect } from 'react-redux'
import { iClient, iFilterQuery, iFilters, iMembership } from '../interfaces/iClient'
import { getAllClients, getFilterCounts } from '../services/apiCalls/serviceCalls'
import NoData from '../components/Common/NoData'
import FilterView from '../components/Common/FilterView'
import Loading from '../components/Common/Loading'
import { fontSize } from '../styles/fonts'

type props = {
  setSelectedClient: any,
  setClients: any,
  clients: iMembership[],
  openOverlay: any,
  setDropDownData: any,
  filterActive: boolean
}

const Clients = ({clients, setClients, setSelectedClient, openOverlay, setDropDownData, filterActive}: props) => {

  const [searchText, setSearchText] = useState(null as any);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [showFilter, setShowFilter] = useState(false as boolean);
  const [filterLoader, setFilterLoader] = useState(false as boolean);
  const [serviceMsg, setServieMsg] = useState("" as string);

  const getAllClientsFromDb = async (query: iFilterQuery, disableLoader: boolean)=>{
    let resp: apiResponse = await getAllClients(query, disableLoader);
    setServieMsg(resp?.message || "Server Error");
    if(resp?.status === 200){
      setClients(resp.data)
      setFetchFailed(false)
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true);
    }
  }

  const applyFilterClick = async (q: iFilterQuery)=>{
    setFilterLoader(true);
    await getAllClientsFromDb(q, true);
    setFilterLoader(false);
  }

  const getData = async ()=>{
    let resp: apiResponse = await getFilterCounts();
    if(resp?.status === 200){
      setDropDownData(resp.data);
    }
  }

  const startSearch = async ()=>{
    if(searchText != null){
      let query: iFilterQuery = {
        search: searchText as string
      }
      applyFilterClick(query);
    }  
  }

  useEffect(()=>{
    getData();
    setRoute("Clients");
    if(!clients.length){
      getAllClientsFromDb({count: 4}, false)
    }
  }, [])

  return (
    <View style={[styles.clientScreen, container]}>
      <View style={styles.toolsRow}>
        <View style={styles.searchView}>
          <IconSet name='search' color={iconColor} size={25}/>
          <TextInput
            style={styles.input}
            placeholder='Search by name or phone'
            onChangeText={(e)=>{setSearchText(e)}}
            keyboardType='default'
            cursorColor={iconColor}
            placeholderTextColor={borderColor}
          />
          <TouchableOpacity style={[styles.btn]} onPress={()=>{startSearch()}} activeOpacity={0.7}>
              <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={()=>{setShowFilter(true)}}>
          <IconSet name='filter' color={iconColor} size={23}/>
          {
            filterActive ? 
              <View style={styles.filterActive}></View>
            : <></>
          }
        </TouchableOpacity>
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
            text={serviceMsg}
            onTouch={(button: string)=>{button === "Add Client" ? openOverlay(6) : ""}} 
            buttons={["Add Client"]}
            fetchFailed={fetchFailed}
            data={clients}
          />
      }
      {
        showFilter &&
        <FilterView 
          toggleFilterView = {()=>{setShowFilter(!showFilter)}}
          applyFilterClicked={(query: iFilterQuery)=>{applyFilterClick(query)}}
        />
      }
      {
        filterLoader ? 
        <Loading/> : <></>
      }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  clients: state.client.clients,
  filterActive: state.client.filters?.filterActive || false
});

const mapDispatchToProps = (dispatch: any)=>({
  setClients: (data: iMembership[])=>dispatch(setAllClients(data)),
  setSelectedClient: (data: iMembership)=>dispatch(setSelectedClient(data)),
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  setDropDownData: (data: iFilters[])=>{dispatch(setDropDownDatAction(data))}
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
    flex: 1
  },
  input:{
    flex: 1,
    padding: 0
  },
  clientScroll:{
    flex: 1,
  },
  toolsRow:{
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10
  },
  filterBtn:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  filterActive:{
    height: 7,
    width: 7,
    borderRadius: 10,
    backgroundColor: "crimson",
    position: "absolute",
    right: 0,
    top: 0
  },
  btn:{
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  btnText:{
    color: textColorPrimary,
    fontSize: fontSize.small,
    fontWeight: "600"
  }
})