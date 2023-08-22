import { Animated, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { orgProps } from '../../interfaces/common';
import Icon from 'react-native-vector-icons/FontAwesome'
import { cardColor, iconColor, textColorPrimary, textColorSecondary } from '../../styles/colors';
import { fontSize } from '../../styles/fonts';
import { TouchableOpacity } from 'react-native';

const DashboardCard = (props: orgProps) => {
  return (
    <TouchableOpacity style={[styles.card]} onPress={()=>{props.onPress()}}  activeOpacity={0.7}>
        {
            props.logo ? 
            <Image
              source={{uri: props.logo}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          : 
            <Icon size={50} name={props.icon} color={textColorPrimary}/>
        }
        <View style={styles.details}>
            <Text style={styles.cardTitle}>{props.orgName}</Text>
            <Text style={styles.id}>{props.location.toLocaleLowerCase()}</Text>
        </View>
    </TouchableOpacity>
  )
}


export default DashboardCard

const styles = StyleSheet.create({
    card:{
        padding: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: cardColor,
        elevation: 2
    },
    details:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1
    },
    cardTitle:{
        fontSize: fontSize.xmedium,
        color: textColorSecondary,
        fontWeight: "500"
    },
    id:{
        color: iconColor,
        fontSize: fontSize.small
    }
})