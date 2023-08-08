import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, setRoute } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { borderColor, iconColor, textColorPrimary } from '../styles/colors'
import MembershipCard from '../components/Common/MembershipCard'
import { apiResponse } from '../interfaces/common'
import { setAllClients, setClientMode, setDropDownDatAction, setOverlayComponent } from '../redux/actions'
import { connect } from 'react-redux'
import { iFilterQuery, iFilters, iMembership } from '../interfaces/iClient'
import { getAllClients, getFilterCounts } from '../services/apiCalls/serviceCalls'
import NoData from '../components/Common/NoData'
import FilterView from '../components/Common/FilterView'
import Loading from '../components/Common/Loading'
import { fontSize } from '../styles/fonts'

type props = {
  setClients: any,
  clients: iMembership[],
  openOverlay: any,
  setDropDownData: any,
  filterActive: boolean,
  clientMode: any
}

const Clients = ({clients, setClients, openOverlay, setDropDownData, filterActive, clientMode}: props) => {

  const [searchText, setSearchText] = useState(null as any);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [showFilter, setShowFilter] = useState(false as boolean);
  const [filterLoader, setFilterLoader] = useState(false as boolean);
  const [serviceMsg, setServieMsg] = useState("" as string);
  const [reload, setReload] = useState(false as boolean);

  const getAllClientsFromDb = async (query: iFilterQuery, disableLoader: boolean)=>{
    let resp: apiResponse = await getAllClients(query, disableLoader);
    setServieMsg(resp?.message || "Server Error");
    if(resp?.status === 200){
      LayoutAnimation.configureNext({
        duration: 200, // Adjust the frame rate by changing the duration
        update: {
          type: LayoutAnimation.Types.linear,
        },
      });
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

  const noDataButtonClicked = (button: string)=>{
    if(button === "Add Client"){
      clientMode("add");
      openOverlay(6);
    }
  }

  const start = ()=>{
    getData();
    getAllClientsFromDb({count: 4}, false)
  }

  useEffect(()=>{
    if(reload){
      start();
      setReload(false);
      setSearchText("");
    }
  }, [reload])

  useEffect(()=>{
    setRoute("Clients");
    if(!clients.length){
      start();
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
            value={searchText}
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
            onTouch={(button: string)=>{noDataButtonClicked(button)}} 
            buttons={["Add Client"]}
            fetchFailed={fetchFailed}
            data={clients}
            tryAgainClicked={()=>{setReload(true)}}
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
  filterActive: state.clientFilter.filterObject?.filterActive || false
});

const mapDispatchToProps = (dispatch: any)=>({
  setClients: (data: iMembership[])=>dispatch(setAllClients(data)),
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  setDropDownData: (data: iFilters[])=>{dispatch(setDropDownDatAction(data))},
  clientMode: (mode: string)=>{dispatch(setClientMode(mode))}
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
    backgroundColor: textColorPrimary,
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