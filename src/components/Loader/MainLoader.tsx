import { Modal, StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from '../../styles/colors'
import { connect } from 'react-redux';
import { fontSize } from '../../styles/fonts';
import { bottomTabProps, overlayComponent, tabDataInterface } from '../../interfaces/common';
import Loading from '../Common/Loading';

type props = {
    showLoader: boolean,
    selectedTab: number,
    allTabs: bottomTabProps[],
    overlays: overlayComponent[],
    routeName: string
}

const colorValue = new Animated.Value(0);

// Interpolate the color value to create a "wind" effect from left to right
const backgroundColor = colorValue.interpolate({
inputRange: [0, 1],
outputRange: ['rgba(20,20,20,1)', 'rgba(20,20,20,0.3)'],
});

const MainLoader = ({showLoader, allTabs, selectedTab, overlays, routeName}: props) => {
    const skeletonLoaderScreens = ["Home", "Clients", "Requests", "Packages"];
    const activityLoaderTabs = [
        "transactions",
        "profile",
        "termsAndConditions",
        "settings",
        "addClients",
        "clientDetails",
        "businessProfile",
        "Dashboard",
        "Insights"
    ]
    Animated.loop(
        Animated.sequence([
            Animated.timing(colorValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            }),
            Animated.timing(colorValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
            }),
        ])
    ).start();
  return (
    showLoader ?
        skeletonLoaderScreens.includes(routeName) ? 
            <Modal>
                <View style={styles.mainLoader}>
                    {
                        skeletonLoaderScreens.includes(routeName) &&
                        <View style={styles.headerLoader}>
                            <Animated.View style={[styles.dashBtn, {backgroundColor}]}/>
                            <Animated.View style={[styles.profile, {backgroundColor}]}/>
                        </View>
                    }
                    {
                        routeName === "Home" && <HomeLoader/>
                    }
                    {
                        routeName === "Clients" && <ClientLoader/>
                    }
                    {
                        routeName === "Packages" && <PackageLoader/>
                    }
                    {
                        (
                            routeName != "Home" &&
                            routeName != "Clients" &&
                            routeName != "Packages" &&
                            routeName != "Insights"
                        ) && <QuoteLoader/>
                    }
                    {
                        skeletonLoaderScreens.includes(routeName) &&
                        <Animated.View style={[styles.bottomLoader, { backgroundColor }]}>
                        </Animated.View>
                    }
                </View>
            </Modal> 
        :
        (activityLoaderTabs.includes(routeName) || overlays.length) ?
            <Loading/>
        : <></>
    : <></>
  )
}

const HomeLoader = ()=>{
    return (
        <View style={styles.detailLoader}>
            <Animated.View style={[styles.detail1, { backgroundColor }]} />
            <Animated.View style={[styles.detail, styles.detail2, { backgroundColor }]}/>
            <Animated.View style={[styles.detail, styles.detail3, { backgroundColor }]}/>
            <ScrollView horizontal scrollEnabled={false} style={styles.scroll} showsHorizontalScrollIndicator={false}>
                <Animated.View style={[styles.detail ,styles.detail4, { backgroundColor }]}/>
                <Animated.View style={[styles.detail ,styles.detail4, { backgroundColor }]}/>
                <Animated.View style={[styles.detail ,styles.detail4, { backgroundColor }]}/>
            </ScrollView>
        </View>
    )
}

const ClientLoader = ()=>{
    return (
        <View style={styles.detailLoader}>
            <Animated.View style={[styles.search, { backgroundColor }]}/>
            <View style={styles.cardView}>
                <Animated.View style={[styles.card, { backgroundColor }]}/>
                <Animated.View style={[styles.card, { backgroundColor }]}/>
            </View>
        </View>
    )
}

const PackageLoader = ()=>{
    return (
        <View style={styles.detailLoader}>
            <ScrollView horizontal scrollEnabled={false} style={styles.packageScroll} showsHorizontalScrollIndicator={false}>
                <Animated.View style={[styles.detail ,styles.pack, { backgroundColor }]}/>
                <Animated.View style={[styles.detail ,styles.pack, { backgroundColor }]}/>
                <Animated.View style={[styles.detail ,styles.pack, { backgroundColor }]}/>
            </ScrollView>
        </View>
    )
}

const QuoteLoader = ()=>{
    return (
        <View style={[styles.detailLoader, styles.quoteView]}>
            <Text style={styles.quote}>
                You can add clients to your business and track their subscriptions
            </Text>
        </View>
    )
}

const mapStateToProps = (state: any)=>({
    showLoader: state.loader?.show || false,
    allTabs: state.bottomTab.allTabs,
    selectedTab: state.bottomTab.activeComponentId,
    overlays: state.overlay.opendedComponents,
    routeName: state.route.currentRoute
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
    packageScroll:{
        height: "100%",
        padding: 5
    },
    pack:{
        width: Dimensions.get("window").width * 0.65,
        height: Dimensions.get("window").height * 0.8,
        marginRight: 10
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
    search:{
        height: 45,
        width: "100%",
        backgroundColor: cardColor,
        borderRadius: 20
    },
    cardView:{
        flex: 1,
        width: "100%",
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    card:{
        height: "40%",
        backgroundColor: cardColor,
        width: "100%",
        borderRadius: 10,
    },
    quote:{
        textAlign: "center",
        color: borderColor,
        fontSize: fontSize.xmedium,
        width: "80%"
    },
    quoteView:{
        alignItems: "center",
        justifyContent: "center",
    },
    skeletonLine: {
        height: 12,
        marginLeft: 8,
        borderRadius: 4,
    }
})