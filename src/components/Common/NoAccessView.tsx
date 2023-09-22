import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import { fontSize } from '../../styles/fonts'
import { borderColor, iconColor, textColorPrimary } from '../../styles/colors'

type props = {
    title: string,
    subTitle: string,
    buttonText: string,
    buttonClicked: any
}

const NoAccessView = ({buttonText, subTitle, title, buttonClicked}: props) => {
  return (
    <View style={styles.main}>
        <BlurView
            style={{flex:1}}
            blurType="dark"
            blurAmount={12}
        >
        <View style={styles.noAccessView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <TouchableOpacity 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5
                }}
                onPress={()=>{buttonClicked()}}
            ><Text style={styles.upgradeText}>{buttonText}</Text></TouchableOpacity>
        </View>
        </BlurView>
    </View>
  )
}

export default NoAccessView

const styles = StyleSheet.create({
    main: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "transparent" 
    },
    noAccessView: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    title: {
        fontSize: fontSize.medium,
        color: iconColor,
        fontWeight: "400",
        textAlign: "center"
    },
    subTitle:{
        fontSize: fontSize.xmedium,
        color: borderColor,
        textAlign: "center"
    },
    upgradeText: {
        color: textColorPrimary,
        fontSize: fontSize.small,
        fontWeight: "400"
    }
})