import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { iOwner, iSubscription } from '../../interfaces/common'
import { borderColor, goldColor, iconColor, textColorPrimary, textColorSecondary, verifyIconColor } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import IconSet from '../../styles/icons/Icons'
import { connect } from 'react-redux'

type props = {
    data: iSubscription & {selected?: boolean},
    packSelected: any,
    ownerDetail: iOwner
}

const PlanCard = ({data, packSelected, ownerDetail}: props) => {
    const [durationMessage, setDurationMessage] = useState<string>("");
    useEffect(()=>{
        let d = data.priceData.recurring.interval.toLowerCase();
        let n = data.priceData.recurring.interval_count;
        switch(d){
            case "year":
                setDurationMessage(`For ${n} year${n <= 1 ? '' : 's'}`);
                break;
            case "month":
                setDurationMessage(`For ${n} month${n <= 1 ? '' : 's'}`);
                break;
            case "daily":
                setDurationMessage(`For ${n} day${n <= 1 ? '' : 's'}`);
                break;
            default:
                setDurationMessage('');
                break;
        }
    }, [])
  return (
    <TouchableOpacity style={[styles.planCard, data.selected ? styles.cardActive : styles.cardInActive]} activeOpacity={0.7} onPress={()=>{packSelected(data.id)}}>
        {
            ownerDetail.eligibleForTrial &&
            <Text style={styles.trialIndicator}>Eligible for {data.priceData.recurring.trial_period_days} days free trial</Text>
        }
        <View style={[styles.firstRow, styles.row]}>
            <Text style={styles.name}>{data.name.toUpperCase()}</Text>
            <View 
                style={[styles.select, data.selected ? styles.active : styles.inActive]}
            ></View>
        </View>
        <View style={[styles.firstRow, styles.row]}>
            <Text style={styles.duration}>{data.priceData.recurring.interval}</Text>
            <View style={styles.priceView}>
                <Text style={styles.cost}>{data.priceData.currency.toUpperCase() + " " + data.priceData.unit_amount / 100}</Text>
                <Text style={styles.durationMsg}>{durationMessage}</Text>
            </View>
        </View>
        <View style={[styles.column, styles.featureView]}>
            {
                data.features.map((x, i:number)=>{
                    return (
                        <View style={[styles.row, styles.feature]} key={"feature" + i}>
                            <Text style={styles.featureText}>{x.name}</Text>
                            <IconSet name='ok-circle' color={textColorPrimary} size={20}/>
                        </View>
                    )
                })
            }
        </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state: any)=>({
    ownerDetail: state.auth.user,
})

export default connect(mapStateToProps, null)(PlanCard)

const styles = StyleSheet.create({
    planCard:{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        width: "100%",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    cardActive:{
        borderWidth: 2,
        borderColor: textColorPrimary,
    },
    cardInActive:{
        borderWidth: 2,
        borderColor: borderColor,
    },
    name: {
        fontSize: fontSize.large,
        fontWeight: "400",
        color: textColorSecondary
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    firstRow:{
        justifyContent: "space-between"
    },
    select:{
        borderRadius: 30,
        height: 28,
        width: 28
    },
    active:{
        // padding: 10,
        borderWidth: 7,
        borderColor: textColorPrimary,
    },
    inActive: {
        // padding: 12,
        borderWidth: 2,
        borderColor: borderColor,
    },
    duration:{
        fontSize: fontSize.small,
        color: iconColor
    },
    cost:{
        fontSize: fontSize.medium,
        fontWeight: "600",
        color: goldColor
    },
    column:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    first:{
        flex: 1,
        gap: 5,
        alignItems: "flex-start"
    },
    second:{
        gap: 5,
        alignItems: "flex-end"
    },
    featureText:{
        color: iconColor,
        fontSize: fontSize.xmedium
    },
    feature:{
        justifyContent: "space-between"
    },
    featureView:{
        gap: 7
    },
    priceView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    durationMsg:{
        fontSize: fontSize.small,
        color: iconColor
    },
    trialIndicator:{
        padding: 5,
        color: goldColor
    }
})