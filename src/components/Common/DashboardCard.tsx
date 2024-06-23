import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { apiResponse, orgProps } from '../../interfaces/common';
import Icon from 'react-native-vector-icons/FontAwesome'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary, verifyIconColor } from '../../styles/colors';
import { fontSize } from '../../styles/fonts';
import { TouchableOpacity } from 'react-native';
import IconSet from '../../styles/icons/Icons';
import { showToast } from '../../utils/helper';
import Button from './Button';
import { iClientOrgs, ibusiness } from '../../interfaces/business';
import { sendRequest, widthdrawRequest } from '../../services/apiCalls/serviceCalls';

const DashboardCard = (props: orgProps) => {
  const [data, setData] = useState<any>();
  const cardClicked = ()=>{
    if(props.loginMode === "admin"){
      if(data?.verified){
        props.onPress()
      }else{
        showToast("Buiness account not verified yet.")
      }
    }else{
      let d = data as iClientOrgs;
      if(d.requested){
        showToast("Approval pending.")
      }else{
        props.onPress();
      }
    }
  }

  useEffect(()=>{
    if(props.loginMode === "admin"){
      setData(props.data as ibusiness)
    }else{
      setData(props.data as iClientOrgs)
    }
  })
  return (
    <TouchableOpacity style={[styles.card]} onPress={()=>{cardClicked()}} activeOpacity={0.7}>
        {
            data?.logoUrl ? 
            <Image
              source={{uri: data?.logoUrl}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          : 
            <Icon size={50} name={"building"} color={textColorPrimary}/>
        }
        <View style={styles.details}>
            {
              <View style={styles.orgNameView}>
                <Text style={styles.cardTitle}>{data?.name?.toUpperCase()}</Text>
                {
                  data?.verified ? 
                      <IconSet name='ok-circle' color={verifyIconColor} size={15}/>
                  : <></>
                }
              </View>
            }
            <Text style={styles.id}>{data?.location?.toLocaleLowerCase()}</Text>
            {(
              !data?.verified && props.loginMode === "admin") ? 
                <Text style={styles.status}>{`Status: Pending verification`}</Text>
              : <></>
            }
        </View>
        {
          !data?.alreadyClient && !data?.requested && props.loginMode === "client" ?
          <Button
              onTouch={()=>{props.onSendRequest(data)}}
              text='Request'
              width='35%'
          />
          :
          (data?.requested && !data?.alreadyClient) && props.loginMode === "client" ? 
          <Button
              onTouch={()=>{props.onWithdrawRequest(data)}}
              text='Requested'
              width='35%'
          />
          : <></>
        }
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
        elevation: 2,
        marginBottom: 6
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
    },
    orgNameView:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5
    },
    status: {
      fontSize: fontSize.xSmall,
      color: borderColor
    }
})