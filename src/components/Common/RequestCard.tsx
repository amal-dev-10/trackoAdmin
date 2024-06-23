import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { apiResponse, requestsProps } from '../../interfaces/common'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from '../../styles/colors'
import { fomatFirstLetterCapital, shadowGenerator, showToast } from '../../utils/helper'
import { key } from '../../styles/constants'
import { fontSize } from '../../styles/fonts'
import IconSet from '../../styles/icons/Icons'
import { iClient } from '../../interfaces/iClient'
import { acceptRequest } from '../../services/apiCalls/serviceCalls'

type props = {
  requestData: iClient,
  onAcceptRequest: any,
  onDeclineRequest: any
}

const RequestCard = ({requestData, onAcceptRequest, onDeclineRequest}: props) => {
  return (
    <View style={[styles.requestCard, shadowGenerator(2,2)]}>
      {
          requestData?.profileImageUrl ? 
          <Image
            source={{uri: requestData?.profileImageUrl}}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          : 
          <IconSet name='user-o' color={iconColor} size={50}/>
        }
      <View style={styles.spacer}></View>
      <View style={styles.detailView}>
        <View style={[styles.section, styles.left]}>
          <View style={[styles.single, styles.singleLeft]}>
            <Text style={key}>Name</Text>
            <Text style={styles.value}>{fomatFirstLetterCapital(requestData.name)}</Text>
          </View>
          <View style={[styles.single, styles.singleLeft]}>
            <Text style={key}>Phone Number</Text>
            <Text style={styles.value}>{requestData.phoneNumber}</Text>
          </View>
        </View>
        <View style={[styles.section]}>
          <View style={[styles.single, styles.singleRight]}>
            <Text style={key}>Age</Text>
            <Text style={styles.value}>{requestData.age}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={[styles.btn, styles.withBorder]} onPress={()=>{onAcceptRequest(requestData)}} activeOpacity={0.7}>
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn]} onPress={()=>{onDeclineRequest(requestData)}} activeOpacity={0.7}>
          <Text style={styles.btnText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RequestCard

const styles = StyleSheet.create({
  requestCard:{
    backgroundColor: cardColor,
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    width: "48%"
  },
  value:{
    color: textColorPrimary,
    fontSize: fontSize.xmedium,
    fontWeight: "500"
  },
  single:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  singleRight: {
    alignItems: "flex-end"
  },
  singleLeft:{
    alignItems: "flex-start"
  },
  detailView:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    flex:1
  },
  section:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    height: "100%",
  },
  spacer:{
    height: 2,
    backgroundColor: primaryColor,
    width: "100%"
  },
  left:{
    flex: 1
  },
  btnView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    gap: 10
  },
  btn:{
    padding: 5,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  withBorder:{
    backgroundColor: textColorPrimary
  },
  btnText:{
    fontSize: fontSize.small,
    color: borderColor,
    fontWeight: "700"
  }
})