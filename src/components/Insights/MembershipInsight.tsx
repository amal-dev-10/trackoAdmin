import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontSize } from '../../styles/fonts'
import { cardColor, iconColor, textColorPrimary, unitColor } from '../../styles/colors'
import { key } from '../../styles/constants'
import PieChart from '../Charts/PieChart'
import { iMembershipInsight } from '../../interfaces/business'
import { connect } from 'react-redux'

type props = {
    insight: iMembershipInsight,
}

const MembershipInsight = ({insight}: props) => {

  return (
    <View style={styles.membershipInsightView}>
        <View style={[styles.statView, styles.column]}>
        <View style={styles.first}>
            <View style={[styles.section, styles.column]}>
            <Text style={key}>Total</Text>
            <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>{insight.totalAmount}</Text>
            </View>
            </View>
        </View>
        <View style={[styles.second, styles.row]}>
            <View style={styles.section}>
            <Text style={key}>Gold</Text>
            <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>{insight.goldAmount}</Text>
            </View>
            </View>
            <View style={styles.section}>
            <Text style={key}>Silver</Text>
            <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>{insight.silverAmount}</Text>
            </View>
            </View>
            <View style={styles.section}>
            <Text style={key}>Bronze</Text>
            <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>{insight.bronzeAmount}</Text>
            </View>
            </View>
        </View>
        </View>
        <View style={styles.memberShipChart}>
            <View style={styles.pieChartView}>
                <PieChart/>
            </View>
            <View style={styles.chartStats}>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>{insight.goldCount}</Text>
                    <Text style={[key, styles.keyAbsolute]}>GOLD</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>{insight.silverCount}</Text>
                    <Text style={[key, styles.keyAbsolute]}>SILVER</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>{insight.bronzeCount}</Text>
                    <Text style={[key, styles.keyAbsolute]}>BRONZE</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>{
                        parseInt(insight.goldCount) + parseInt(insight.silverCount) + parseInt(insight.bronzeCount)
                    }</Text>
                    <Text style={[key, styles.keyAbsolute]}>TOTAL</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    insight: state.insight.membershipInsight
})

export default connect(mapStateToProps)(MembershipInsight)

const styles = StyleSheet.create({
    statView:{
        display: "flex",
        flexDirection: 'column',
        alignItems: "flex-start",
        gap: 10
    },
    section:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    amountView:{
        display: "flex",
        flexDirection: "row",
        gap:5,
        alignItems: "center"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    unit:{
        fontSize: fontSize.xmedium,
        fontWeight: "600",
        color: unitColor
    },
    amount:{
        fontSize: fontSize.xmedium,
        color: textColorPrimary,
        fontWeight: "600",
    },
    second:{
        gap:15,
    },
    first:{

    },
    memberShipChart:{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: 'flex-start',
        width: "100%"
    },
    pieChartView:{
        backgroundColor: cardColor,
        borderRadius: 10,
        padding: 10,
        flex: 1,
        elevation: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 290
    },
    chartStats:{
        display: "flex",
        flexDirection: 'column',
        gap: 30,
        justifyContent: "flex-start",
        alignItems: 'center',
        width: "20%"
    },
    statCard:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: cardColor,
        elevation: 3,
        flex: 1,
        width: "100%"
    },
    statText:{
        color: iconColor,
        fontSize: fontSize.medium
    },
    keyAbsolute:{
        position: "absolute",
        top: -18,
        color: textColorPrimary,
        fontWeight: "600"
    },
    membershipInsightView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5
    },
    column: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
})