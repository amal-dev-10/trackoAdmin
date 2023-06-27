import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type props = {
    type?: string
}

const Transactions = ({type}: props) => {
  return (
    <View>
      <Text>Transactions</Text>
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({})