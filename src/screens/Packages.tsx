import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { borderColor, cardColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { container, setRoute, showToast } from '../utils/helper'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { addNewTemplateAction, mapPackagesToState } from '../redux/actions'
import { apiResponse, packagesProps } from '../interfaces/common'
import PackageCard from '../components/Common/PackageCard'
import { getPackages } from '../services/apiCalls/serviceCalls'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { key } from '../styles/constants'

type props = {
  allPackages?: packagesProps[],
  businessId: string,
  mapPackage: any,
  addNewTemplate: any
}

const Packages = ({allPackages, businessId, mapPackage, addNewTemplate}: props) => {

  const getSavedPackages = async ()=>{
    let resp: apiResponse = await getPackages(businessId);
    if(resp?.status === 200){
        mapPackage(resp.data);
    }else if(resp?.status === 500 || resp?.status === undefined){
      showToast("Data fetch failed !")
    }
  }

  const scrollViewRef = useRef(null);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = Dimensions.get("window").width * 0.8 + 20; // Width of each card including margin
    const cardIndex = Math.floor(contentOffsetX / cardWidth);
    setVisibleCardIndex(cardIndex);
  };

  const newTemplateClicked = ()=>{
    addNewTemplate();
    let scroll: any = scrollViewRef.current;
    if(scroll){
      scroll.scrollToEnd({ animated: true });
    }
  }

  useEffect(()=>{
    setRoute("Packages");
    if(!allPackages?.length){
      getSavedPackages();
    }
  }, [])

  return (
    <View style={[styles.packageScreen, container]}>
      <View style={styles.titleView}>
        <Text style={[key, {color: borderColor}]}>Add new template</Text>
        <TouchableOpacity style={styles.newTemplateBtn} onPress={()=>{newTemplateClicked()}}>
          <View style={styles.icon}>
            <AntDesign size={20} name='plus' color={textColorPrimary}/>
          </View>
        </TouchableOpacity>
      </View>
      {
        allPackages?.length ?
        <View style={styles.titleView}>
          <Text style={styles.title}>PACKAGES</Text>
        </View> : <></>
      }
      <ScrollView showsVerticalScrollIndicator={false} style={[{width: "100%", flex: 1}]}>
        {
          allPackages?.length ?
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.packageScroller}
            contentContainerStyle={{alignItems: "center"}}
            ref={scrollViewRef}
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={Dimensions.get("window").width * 0.8 + 20}
          >
            {
              allPackages?.map((data, i:number)=>{
                return (
                  <PackageCard packDetail={data} key={"pack" + i}/>
                )
              })
            }
            {/* <View style={styles.scrollerView}>
            </View> */}
          </ScrollView>
          : <></>
        }
      </ScrollView>
    </View>
  )
}



const mapStateToProps = (state: any)=>({
  allPackages: state.packages.allPackages,
  businessId: state.dashboard.selectedBusiness.uid
});

const mapDispatchToProps = (dispatch: any)=>({
  mapPackage: (data: packagesProps[])=>{dispatch(mapPackagesToState(data))},
  addNewTemplate: ()=>{dispatch(addNewTemplateAction())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Packages)

const styles = StyleSheet.create({
  packageScreen:{
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    paddingTop: 10
  },
  title:{
    color: borderColor,
    fontSize: fontSize.xmedium,
    fontWeight: "700"
  },
  titleView:{
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%"
  },
  packageScroller:{
    // flex: 1,
    height: "100%",
    // width: "100%"
  },
  scrollerView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  newTemplateBtn:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: cardColor,
    width: "100%"
  },
  templateBtnText:{
    fontSize: fontSize.small,
    color: textColorSecondary
  },
  icon:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    borderRadius: 20, 
    borderWidth: 2,
    borderColor: borderColor
  }
})