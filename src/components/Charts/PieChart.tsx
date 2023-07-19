import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryContainer, VictoryPie } from 'victory-native'
import { borderColor, iconColor, textColorPrimary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import { iMembershipInsight } from '../../interfaces/business'
import { connect } from 'react-redux'

type props = {
    insightData: iMembershipInsight
}

const PieChart = ({insightData}: props) => {
    const [data, setData] = useState([] as any[]);
    useEffect(()=>{
        let temp = [
            { x: 'Gold Pack', y: parseInt(insightData.goldCount) },
            { x: 'Silver Pack', y: parseInt(insightData.silverCount) },
            { x: 'Bronze Pack', y: parseInt(insightData.bronzeCount) },
        ]
        let t = temp.filter((x)=>{return x.y != 0});
        setData([
            ...t
        ]);
    }, [insightData]);

  return (
    data.length ? 
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
            padAngle={2}
        />
    </VictoryContainer>
    : <Text style={styles.noDataText}>No Data available</Text>
  )
}

const mapStateToProps = (state: any)=>({
    insightData: state.insight.membershipInsight
})

export default connect(mapStateToProps)(PieChart)

const styles = StyleSheet.create({
    noDataText:{
        color: borderColor,
        fontSize: fontSize.small
    }
})