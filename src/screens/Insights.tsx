import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary, unitColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { apiResponse, dropDownProps } from '../interfaces/common';
import { connect } from 'react-redux';
import MembershipInsight from '../components/Insights/MembershipInsight';
import { iFinanceInsight, iMembershipInsight } from '../interfaces/business';
import { setFinanceInsightAction, setMembershipInsightAction } from '../redux/actions';
import { getInsights } from '../services/apiCalls/serviceCalls';
import { container, setRoute, showToast } from '../utils/helper';
import NoData from '../components/Common/NoData';
import DailyLineChart from '../components/Insights/DailyLineChart';

type props = {
  yearData: dropDownProps[],
  monthData: dropDownProps[],
  setMembershipInsight: any,
  membershipInsight: iMembershipInsight,
  financeInsight: iFinanceInsight,
  setFinanceInsight: any
}

const Insights = ({yearData, monthData, setMembershipInsight, membershipInsight, financeInsight, setFinanceInsight}: props) => {
  const [year, setYear] = useState({label: "", value: ""} as dropDownProps);
  const [month, setMonth] = useState({label: "", value: ""} as dropDownProps);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const chartTypeData = [
    {label: "MEMBERSHIP INSIGHT", value: "membershipInsight"},
    {label: "FINANCE INSIGHT", value: "financeInsight"},
    {label: "CLIENT INSIGHT", value: "newClientInsight"},
  ]
  const [insightType, setInsightType] = useState(chartTypeData[0] as dropDownProps);

  const getData = async (y: string, m: string)=>{
    if(y && m){
      let resp: apiResponse = await getInsights(insightType.value, y, m.toLowerCase());
      if(resp?.status === 200){
          if(insightType.value === "membershipInsight"){
            setMembershipInsight(resp.data);
          }else if(insightType.value === "financeInsight"){
            setFinanceInsight(resp.data);
          }
          setFetchFailed(false)
      }else if(resp?.status === 500 || resp?.status === undefined){
        setFetchFailed(true);
      }
    }
  }

  const loadButtonClicked = ()=>{
    if(membershipInsight.month.toLowerCase() != month.value || membershipInsight.year != year.value){
      getData(year.value, month.value);
    }
  }

  useEffect(()=>{
    getData(year.value, month.value);
  }, [insightType])

  useEffect(()=>{
    setRoute("Insights")
    let currentDate: Date = new Date();
    let m = currentDate.toLocaleString('en-US', {month: "short"});
    let y = currentDate.getFullYear().toString();

    setYear({label: y, value: y});
    setMonth({label: m.toUpperCase(), value: m.toLowerCase()});
    getData(y, m);
  }, []);

  return (
    <View style={[container]}>
      {
        <ScrollView style={styles.insightScreen} showsVerticalScrollIndicator={false}>
          <View style={styles.membershipInsightSection}>
            <View style={styles.insgightTypeView}>
              <Text style={styles.keys}>INSIGHT TYPE</Text>
              <Dropdown
                style={[styles.dropdown, {width: "60%"}]}
                placeholderStyle={{fontSize: fontSize.small}}
                selectedTextStyle={{color: iconColor, fontSize: fontSize.small}}
                containerStyle={styles.dropDownContainer}
                data={chartTypeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                value={insightType.value}
                onChange={function (item): void {
                  setInsightType(item)
                } }
                itemTextStyle={{fontSize: fontSize.small}}
                activeColor='#3e3e3e57'
              />
            </View>
            <Text style={styles.keys}>FILTER BY MONTH & YEAR</Text>
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
              <TouchableOpacity style={styles.loadBtn} onPress={()=>{loadButtonClicked()}}>
                <Text style={styles.btnText}>LOAD</Text>
              </TouchableOpacity>
            </View>
            <Text>{insightType.label.toUpperCase()}</Text>
            {
              insightType.value === "membershipInsight" &&
              <MembershipInsight/>
            }
            {
              insightType.value === "financeInsight" &&
              <DailyLineChart/>
            }
            
          </View>
        </ScrollView>
      }
      {
        fetchFailed != undefined ?
          <NoData
                text='No insights found to load.'
                buttons={[]}
                fetchFailed={fetchFailed}
                data={membershipInsight}
          />
        : <></>
      }
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  monthData: state.dropDown.months,
  yearData: state.dropDown.years,
  membershipInsight: state.insight.membershipInsight,
  financeInsight: state.insight.financeInsight
})

const mapDispatchToProps = (dispatch: any)=>({
  setMembershipInsight: (d: iMembershipInsight)=>{dispatch(setMembershipInsightAction(d))},
  setFinanceInsight: (d: iFinanceInsight)=>{dispatch(setFinanceInsightAction(d))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Insights)

const styles = StyleSheet.create({
  insightScreen:{
    flex: 1,
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    gap: 10,
    paddingTop: 20,
  },
  dropdown:{
    flex: 1,
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
    alignItems: "flex-start",
  },
  insgightTypeView:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    width: "100%"
  },
  keys:{
    fontSize: fontSize.small,
    color: borderColor
  },
  loadBtn:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  btnText:{
    fontSize: fontSize.small,
    color: textColorPrimary,
    fontWeight: "500"
  }
})