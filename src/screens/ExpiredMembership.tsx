import { Dimensions, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { iExpiredData } from '../interfaces/iClient';
import { apiResponse } from '../interfaces/common';
import { getEndedSubscriptions, sendSMSToClients } from '../services/apiCalls/serviceCalls';
import { getHourGap, showToast } from '../utils/helper';
import ExpiryCard from '../components/Common/ExpiryCard';
import { Checkbox, List } from 'react-native-paper';
import { borderColor, primaryColor, textColorPrimary } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { confirmAction, confirmModalPropertiesAction, showConfirmModalAction } from '../redux/actions';
import { connect } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { iMessageResponse } from '../interfaces/business';
import NoData from '../components/Common/NoData';

type props = {
  setProperties: any,
  showModal: any,
  confirmation: boolean,
  setConfirm: any
}

const ExpiredMembership = ({setProperties, showModal, confirmation, setConfirm}: props) => {
  const [endedSubs, setEndedSubs] = useState([] as (iExpiredData & {selected: boolean, showSelect: boolean, delivered: undefined | boolean})[]);
  const [selectAll, setSelectAll] = useState(false as boolean);
  const [showSelectAll, setShowSelectAll] = useState(false as boolean);
  const [showTools, setShowTools] = useState(false as boolean);
  const [selectedClients, setSelectedClients] = useState([] as string[]);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [reload, setReload] = useState(false as boolean);

  
  const getEndedSubs = async ()=>{
    let resp: apiResponse = await getEndedSubscriptions();
    if(resp?.status === 200){
      LayoutAnimation.configureNext({
        duration: 200, // Adjust the frame rate by changing the duration
        update: {
          type: LayoutAnimation.Types.linear,
        },
      });
      let temp = (resp.data as iExpiredData[]).map((d)=>{
        let t: iExpiredData & {selected: boolean, showSelect: boolean, delivered: undefined | boolean} = {...d, selected: false, showSelect: false, delivered: undefined};
        return t
      });
      setEndedSubs([...temp]);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Ended subscriptions data failed !")
    } 
  }

  const cardClicked = (id: string)=>{
    let temp = endedSubs;
    temp.map((d)=>{
      if(d.showSelect && d.clientId === id){
        d.selected = !d.selected;
      }
      return d
    });
    // let allSelected: boolean = endedSubs.every((d)=>{
    //   let n = d?.notifiedOn as any
    //   let t = new Timestamp(n?._seconds, n?._nanoseconds);
    //   let check = !d.notified || (d.notified && getHourGap(t.toDate().getTime()) >= 24);
    //   if(!check){
    //     return true
    //   }else{
    //     return d.selected
    //   }
    // });
    // console.log(allSelected)
    // if(!allSelected){
    //   temp.map((d)=>{
    //     d.showSelect = false;
    //     d.selected = false;
    //     return d 
    //   });
    // };
    setEndedSubs([...temp]);
  }

  const cardLongPressed = (id: string)=>{
    let temp = endedSubs;
    temp.map((d)=>{
      let n = d?.notifiedOn as any
      let t = new Timestamp(n?._seconds, n?._nanoseconds);
      let check = d.phoneVerified && (!d.notified || (d.notified && getHourGap(t.toDate().getTime()) >= 24));
      if(d.clientId === id){
        if(check){
          d.showSelect = true;
          d.selected = true;
        }else if(!d.phoneVerified){
          showToast("Phone number not verified")
        }else if(getHourGap(t.toDate().getTime()) < 24){
          showToast("Already notified")
        }
      }else{
        if(check){
          d.showSelect = true;
        }
      }
      return d
    });
    setEndedSubs([...temp]);
  }

  const sendSMSClicked = ()=>{
    if(selectedClients.length){
      setProperties({msg: `You have selected ${selectedClients.length} client${selectedClients.length > 1 ? "s" : ""} to send SMS.\nSure that you want to continue.`})
      showModal(true);
    }
  }

  const continueSMSProcess = async()=>{
    let resp: apiResponse = await sendSMSToClients(selectedClients);
    if(resp && resp?.status === 200){
      let respData = resp.data as iMessageResponse[];
      let temp = endedSubs;
      respData.forEach((x)=>{
        let index: number = temp.findIndex((d)=>{return d.clientId === x.clientId});
        if(index > -1){
          temp[index].delivered = x.error === null ? true : false;
          temp[index].notified = x.error === null ? true : false;
          if(x.error === null){
            temp[index].notifiedOn = Timestamp.fromDate(new Date());
            temp[index].showSelect = false;
            temp[index].selected = false;
          }
        };
      });
      setEndedSubs(JSON.parse(JSON.stringify(temp)));
      setDefault()
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true);
    }
    setConfirm(false);
  }

  useEffect(()=>{
    if(confirmation){
      continueSMSProcess()
    }
  }, [confirmation])

  useEffect(()=>{
    let selected: boolean[] = [];
    let list: string[] = []; 
    let eligibilityCheck: boolean[] = [];
    endedSubs.forEach((d)=>{
      let n = d?.notifiedOn as any
      let t = new Timestamp(n?._seconds, n?._nanoseconds);
      let check = d.phoneVerified && (!d.notified || (d.notified && getHourGap(t.toDate().getTime()) >= 24));
      if(!check){
        selected.push(false);
      }else{
        selected.push(d.selected);
        if(d.selected){list.push(d.clientId)};
      }
      eligibilityCheck.push(check);
    });
    setSelectedClients([...list]);
    let someEligible = eligibilityCheck.some((x)=>{return x});
    setShowSelectAll(someEligible);
    let someSelected: boolean = selected.some((x)=>{return x});
    let allSelected: boolean = selected.every((x)=>{return x});
    let everyUnselected: boolean = selected.every((x)=>{return !x});
    if(someSelected){
      setShowTools(true);
      setShowTools(JSON.parse(JSON.stringify(true)));
    }
    if(allSelected){
      setSelectAll(JSON.parse(JSON.stringify(true)));
    }
    if(everyUnselected){
      setShowTools(false);
      setSelectAll(JSON.parse(JSON.stringify(false)));
    }
  }, [endedSubs]);

  useEffect(()=>{
    let temp = endedSubs;
    temp.map((d)=>{
      let n = d?.notifiedOn as any
      let t = new Timestamp(n?._seconds, n?._nanoseconds);
      let check = d.phoneVerified && (!d.notified || (d.notified && getHourGap(t.toDate().getTime()) >= 24));
      if(check){
        d.showSelect = selectAll;
        d.selected = selectAll;
      }
      return d
    });
    setEndedSubs([...temp])
  }, [selectAll])

  const setDefault = ()=>{
    setSelectAll(JSON.parse(JSON.stringify(false)));
    setShowTools(JSON.parse(JSON.stringify(false)));
    setSelectedClients([]);
  }

  const start = async ()=>{
    setDefault();
    await getEndedSubs();
  }

  useEffect(()=>{
    if(reload){
      start();
      setReload(false);
    }
  }, [reload]);

  useEffect(()=>{
    start();
    return ()=>{setDefault()}
  },[]);
  return (
    <View style={styles.mainView}>
      {
        endedSubs.length ? 
          <View style={styles.toolsView}>
            {
              showSelectAll ? 
                <View style={styles.selectAllView}>
                  <Checkbox
                    status={selectAll ? "checked" : "unchecked"}
                    onPress={()=>{setSelectAll(!selectAll)}}
                    color={textColorPrimary}
                    uncheckedColor={borderColor}           
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </View>
              : <></>
            }
            {
              showTools &&
              <View style={styles.allToolsView}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{sendSMSClicked()}} style={styles.btn}>
                  <Text style={styles.btnText}>SEND ALERT</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        : <></>
      }
      <View style={styles.scroller}>
        <ScrollView
          showsVerticalScrollIndicator={false} 
          style={styles.scrollView}
          contentContainerStyle={{paddingTop: 15}}
        >
          <View style={styles.main}>
            {
              endedSubs.map((d, i:number)=>{
                return (
                  <ExpiryCard 
                    key={"expired"+i} 
                    data={d} 
                    longPressed={()=>{cardLongPressed(d.clientId)}} 
                    checkBoxClicked={()=>{cardClicked(d.clientId)}}
                    selectable={true}
                  />
                )
              })
            }
          </View>
        </ScrollView>
      </View>
      {
            fetchFailed != undefined ? 
                <NoData
                    text='No Transactions found in this account.'
                    buttons={[]}
                    fetchFailed={fetchFailed}
                    data={endedSubs}
                    tryAgainClicked={()=>{setReload(true)}}
                />
            : <></>
      }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  confirmation: state.confirmation.confirm
})

const mapDispatchToProps = (dispatch: any)=>({
  showModal: (show: boolean)=>{dispatch(showConfirmModalAction(show))},
  setProperties: (data: {msg?: string, title?: string})=>{dispatch(confirmModalPropertiesAction(data))},
  setConfirm: (confirm: boolean)=>{dispatch(confirmAction(confirm))}
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredMembership)

const styles = StyleSheet.create({
  scrollView:{
    flex: 1
  },
  main:{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    width: "100%"
  },
  mainView:{
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  scroller:{
    flex: 1
  },
  toolsView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: Dimensions.get("window").width * 0.9,
  },
  selectAllView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  selectAllText:{
    color: borderColor,
    fontSize: fontSize.small
  },
  allToolsView:{
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  btn:{
    backgroundColor: textColorPrimary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  btnText:{
    color: borderColor,
    fontSize: fontSize.small,
    fontWeight: "500"
  }
})