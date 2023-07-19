import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary, unitColor } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { apiResponse, dropDownProps } from '../interfaces/common';
import { connect } from 'react-redux';
import { key } from '../styles/constants';
import PieChart from '../components/Charts/PieChart';
import MembershipInsight from '../components/Insights/MembershipInsight';
import { iMembershipInsight } from '../interfaces/business';
import { setMembershipInsightAction } from '../redux/actions';
import { getInsights } from '../services/apiCalls/serviceCalls';
import { container, showToast } from '../utils/helper';
import NoData from '../components/Common/NoData';

type props = {
  yearData: dropDownProps[],
  monthData: dropDownProps[],
  setMembershipInsight: any,
  membershipInsight: iMembershipInsight
}

const Insights = ({yearData, monthData, setMembershipInsight, membershipInsight}: props) => {
  const [year, setYear] = useState({label: "", value: ""} as dropDownProps);
  const [month, setMonth] = useState({label: "", value: ""} as dropDownProps);
  const [insightType, setInsightType] = useState({label: "", value: ""} as dropDownProps);
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);

  const getData = async (y: string, m: string)=>{
    if(y && m){
      let resp: apiResponse = await getInsights("membership", y, m.toLowerCase());
      if(resp?.status === 200){
          setMembershipInsight(resp.data);
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

  // useEffect(()=>{
  //   getData();
  // }, [year, month])

  useEffect(()=>{
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
        Object.entries(membershipInsight).length ? 
          <ScrollView style={styles.insightScreen}>
            <View style={styles.membershipInsightSection}>
              <View style={styles.insgightTypeView}>
                <Text style={styles.keys}>INSIGHT TYPE</Text>
                <Dropdown
                  style={[styles.dropdown, {width: "60%"}]}
                  placeholderStyle={{fontSize: fontSize.small}}
                  selectedTextStyle={{color: iconColor, fontSize: fontSize.small}}
                  containerStyle={styles.dropDownContainer}
                  data={[{label: "MEMBERSHIP INSIGHTS", value: ""}]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'YEAR'}
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
              <MembershipInsight/>
            </View>
          </ScrollView>
        : <></>
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
  membershipInsight: state.insight.membershipInsight
})

const mapDispatchToProps = (dispatch: any)=>({
  setMembershipInsight: (d: iMembershipInsight)=>{dispatch(setMembershipInsightAction(d))}
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