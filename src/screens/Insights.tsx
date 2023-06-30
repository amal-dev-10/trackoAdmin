import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary, unitColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { dropDownProps } from '../interfaces/common';
import { connect } from 'react-redux';
import { key } from '../styles/constants';
import PieChart from '../components/Charts/PieChart';

type props = {
  yearData: dropDownProps[],
  monthData: dropDownProps[]
}

const Insights = ({yearData, monthData}: props) => {
  const [year, setYear] = useState({label: "", value: ""} as dropDownProps);
  const [month, setMonth] = useState({label: "", value: ""} as dropDownProps);

  return (
    <ScrollView style={styles.insightScreen}>
      <View style={styles.membershipInsightSection}>
        <Text>MEMBERSHIP INSIGHTS</Text>
        <View style={styles.dropDownView}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={{fontSize: fontSize.small}}
            selectedTextStyle={{color: iconColor, fontSize: fontSize.small}}
            containerStyle={styles.dropDownContainer}
            data={yearData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'YEAR'}
            value={year.value}
            onChange={function (item): void {
              setYear(item)
            } }
            itemTextStyle={{fontSize: fontSize.small}}
            activeColor='#3e3e3e57'
          />
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={{fontSize: fontSize.small}}
            selectedTextStyle={{color: iconColor, fontSize: fontSize.small}}
            containerStyle={styles.dropDownContainer}
            data={monthData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'MONTH'}
            value={month.value}
            onChange={function (item): void {
              setMonth(item)
            } }
            itemTextStyle={{fontSize: fontSize.small}}
            activeColor='#3e3e3e57'
          />
        </View>
        <View style={[styles.statView, styles.column]}>
          <View style={styles.first}>
            <View style={[styles.section, styles.column]}>
              <Text style={key}>Total</Text>
              <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>42,300</Text>
              </View>
            </View>
          </View>
          <View style={[styles.second, styles.row]}>
            <View style={styles.section}>
              <Text style={key}>Gold</Text>
              <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>12,000</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={key}>Silver</Text>
              <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>8,000</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={key}>Bronze</Text>
              <View style={styles.amountView}>
                <Text style={styles.unit}>RS</Text>
                <Text style={styles.amount}>22,300</Text>
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
              <Text style={styles.statText}>201</Text>
              <Text style={[key, styles.keyAbsolute]}>GOLD</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statText}>201</Text>
              <Text style={[key, styles.keyAbsolute]}>SILVER</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statText}>201</Text>
              <Text style={[key, styles.keyAbsolute]}>BRONZE</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statText}>603</Text>
              <Text style={[key, styles.keyAbsolute]}>TOTAL</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: any)=>({
  monthData: state.dropDown.months,
  yearData: state.dropDown.years
})

export default connect(mapStateToProps)(Insights)

const styles = StyleSheet.create({
  insightScreen:{
    flex: 1,
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    gap: 10,
    paddingTop: 20
  },
  dropdown:{
    width: "35%",
    backgroundColor: cardColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 4,
    borderRadius: 10
  },
  dropDownContainer:{
    backgroundColor: cardColor,
    borderRadius: 10,
    borderWidth: 0,
    elevation: 2,
    marginTop: 5
  },
  dropDownView:{
    display: "flex",
    flexDirection: 'row',
    gap: 10,
    alignItems: "center"
  },
  membershipInsightSection:{
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
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
    alignItems: "center"
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: cardColor,
    elevation: 3
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
  }
})