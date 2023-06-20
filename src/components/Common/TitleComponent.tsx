import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontSize } from '../../styles/fonts'
import { iconColor, textColorSecondary } from '../../styles/colors'

type titleProps = {
    title: string,
    subTitle: string
}

const TitleComponent = (props: titleProps) => {
  return (
    <View style={styles.textView}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.secondPara}>
            {props.subTitle}
        </Text>
    </View>
  )
}

export default TitleComponent

const styles = StyleSheet.create({
    title:{
        fontSize: fontSize.xLarge,
        color: textColorSecondary
    },
    textView:{
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    secondPara:{
        color: iconColor,
        fontSize: fontSize.small
    },
})