import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddClients = () => {
  return (
    <View style={styles.addClientScreen}>
      <Text>AddClients</Text>
    </View>
  )
}

export default AddClients

const styles = StyleSheet.create({
    addClientScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 20
    }
})