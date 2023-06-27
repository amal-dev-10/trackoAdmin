import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { amountColor, borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import IconSet from '../styles/icons/Icons'
import { key, subTitleStyle } from '../styles/constants'
import { fontSize } from '../styles/fonts'

type props = {
    type?: string
}

const Transactions = ({type}: props) => {
  return (
    <View style={styles.transactionScreen}>
        <LinearGradient
            colors={["rgba(44,44,44,0)", "rgba(44,44,44,0.7)", cardColor]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.transactionCard]}
        >
            <IconSet name='user-o' color={iconColor} size={60}/>
            <View style={styles.headerDetailView}>
                <View style={styles.balanceView}>
                    <Text style={key}>Total Transfered</Text>
                    <Text style={styles.amount}>12345</Text>
                </View>
                <View style={styles.underView}>
                    <View style={styles.part}>
                        <Text style={key}>Name</Text>
                        <Text style={styles.value}>AMAL DEV</Text>
                    </View>
                    <View style={styles.part}>
                        <Text style={key}>Id</Text>
                        <Text style={styles.value}>PR-24-2023</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
        <View style={styles.titleView}>
            <Text style={[styles.titleText]}>LAST TRANSACTIONS</Text>
        </View>
    </View>
  )
}

export default Transactions

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
    }
})