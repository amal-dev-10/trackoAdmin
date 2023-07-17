import { Dimensions, Image, ImageProps, ImageSourcePropType, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { borderColor, cardColor, goldColor, iconColor, memberShipTextColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import LinearGradient from 'react-native-linear-gradient';
import { fontSize } from '../../styles/fonts'
import { iClient, iMembership } from '../../interfaces/iClient';
import IconSet from '../../styles/icons/Icons';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { setOverlayComponent, setSelectedClient } from '../../redux/actions';
import { connect } from 'react-redux';
import { openOverlayParameter } from '../../interfaces/common';

type cardPackProps = {
    membershipData: iMembership,
    openOverlay: any,
    setSelectedClient: any
}

type ViewRef = React.RefObject<TouchableOpacity>;

const MembershipCard = ({membershipData, openOverlay, setSelectedClient}: cardPackProps) => {

    const card: ViewRef = useRef<TouchableOpacity>(null);
    const [cardDimension, setCardDimension] = useState({width:0, height: 0} as {width: number, height: number})

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setCardDimension({width: width, height: height});
    };

    const membershipCardClicked = ()=>{
        setSelectedClient(membershipData);
        openOverlay(7);
    }

  return (
    <TouchableOpacity 
        style={[styles.memberShipCard]}
        ref={card}
        onLayout={onLayout}
        activeOpacity={0.7}
        onPress={()=>{membershipCardClicked()}}
    >
        <View style={[styles.card, {height: cardDimension.height, width: cardDimension.width}]}>
            <View style={styles.nameView}>
                <Text style={[styles.text, {fontSize: fontSize.small}]}>MEMBERSHIP CARD</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Text style={[styles.phoneNumber, {fontSize: fontSize.small}]}>{
                        membershipData.phoneNumber.slice(0, 6) + "\n" + membershipData.phoneNumber.slice(6) 
                    }</Text>
                    <View style={{width: 1, height: 25, backgroundColor: iconColor, borderRadius: 10}}></View>
                </View>
            </View>
            <View style={styles.packView}>
                {
                    membershipData?.memberShipDetails?.tier && !membershipData.memberShipDetails.expired ? 
                        <View style={styles.packImage}>
                            <IconSet name={`${membershipData?.memberShipDetails?.tier?.toLowerCase()+"pack"}`} size={65} color={goldColor}/>
                            <View style={styles.divider}></View>
                            <Text style={styles.orgName}>IGNITE FITNESS</Text>
                        </View>
                    : <Text style={styles.tierName}>{membershipData.memberShipDetails?.expired ? "EXPIRED" : "NO MEMBERSHIP"}</Text>
                }
            </View>
            <View style={styles.stripe}>
                <View style={[styles.stripeLeftRight, styles.left]}>
                    <Text style={styles.stripeKey}>Membership Holder</Text>
                    <Text style={styles.stripeValue}>{
                        membershipData.name.toUpperCase()
                    }</Text>
                </View>
                <View style={[styles.stripeLeftRight, styles.left]}>
                    <Text style={styles.stripeKey}>Valid From</Text>
                    <Text style={styles.stripeValue}>{
                        membershipData.memberShipDetails?.validFromString ? membershipData.memberShipDetails?.validFromString : "NA"
                    }</Text>
                </View>
                <View style={[styles.stripeLeftRight, styles.right]}>
                    <Text style={styles.stripeKey}>Valid Till</Text>
                    <Text style={styles.stripeValue}>{
                        membershipData.memberShipDetails?.validThruString ? membershipData.memberShipDetails?.validThruString : "NA"
                    }</Text>
                </View>
            </View>
        </View>
        <View style={styles.svgContainer}>
            <Svg
                width={cardDimension.width * 0.5}
                height={cardDimension.height}
                viewBox={`10 7 ${cardDimension.width * 0.5} ${cardDimension.height}`}
                fill="none"
                style={StyleSheet.absoluteFill}
                // style={{backgroundColor: "red"}}
                // style={{position: "absolute", left: 0, top: 0}}
            >
                <G filter="url(#filter0_d_265_22)">
                    <Path
                    d="M115 212c78.812-123.903 8.399-184.9-39.154-201.077-1.894-.644-3.863-.923-5.863-.923H30.5c-11.046 0-20 8.954-20 20v162c0 11.046 8.954 20 20 20H115z"
                    fill="#d9d9d915"
                    fillOpacity={0.3}
                    />
                </G>
                <Path
                    d="M84.5 9.5c106 55.2 68.167 158.333 36 203h59c33.2-128.4-49.5-188.833-95-203z"
                    fill="#d9d9d915"
                    fillOpacity={0.3}
                />
                <Defs></Defs>
            </Svg>
        </View>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
    setSelectedClient: (data: iMembership)=>{dispatch(setSelectedClient(data))}
});

export default connect(null, mapDispatchToProps)(MembershipCard)

const styles = StyleSheet.create({
    memberShipCard:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        position: "relative",
        backgroundColor: "#000000e2",
        elevation: 6,
        height: Dimensions.get("screen").height * 0.23,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#111111"
    },
    card:{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        gap: 5,
        zIndex: 99,
        padding: 20,
    },
    nameView:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    text:{
        color: iconColor
    },
    packView:{
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        flex:1,
    },
    tierName:{
        fontSize: fontSize.medium,
        color: goldColor,
        fontWeight: "200",
        padding: 10
    },
    member:{
        color: memberShipTextColor,
        fontSize: fontSize.xmedium
    },
    pack:{

    },
    stripe:{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        // justifyContent: 'space-between',
        width: "100%",
        // backgroundColor: 'rgba(17, 17, 17, 0.938)',
    },
    stripeLeftRight:{
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    stripeKey:{
        fontSize: fontSize.xSmall,
        fontWeight: "400",
        color: borderColor
    },
    stripeValue:{
        fontSize: fontSize.small,
        fontWeight: "600",
        color: memberShipTextColor
    },
    left:{
        alignItems: "flex-start"
    },
    right:{
        alignItems: "flex-start"
    },
    packImage:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    divider:{
        width: 2,
        backgroundColor: "#262626",
        height: 30,
        borderRadius: 10,
        transform: [{rotate: "20deg"}]
    },
    accountName:{
        fontSize: fontSize.xmedium,
        fontWeight: "600"
    },
    orgName:{
        color: "#262626",
        flexWrap: 'wrap',
        minWidth: 80,
        maxWidth: 120
    },
    svgContainer:{
        height: "100%",
        width: "30%",
    },
    phoneNumber:{
        color: borderColor,
        textAlign: "right",
    }
})