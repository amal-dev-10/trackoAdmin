import { Modal, StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from '../../styles/colors'
import { connect } from 'react-redux';

type props = {
    showLoader: boolean
}

const MainLoader = ({showLoader}: props) => {
    // const [translate, setTranslate] = useState(0 as number);
    // useEffect(()=>{
    //     let t = 0;
    //     if(showLoader){
    //         let a = 0
    //         t = setInterval(()=>{
    //             if(a > Dimensions.get("window").width){
    //                 a = 0
    //             }
    //             a = a + 5;
    //             setTranslate(a);
    //         }, 5)
    //     }else{
    //         clearInterval(t);
    //         setTranslate(0)
    //     }
    // }, [showLoader]);
  return (
    showLoader ?
    <Modal>
        <View style={styles.mainLoader}>
            <View style={styles.headerLoader}>
                <View style={styles.dashBtn}></View>
                <View style={styles.profile}></View>
            </View>
            <View style={styles.detailLoader}>
                <View style={styles.detail1}></View>
                <View style={[styles.detail, styles.detail2]}></View>
                <View style={[styles.detail, styles.detail3]}></View>
                <ScrollView horizontal scrollEnabled={false} style={styles.scroll} showsHorizontalScrollIndicator={false}>
                    <View style={[styles.detail ,styles.detail4]}></View>
                    <View style={[styles.detail ,styles.detail4]}></View>
                    <View style={[styles.detail ,styles.detail4]}></View>
                </ScrollView>
                {/* {
                    showLoader &&
                    <View style={[styles.loader, {transform: [{translateX: translate}]}]}></View>
                } */}
            </View>
            <View style={styles.loaderView}>
                <ActivityIndicator
                    size={"large"}
                    color={textColorPrimary}
                    style={styles.activityIndicator}
                />
            </View>
            <View style={styles.bottomLoader}>
                {/* {
                    [1,2,3,4,5].map((d)=>{
                        return (
                            <View style={styles.tab} key={"tabLoader" + d}>
                            </View>
                            )
                        })
                    } */}
            </View>
        </View>
    </Modal> : <></>
  )
}

const mapStateToProps = (state: any)=>({
    showLoader: state.loader?.show || false
})

export default connect(mapStateToProps)(MainLoader)

const styles = StyleSheet.create({
    mainLoader:{
        backgroundColor: primaryColor,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        gap: 10
    },
    bottomLoader:{
        backgroundColor: cardColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "7%",
        borderRadius: 10,
        padding: 10,
        gap: 10
    },
    tab:{
        backgroundColor: "#333333cb",
        borderRadius: 10,
        padding: 20
    },
    detailLoader:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    headerLoader:{
        height: "7%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    dashBtn:{
        padding: 20,
        backgroundColor: cardColor,
        flex: 0.6
    },
    profile:{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: cardColor
    },
    detail1:{
        height: "20%",
        backgroundColor: cardColor,
        borderRadius: 10
    },
    detail:{
        padding: 10,
        backgroundColor: cardColor, 
        borderRadius: 10
    },
    detail2:{
        width: "100%",
    },
    detail3:{
        width: "80%"
    },
    detail4:{
        width: Dimensions.get("window").width * 0.5,
        height: Dimensions.get("window").height * 0.4,
        marginRight: 10
    },
    scroll:{
        height: "50%",
        padding: 5
    },
    loader:{
        backgroundColor: "#28282827",
        padding: 40,
        height: "100%",
        position: "absolute",
        zIndex: 99,
    },
    loaderView:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 0.3
    },
    activityIndicator: {
        backgroundColor: cardColor,
        borderRadius: 50,
        padding: 8,
        elevation: 2
      },
})