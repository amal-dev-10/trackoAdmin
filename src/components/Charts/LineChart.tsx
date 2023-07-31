import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryLine, VictoryPie, VictoryTheme, VictoryZoomContainer } from 'victory-native'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import { iFinanceInsight, iMembershipInsight } from '../../interfaces/business'
import { connect } from 'react-redux'

type props = {
    financeInsight: iFinanceInsight
}

const LineChart = ({financeInsight}: props) => {

  return (
    financeInsight.data.length ? 
    <VictoryChart
        width={Dimensions.get("window").width * 0.9}
        containerComponent={
            <VictoryZoomContainer zoomDomain={{ x: [1, 30], y: [1000, 8000] }} />
        }
    >
        <VictoryAxis
          // X-axis style
          style={{
            axis: { stroke: borderColor, strokeWidth: 3 },
            tickLabels: { fill: textColorPrimary, fontSize: fontSize.small },
            grid: {stroke: "#1d1d1d8a"},
          }}
          label={financeInsight.month?.toUpperCase()}
        />
        <VictoryAxis
          // Y-axis style
          dependentAxis
          style={{
            axis: { stroke: borderColor, strokeWidth: 3 },
            tickLabels: { fill: textColorPrimary, fontSize: fontSize.small },
            grid: {stroke: "#1d1d1d8a"},
          }}
          label={"AMOUNT"}
        />
        <VictoryLine
            style={{
            data: { stroke: textColorPrimary, strokeWidth: 3, borderRadius: 10 },
            // parent: { border: "2px solid #ccc"},
            }}
            data={financeInsight.data}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
            }}
        />

        {/* <VictoryLabel
          text="JULY"
          x={180} // Adjust the position as per your design
          y={290} // Adjust the position as per your design
          textAnchor="middle"
        /> */}
    </VictoryChart>
    : <Text style={styles.noDataText}>No Data available</Text>
  )
}

const mapStateToProps = (state: any)=>({
    financeInsight: state.insight.financeInsight
})

export default connect(mapStateToProps)(LineChart)

const styles = StyleSheet.create({
    noDataText:{
        color: borderColor,
        fontSize: fontSize.small
    }
})