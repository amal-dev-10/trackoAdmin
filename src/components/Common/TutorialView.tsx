import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { fontSize } from '../../styles/fonts'
import { borderColor, iconColor } from '../../styles/colors'

type props = {
    title: string,
    subTitle: string
}

const TutorialView = ({subTitle, title}: props) => {
    const [show, setShow] = useState<boolean>(true)
  return (
    show ?
        <View style={styles.tutorialView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>
                {subTitle}
            </Text>
            <TouchableOpacity 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5
                }}
                onPress={()=>{setShow(false)}}
            ><Text style={styles.upgradeText}>{"Ok, Got it"}</Text></TouchableOpacity>
        </View>
    : <></>
  )
}

export default TutorialView

const styles = StyleSheet.create({
    tutorialView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 20
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
        color: borderColor,
        fontSize: fontSize.xmedium,
        fontWeight: "400",
        textDecorationLine: "underline"
    }
})