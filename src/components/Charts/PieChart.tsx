import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryContainer, VictoryPie } from 'victory-native'
import { iconColor, textColorPrimary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'

const PieChart = () => {
    const [data, setData] = useState([
        { x: ``, y: 25 },
        { x: '', y: 50 },
        { x: '', y: 25 },
    ] as any[]);
    useEffect(()=>{
        setData([
            { x: `Gold Pack`, y: 40 },
            { x: 'Silver Pack', y: 20 },
            { x: 'Bronze Pack', y: 40 },
        ])
    }, [])
  return (
    <VictoryContainer responsive={false} 
        height={280}
        width={280}
    >
        <VictoryPie
            data={data}
            colorScale={[textColorPrimary]}
            labelPosition={"centroid"}
            labelPlacement={"perpendicular"}
            innerRadius={60}
            style={{
                labels: {fontSize: fontSize.xSmall, fill: iconColor, fontWeight: "700"},
            }}
            animate={{
                duration: 1000
            }}
            height={270}
            width={270}
            padAngle={5}
        />
    </VictoryContainer>
  )
}

export default PieChart

const styles = StyleSheet.create({})