import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontSize } from '../../styles/fonts'
import { borderColor, cardColor, iconColor, textColorPrimary } from '../../styles/colors'
import Button from './Button'
import CheckBox from '@react-native-community/checkbox'
import { iFilters } from '../../interfaces/iClient'
import { connect } from 'react-redux'
import { applyFilterAction } from '../../redux/actions'

type props = {
    toggleFilterView: any,
    clientFilter: iFilters[],
    // filterTabClicked: any,
    // checkBoxClicked: any,
    applyFilterClicked: any,
    applyFilter: any
}

const FilterView = ({toggleFilterView, clientFilter,applyFilterClicked, applyFilter}: props) => {
  const [f, setF] = useState(JSON.parse(JSON.stringify(clientFilter)) as iFilters[]);
  
  const apply = ()=>{
    applyFilter([...f]);
    let all = f[0].filters;
    let query: any = {} 
    let queryFilters: string[] = []
    all.forEach((d)=>{
      let key = d.value as string;
      if(d.active){
        if(d.name.toLowerCase() === "no membership"){
          query.noMembership = true;
        }else if(d.name.toLowerCase() === "expired"){
          query.expired = true
        }else{
          queryFilters.push(key);
        }
      }
    });
    query.filters = queryFilters;
    applyFilterClicked(query); 
    toggleFilterView()
  }

  const cancelBtnClicked = ()=>{
    setF(JSON.parse(JSON.stringify(clientFilter)));
    toggleFilterView();
  }

  const filterTabChanged = (id: string)=>{
    let allFilters = f;
    allFilters =  allFilters.map((d)=>{d.active = false; return d});
    let i: number = allFilters.findIndex((d)=>{return d.id === id});
    if(i > -1){
        allFilters[i].active = true;
    };
    setF([...allFilters])
  }

  const checkBoxChanged = (id: string)=>{
    let all = f;
    let tabIndex: number = all.findIndex((x)=>{return x.active});
    if(tabIndex > -1){
        let filterIndex: number = all[tabIndex].filters.findIndex((x)=>{return x.id === id});
        if(filterIndex > -1){
            let a: boolean = all[tabIndex].filters[filterIndex].active;
            all[tabIndex].filters[filterIndex].active = !a;
        }
    };
    setF([...all]);
  }

  useEffect(()=>{
    setF(JSON.parse(JSON.stringify(clientFilter)))
  }, [clientFilter])

  return (
    f && f?.length ?
    <Modal transparent animationType='slide'>
        <View style={styles.mainFilterView}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
        </View>
        <View style={styles.main}>
            <View style={styles.tabs}>
            {
                f.map((d, i:number)=>{
                return (
                    <TouchableOpacity 
                    style={[styles.tab, d.active ? styles.tabActive : styles.tabInactive]} 
                    key={"filterTab" + i}
                    onPress={()=>{filterTabChanged(d.id)}}
                    >
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tabName}>{d.tabName}</Text>
                    </TouchableOpacity>
                )
                })
            }
            </View>
            {
            f.length ?
              <View style={styles.detail}>
                  {
                    f.find((x)=>{return x.active})?.filters.map((d, i:number)=>{
                        return (
                        <View style={styles.filter} key={"filter" + i}>
                            <CheckBox 
                                value={d.active} 
                                onValueChange={()=>{checkBoxChanged(d.id)}}
                                tintColors={{ true: textColorPrimary, false: borderColor }}
                            />
                            <Text style={styles.tabFilterText}>{d.name.toUpperCase() + ` (${d.count})`}</Text>
                        </View>
                        )
                    })
                  }
              </View> : <></>
            }
        </View>
        <View style={styles.footer}>
            <Button
                onTouch={()=>{apply()}}
                text='Apply'
                width='40%'
            />
            <Button
                onTouch={()=>{cancelBtnClicked()}}
                text='Cancel'
                width='40%'
                borderLess={true}
            />
        </View>
        </View> 
    </Modal> : <></>
    )
}

const mapStateToProps = (state: any)=>({
    clientFilter: state.clientFilter.filterObject.allFilters
});

const mapDispatchToProps = (dispatch: any)=>({
    // checkBoxClicked: (data: iFilters[])=>{dispatch(checkBoxClickedAction(data))},
    // filterTabClicked: (data: iFilters[])=>{dispatch(filterTabClickedAction(data))},
    applyFilter: (data: iFilters[])=>{dispatch(applyFilterAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterView)

const styles = StyleSheet.create({
      mainFilterView:{
        display: "flex",
        flexDirection: "column",
        minHeight: Dimensions.get("window").height * 0.5,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: cardColor,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // padding: 10
      },
      header:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#242424"
      },
      headerText:{
        fontSize: fontSize.medium,
        fontWeight: "400"
      },
      main:{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: "100%"
      },
      tabs:{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: 0.3,
        borderRightWidth: 1,
        borderRightColor: "#242424"
      },
      tab: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        minHeight: 70,
      },
      tabActive:{
        borderLeftWidth: 4,
        borderLeftColor: textColorPrimary,
      },
      tabInactive:{
        backgroundColor: "#1d1d1d"
      },
      detail:{
        flex: 0.7,
        height: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start"
      },
      tabName:{
        fontSize: fontSize.xmedium,
        color: iconColor
      },
      tabFilterText:{
        fontSize: fontSize.xmedium,
        color: borderColor
      },
      filter:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        justifyContent: "flex-start"
      },
      footer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#242424"
    },
})