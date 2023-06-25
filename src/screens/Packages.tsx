import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { borderColor, iconColor } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { container } from '../utils/helper'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getAllPackages } from '../redux/actions'
import { packagesProps } from '../interfaces/common'
import PackageCard from '../components/Common/PackageCard'

type props = {
  allPackages?: packagesProps[],
  getAllPackages?: any
}

const Packages = ({getAllPackages, allPackages}: props) => {

  useEffect(()=>{
    getAllPackages();
  }, [])

  return (
    <View style={[styles.packageScreen, container]}>
      <View style={styles.titleView}>
        <Text style={styles.title}>ADD PACKAGES FOR YOUR CLIENT</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.packageScroller}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 1}}
      >
        <View style={styles.scrollerView}>
          {
            allPackages?.map((data, i:number)=>{
              return (
                <PackageCard packDetail={data} key={"pack" + i}/>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  allPackages: state.packages.allPackages
});

const mapDispatchToProps = (dispatch: any)=>({
  getAllPackages: ()=>dispatch(getAllPackages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Packages)

const styles = StyleSheet.create({
  packageScreen:{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center"
  },
  title:{
    color: borderColor,
    fontSize: fontSize.medium,
    fontWeight: "700"
  },
  titleView:{
    flex: 0.1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  packageScroller:{
    // flex: 1,
    width: "100%"
  },
  scrollerView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
})