import { Dimensions, LayoutAnimation, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { amountColor, borderColor, cardColor, goldColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { apiResponse, iTransactions } from '../interfaces/common'
import { setTransactions } from '../redux/actions'
import { getClientTransactions } from '../services/apiCalls/serviceCalls'
import NoData from '../components/Common/NoData'

type props = {
    type?: string,
    setTransactions: any,
    transactions: iTransactions[], 
    mode: string
}

const Transactions = ({type, setTransactions, transactions, mode}: props) => {
    const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
    const [reload, setReload] = useState(false as boolean);

    const getAllTransactions = async ()=>{
        setTransactions([])
        let data: apiResponse | null = null;
        if(mode === "client"){
            data = await getClientTransactions("client");
        }else if(mode === "all"){
            data = await getClientTransactions("all");
        }
        if(data && data?.status === 200){
            setTransactions(data.data);
            setFetchFailed(false);
        }else if(data?.status === 500 || data?.status === undefined){
            setFetchFailed(true);
        }
    }

    const start = ()=>{
        getAllTransactions();
    }

    useEffect(()=>{
        if(reload){
          start();
          setReload(false);
        }
    }, [reload]);

    useEffect(()=>{
        start();
    },[])
  return (
    <View style={styles.transactionScreen}>
        {
            transactions.length ? 
                <ScrollView style={styles.transactionScroll} showsVerticalScrollIndicator={false}>
                    {
                        transactions.map((d)=>{
                            return (
                                <View style={styles.card} key={d.transactionId}>
                                    <View style={styles.detail}>
                                        <View style={styles.dateView}>
                                            <Text style={styles.month}>{
                                                d.dateString?.split(" ")[1] + " " + d.dateString?.split(" ")[2]
                                            }</Text>
                                            <Text style={styles.date}>{d.dateString?.split(" ")[0]}</Text>
                                        </View>
                                        <View style={styles.descView}>
                                            <Text style={styles.membershipText}>{d.packDetails.tier.toUpperCase() + " MEMBERSHIP"}</Text>
                                        </View>
                                        <Text style={styles.cost}>{"RS " + d.packDetails.cost}</Text>
                                    </View>
                                    <View style={styles.divider}></View>
                                    <View style={styles.bottom}>
                                        <Text style={styles.transactionId}>{"ID: " + d.transactionId}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            : <></>
        }
        {
            fetchFailed != undefined ? 
                <NoData
                    text='No Transactions found in this account.'
                    buttons={[]}
                    fetchFailed={fetchFailed}
                    data={transactions}
                    tryAgainClicked={()=>{setReload(true)}}
                />
            : <></>
        }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    transactions: state.transactions.transactions,
    mode: state.transactions.mode,
})

const mapDispatchToProps = (dispatch: any)=>({
    setTransactions: (data: iTransactions[])=>{dispatch(setTransactions(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

const styles = StyleSheet.create({
    transactionScreen:{
        flex:1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        paddingVertical: 15
    },
    transactionCard:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        width: "100%",
        padding: 10,
        borderRadius: 10, 
    },
    amount:{
        color: amountColor,
        fontSize: fontSize.large,
        fontWeight: "500"
    },
    balanceView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    underView:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    value:{
        color: textColorPrimary,
        fontSize: fontSize.xmedium
    },
    part:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    headerDetailView:{
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    titleView:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    titleText:{
        color: borderColor, 
        fontSize: fontSize.xmedium,
        fontWeight: "600"
    },
    transactionScroll:{
        flex: 1,
        width: "100%"
    },
    card:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        backgroundColor: cardColor,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10
    },
    transactionId:{
        color: borderColor,
        fontSize: fontSize.small
    },
    detail:{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10
    },
    bottom:{
        width: "100%"
    },
    divider:{
        height: 2,
        width: "100%",
        backgroundColor: "#101010",
        borderRadius: 10
    },
    dateView:{
        backgroundColor: "#191919",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    date:{
        fontSize: fontSize.medium,
        color: borderColor,
        fontWeight: "500"
    },
    month:{
        fontSize: fontSize.small,
        color: borderColor
    },
    descView:{
        flex: 1
    },
    cost:{
        color: "#005113",
        fontWeight: "600",
        fontSize: fontSize.xmedium
    },
    membershipText:{
        color: goldColor
    }
})