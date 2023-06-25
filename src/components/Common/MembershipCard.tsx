import { Image, ImageProps, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadowGenerator } from '../../utils/helper'
import { memberShipTextColor } from '../../styles/colors'
import LinearGradient from 'react-native-linear-gradient';
import { fontSize } from '../../styles/fonts'
import { memberShipProps } from '../../interfaces/common'

type cardPackProps = {
    membershipData: memberShipProps
}

const MembershipCard = ({membershipData}: cardPackProps) => {

    const [pack, setPack] = useState(null as ImageSourcePropType | null);
    const [colorPack, setColorPack] = useState(["#c6a800", "rgba(255,172,0,1)"] as string[]);
    
    useEffect(()=>{
        switch(membershipData?.tier){
            case "gold":
                setPack(require(`../../assets/gold.png`));
                setColorPack(["#c6a800", "rgba(255,172,0,1)"])
                break;
            case "silver":
                setPack(require(`../../assets/silver.png`));
                setColorPack(["rgba(192,192,192,1)", "rgba(166,166,166,1)"])
                break;
            case "bronze":
                setPack(require(`../../assets/bronze.png`));
                setColorPack(['#A67C52', '#CD7F32'])
                break;
            default:
                setPack(null);
                break;
        }
    }, [])
  return (
    <LinearGradient 
        colors={colorPack}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.memberShipCard, shadowGenerator()]}
    >
        <View style={styles.nameView}>
            <Text style={[styles.text, {fontWeight: "500"}]}>{membershipData.phoneNumber}</Text>
            <Text style={[styles.text, {fontWeight: "700"}]}>{membershipData.name}</Text>
        </View>
        <View style={styles.packView}>
            {
                pack ? 
                    <Image
                        source={pack}
                        style={styles.packImage}
                    /> 
                : <Text style={styles.tierName}>NOT FOUND</Text>
            }
        </View>
        <View style={styles.stripe}>
            <View style={[styles.stripeLeftRight, styles.left]}>
                <Text style={styles.stripeKey}>Valid From</Text>
                <Text style={styles.stripeValue}>{membershipData.validFrom.toLocaleDateString()}</Text>
            </View>
            <View style={[styles.stripeLeftRight, styles.right]}>
                <Text style={styles.stripeKey}>Valid Thru</Text>
                <Text style={styles.stripeValue}>{membershipData.validThru.toLocaleDateString()}</Text>
            </View>
        </View>
    </LinearGradient>
  )
}

export default MembershipCard

const styles = StyleSheet.create({
    memberShipCard:{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        paddingBottom: 20,
        paddingTop: 10,
        borderRadius: 10,
        backgroundColor: "#fba018",
        marginBottom: 10
    },
    nameView:{
        display: "flex",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    text:{
        color: memberShipTextColor
    },
    packView:{
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        flex:1,
        padding: 10
    },
    tierName:{
        fontSize: fontSize.large,
        color: memberShipTextColor,
        fontWeight: "700",
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
        justifyContent: 'space-between',
        width: "100%",
        backgroundColor: 'rgba(217, 217, 217, 0.6)',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 10
    },
    stripeLeftRight:{
        flex: 1,
        justifyContent: "center",
    },
    stripeKey:{
        fontSize: fontSize.xSmall,
        fontWeight: "400",
        color: memberShipTextColor
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
        alignItems: "flex-end"
    },
    packImage:{
        height: 120,
        width: 120,
        resizeMode: "contain"
    }
})