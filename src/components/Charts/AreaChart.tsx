import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderColor, cardColor, goldColor, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import { VictoryArea, VictoryAxis, VictoryChart } from 'victory-native'

type props = {
    data: any
}

const AreaChart = ({data}: props) => {
  return (
    <VictoryChart>
        <VictoryArea
            data={data}
            x="day"  // X-axis data key (day)
            y="revenue"  // Y-axis data key (revenue)
            style={{
                data: { fill: cardColor, fillOpacity: 0.7, stroke: borderColor, strokeWidth: 2 },
            }}
            sortOrder='ascending'
        />
        <VictoryAxis
            style={{
                axis: { stroke: goldColor, strokeWidth: 2},
                ticks: { stroke: textColorSecondary, size: 5 },
                tickLabels: { fontSize: fontSize.xSmall, padding: 5, fill: borderColor },
            }}
            tickValues={data.filter((_: any, index: number) => index % 1 === 0).map((d: any) => d.day)}
            label={"Date"}
        />
        <VictoryAxis
            dependentAxis
            style={{
                axis: { stroke: goldColor, strokeWidth: 2},
                ticks: { stroke: textColorSecondary, size: 5 },
                tickLabels: { fontSize: fontSize.xSmall, padding: 5, fill: borderColor },
            }}
            tickValues={data.map((x: any)=>{return Math.abs(x.revenue)})}
        />
    </VictoryChart>
  )
}

export default AreaChart

const styles = StyleSheet.create({})