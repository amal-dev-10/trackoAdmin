import { LayoutAnimation, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiResponse, iStripeTransaction } from '../interfaces/common'
import { getStripeTransactions } from '../services/apiCalls/serviceCalls'
import { setStripeTransaction } from '../redux/actions'
import { connect } from 'react-redux'
import NoData from '../components/Common/NoData'
import { amountColor, borderColor, iconColor, unitColor } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import IconSet from '../styles/icons/Icons'
import { openLink, showToast } from '../utils/helper'

type props = {
  setTransactions: any,
  transactions: iStripeTransaction[]
}

const StripeTransactions = ({setTransactions, transactions}: props) => {
  const [fetchFailed, setFetchFailed] = useState<boolean | undefined>(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const [servieMsg, setServiceMsg] = useState("" as string);

  const getData = async ()=>{
    let resp: apiResponse = await getStripeTransactions();
    if(resp && resp.status === 200){
      setTransactions([...resp.data]);
      if(!resp.data.length){
        setServiceMsg("No transactions are done in this account.")
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true)
    }
  }

  const start = ()=>{
    getData();
  }

  useEffect(()=>{
    if(reload){
      start();
    }
  }, [reload]);

  useEffect(()=>{
    start()
    return ()=>{setTransactions([])}
  }, [])
  return (
    <View style={styles.transactionScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.transactionsView}>
          {
            transactions.map((x, i: number)=>{
              return (
                <View style={[styles.card, styles[x.status as keyof object]]} key={"transaction" + i}>
                  <View style={styles.left}>
                    <Text style={styles.status}>{"Status: " + x.status.toUpperCase()}</Text>
                    <View style={styles.leftFirst}>
                      <Text style={styles.desc} numberOfLines={3} ellipsizeMode='tail'>{x.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonView} onPress={()=>{openLink(x.receiptUrl)}}>
                      <IconSet name='download' size={10} color={borderColor}/>
                      <Text style={{color: borderColor, fontSize: fontSize.small}}>Receipt</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.dateText}>{new Date(x.created * 1000).toLocaleString()}</Text>
                    <View style={styles.amountView}>
                      <View style={styles.amountMain}>
                        <Text style={styles.unit}>INR</Text>
                        <Text style={styles.amount}>{(x.amount/100).toFixed(2).split(".")[0]}</Text>
                      </View>
                      <Text style={styles.amountDecimal}>{ "+ ." + (x.amount/100).toFixed(2).split(".")[1]}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
      {
          fetchFailed != undefined &&
          <NoData 
            text={servieMsg}
            buttons={[]}
            fetchFailed={fetchFailed}
            data={transactions}
            tryAgainClicked={()=>{setReload(true)}}
          />
        }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  transactions: state.monetization.stripeTransactions
})

const mapDispatchToProps = (dispatch: any)=>({
  setTransactions: (data: iStripeTransaction[])=>{dispatch(setStripeTransaction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(StripeTransactions)

const styles = StyleSheet.create({
    transactionScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 20
    },
    transactionsView:{
      display: "flex",
      flexDirection: "column",
      gap: 15,
      justifyContent: "flex-start"
    },
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingVertical: 10,
      paddingLeft: 10,
      borderLeftWidth: 5, 
    },
    left:{
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    leftFirst:{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    right:{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    dateText: {
      color: borderColor,
      fontSize: fontSize.xSmall
    },
    amount: {
      color: amountColor,
      fontSize: fontSize.medium,
      // height: "100%",
      // textAlignVertical: "bottom",
    },
    amountView:{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    amountDecimal: {
      color: unitColor,
      fontSize: fontSize.xmedium
    },
    amountMain:{
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      gap: 5
    },
    unit: {
      color: unitColor,
      fontSize: fontSize.small,
      // height: "100%",
      // textAlignVertical: "bottom"
    },
    buttonView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      gap: 5
    },
    status:{
      fontSize: fontSize.xSmall,
      color: borderColor
    },
    failed:{
      borderLeftColor: "crimson"
    },
    succeeded:{
      borderLeftColor: unitColor
    },
    pending:{
      borderLeftColor: "gray"
    },
    canceled:{
      borderLeftColor: "gray"
    },
    desc:{
      width: "100%",
      color: iconColor,
      fontSize: fontSize.small
    }
})