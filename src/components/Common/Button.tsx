import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { buttonTextColor, secondaryColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'

type buttonProps = {
    text: string,
    onTouch: Function,
    width: string,
    borderLess?: boolean
}

const Button = (props: buttonProps) => {
  return (
    <TouchableOpacity style={[styles.button, props?.borderLess === undefined ? styles.border : {} ,{width: props.width}]} onPress={()=>{props.onTouch()}} activeOpacity={0.7}>
      <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        display: "flex",
        width: "100%",
        padding: 10,
        paddingTop: 13,
        paddingBottom: 13,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    border:{
      backgroundColor: secondaryColor,
    },
    btnText:{
        color: buttonTextColor,
        fontWeight: "700",
        fontSize: fontSize.small
    }
})