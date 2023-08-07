import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderColor, cardColor } from '../../styles/colors'
import LineChart from '../Charts/LineChart'
import { fontSize } from '../../styles/fonts'

const DailyLineChart = () => {
  return (
    <View style={styles.lineChartView}>
      <Text style={styles.chartTitle}>DAILY REPORT</Text>
      <LineChart/>
    </View>
  )
}

export default DailyLineChart

const styles = StyleSheet.create({
    lineChartView:{
        backgroundColor: cardColor,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10
    },
    chartTitle:{
        color: borderColor,
        fontSize: fontSize.small
    }
})