import { LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, goldColor, iconColor, textColorPrimary } from '../styles/colors';
import { fontSize } from '../styles/fonts';
import { apiResponse, dropDownProps } from '../interfaces/common';
import { connect } from 'react-redux';
import { iFinanceInsight, iMembershipInsight, mainStat } from '../interfaces/business';
import { setFinanceInsightAction, setMembershipInsightAction } from '../redux/actions';
import { getInsights } from '../services/apiCalls/serviceCalls';
import { calculateDaysBetweenDates, container, setRoute, showToast } from '../utils/helper';
import NoData from '../components/Common/NoData';
import DateTimePicker from '@react-native-community/datetimepicker';
import AreaChart from '../components/Charts/AreaChart';

type props = {
  yearData: dropDownProps[],
  monthData: dropDownProps[],
  setMembershipInsight: any,
  membershipInsight: iMembershipInsight,
  financeInsight: iFinanceInsight,
  setFinanceInsight: any
}

type iStats = {
  totalRevenue: number,
  avgRevenue: number,
  totalMembers: number,
  totalSubscribers: number
}

const Insights = ({yearData, monthData, setMembershipInsight, membershipInsight, financeInsight, setFinanceInsight}: props) => {
  const [fetchFailed, setFetchFailed] = useState(undefined as boolean | undefined);
  const [showStartCalender, setShowStartCalender] = useState(false as boolean);
  const [showEndCalender, setShowEndCalender] = useState(false as boolean);
  const [quickStat, setQuickStat] = useState({} as iStats);
  const [start, setStart] = useState("" as any);
  const [end, setEnd] = useState("" as any);
  const [insightData, setInsightData] = useState([] as mainStat[]);
  const [reload, setReload] = useState(false as boolean);
  const chartTypeData = [
    {label: "REVENUE INSIGHT", value: "revenueInsight"},
    {label: "NEW CLIENT INSIGHT", value: "newClientInsight"},
    {label: "NEW SUBSCRIPTIONS", value: "subscriptionInsight"},
  ]
  const [insightType, setInsightType] = useState({} as dropDownProps);
  const [chartData, setChartData] = useState([] as any)

  const getData = async (s: string, e: string)=>{
    let resp: apiResponse = await getInsights(insightType.value, s, e);
    if(resp?.status === 200){
        LayoutAnimation.configureNext({
          duration: 200, // Adjust the frame rate by changing the duration
          update: {
            type: LayoutAnimation.Types.linear ,
          },
        });
        calculateStats(resp.data);
        setInsightData(resp.data);
        setFetchFailed(false);
    }else if(resp?.status === 500 || resp?.status === undefined){
      setFetchFailed(true);
    }
  }

  const calculateStats = (data: mainStat[])=>{
    let result: iStats = {
      totalRevenue: 0,
      avgRevenue: 0,
      totalMembers: 0,
      totalSubscribers: 0
    }
    data.forEach((d)=>{
      result.totalRevenue = result.totalRevenue + parseInt(d.amountToday);
      result.totalMembers = result.totalMembers + parseInt(d.membersToday);
      result.totalSubscribers = result.totalSubscribers + parseInt(d.membershipToday)
    });
    let numOfDays = calculateDaysBetweenDates(start, end);
    result.avgRevenue = Math.floor(result.totalRevenue/numOfDays);
    setQuickStat({...result});
  }

  const loadButtonClicked = ()=>{
    setChartData([]);
    setInsightType({} as dropDownProps);
    if(start && end){
      let s = start as Date;
      let e = end as Date;
      if(s.getTime() < e.getTime()){
        getData(start, end);
      }else{
        showToast("Enter valid dates.")
      }
    }else{
      showToast("Select prefered date.")
    }
  }

  const handleDateChange = (event: any, date:Date | undefined, type: string)=>{
    if(type === "start"){
      setShowStartCalender(false)
      if (date) {
        date.setHours(0,0,0,0);
        setStart(date);
      }
    }else if(type === "end"){
      setShowEndCalender(false)
      if (date) {
        date.setHours(23,59,59,999);
        setEnd(date);
      }
    }
  }


  useEffect(()=>{
    setChartData([]);
    LayoutAnimation.configureNext({
      duration: 200, // Adjust the frame rate by changing the duration
      update: {
        type: LayoutAnimation.Types.linear ,
      },
    });

    switch(insightType.value){
      case "revenueInsight":
        let c1 = insightData.map((x)=>{
          return {
            day: parseInt(x?.day || "0"),
            revenue: parseInt(x?.amountToday || "0")
          }
        });
        setChartData([...c1]);
        break;
      case "newClientInsight":
        let c2 = insightData.map((x)=>{
          return {
            day: parseInt(x?.day || "0"),
            revenue: parseInt(x?.membersToday || "0")
          }
        });
        setChartData([...c2]);
        break;
      case "subscriptionInsight":
        let c3 = insightData.map((x)=>{
          return {
            day: parseInt(x?.day || "0"),
            revenue: parseInt(x?.membershipToday || "0")
          }
        });
        setChartData([...c3]);
        break;
      default:
        break;
    }
  }, [insightType]);

  const startReload = ()=>{
    loadButtonClicked();
    if(insightType?.value){
      setInsightType({...insightType});
    }
  }

  useEffect(()=>{
    if(reload){
      startReload();
      setReload(false);
    }
  }, [reload]);

  useEffect(()=>{
    setRoute("Insights");
  },[])

  return (
    <View style={[container]}>
      {
        <ScrollView style={styles.insightScreen} showsVerticalScrollIndicator={false}>
          <View style={styles.membershipInsightSection}>
            <Text style={styles.keys}>GENERATE DETAILED REPORT BY DATE</Text>
            <View style={styles.dropDownView}>
              <TouchableOpacity style={styles.filterDateBtn} onPress={()=>{setShowStartCalender(true)}}>
                <Text>{start ? start.toLocaleDateString() : "START DATE"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterDateBtn} onPress={()=>{setShowEndCalender(true)}}>
                <Text>{end ? end.toLocaleDateString() : "END DATE"}</Text>
              </TouchableOpacity>
              {
                showStartCalender ? 
                  <DateTimePicker
                    value={start ? start : new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(e, d)=>{handleDateChange(e, d, "start")}}
                    onTouchCancel={()=>{setShowStartCalender(false)}}
                  />
                : <></>
              }
              {
                showEndCalender ? 
                  <DateTimePicker
                    value={end ? end : new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(e, d)=>{handleDateChange(e, d, "end")}}
                    onTouchCancel={()=>{setShowEndCalender(false)}}
                  />
                : <></>
              }
              <TouchableOpacity style={styles.loadBtn} onPress={()=>{loadButtonClicked()}}>
                <Text style={styles.btnText}>LOAD</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            {
              Object.entries(quickStat).length ? 
                <View style={[styles.row, styles.quickStatMain]}>
                  <View style={[styles.column, {flex: 1}]}>
                    <View style={[styles.card, styles.column]}>
                      <Text style={styles.cardText}>Total Revenue</Text>
                      <View style={styles.valueView}>
                        <Text style={[styles.valueText, styles.amount]}>{"₹ " + quickStat?.totalRevenue.toLocaleString()}</Text>
                      </View>
                    </View>
                    <View style={[styles.card, styles.column]}>
                      <Text style={styles.cardText}>Average Revenue</Text>
                      <View style={styles.valueView}>
                        <Text style={[styles.valueText, styles.amount]}>{"₹ " + quickStat.avgRevenue.toLocaleString()}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.row, {flex: 1}]}>
                    <View style={[styles.card, styles.column]}>
                      <Text style={styles.cardText}>{"Total\nClients"}</Text>
                      <View style={styles.valueView}>
                        <Text style={[styles.valueText, styles.value]}>{quickStat.totalMembers}</Text>
                      </View>
                    </View>
                    <View style={[styles.card, styles.column]}>
                      <Text style={styles.cardText}>{"Total\nSubscribers"}</Text>
                      <View style={styles.valueView}>
                        <Text style={[styles.valueText, styles.value]}>{quickStat.totalSubscribers}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              : <></>
            }
            {
              Object.entries(quickStat).length ? 
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
              : <></>
            }
            {
              (
                (
                  insightType.value === "revenueInsight"
                  || insightType.value === "newClientInsight"
                  || insightType.value === "subscriptionInsight"
                ) 
                && chartData.length
              ) 
              ?
                <AreaChart data={chartData}/> 
              : <></>
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
                tryAgainClicked={()=>{setReload(true)}}
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
  },
  filterDateBtn:{
    padding: 10,
    backgroundColor: cardColor,
    borderRadius: 10,
    elevation: 3
  },
  row:{
    display: "flex",
    flexDirection: "row",
    gap: 5
  },
  column:{
    display: "flex",
    flexDirection: "column",
    gap: 5
  },
  card: {
    flex: 1,
    backgroundColor: cardColor,
    borderRadius: 10,
    padding: 7,
  },
  quickStatMain:{
    width: "100%",
    // height: Dimensions.get("window").height * 0.23
  },
  cardText:{
    color: borderColor,
    fontSize: fontSize.small
  },
  valueView:{
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  valueText:{
    fontSize: fontSize.large,
    fontWeight: "300"
  },
  amount: {
    color: goldColor
  },
  value:{
    color: textColorPrimary
  },
  divider:{
    marginVertical: 20,
    height: 1,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#232323"
  }
})