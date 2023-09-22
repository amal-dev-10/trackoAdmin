import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderColor, cardColor, goldColor, primaryColor } from '../../styles/colors'

type props = {
    handleColor?: string,
    progressColor?: string,
    widthPercentage: number
}

const ProgressBar = (props: props) => {
  return (
    <View style={[styles.progressBar, {backgroundColor: props.handleColor ? props.handleColor : goldColor}]}>
      <View style={[styles.progress, {backgroundColor: props.progressColor ? props.progressColor : borderColor}, props.widthPercentage ? {width: String(props.widthPercentage)+ "%"} : {width: "1%"}]}></View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    progressBar: {
        height: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 10
    },
    progress:{
        height: "100%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})