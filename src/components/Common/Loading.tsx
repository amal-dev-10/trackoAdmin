import { Modal, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { cardColor, textColorPrimary } from '../../styles/colors'

const Loading = () => {
  return (
    <Modal transparent>
        <View style={styles.loadingView}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={textColorPrimary}/>
            </View>
        </View>
    </Modal>
  )
}

export default Loading

const styles = StyleSheet.create({
    loadingView:{
        flex: 1,
        width: "100%",
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000062"
    },
    loaderContainer:{
        backgroundColor: cardColor,
        padding: 25,
        borderRadius: 10,
        elevation: 2
    }
})