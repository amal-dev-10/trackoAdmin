import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { orgProps } from '../../interfaces/common';
import Icon from 'react-native-vector-icons/FontAwesome'
import { borderColor, cardColor, iconColor, textColorPrimary, textColorSecondary, verifyIconColor } from '../../styles/colors';
import { fontSize } from '../../styles/fonts';
import { TouchableOpacity } from 'react-native';
import IconSet from '../../styles/icons/Icons';
import { showToast } from '../../utils/helper';

const DashboardCard = (props: orgProps) => {
  const cardClicked = ()=>{
    if(props.data.verified){
      props.onPress()
    }else{
      showToast("Buiness account not verified yet.")
    }
  }
  return (
    <TouchableOpacity style={[styles.card]} onPress={()=>{cardClicked()}} activeOpacity={0.7}>
        {
            props.data.logoUrl ? 
            <Image
              source={{uri: props.data.logoUrl}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          : 
            <Icon size={50} name={"building"} color={textColorPrimary}/>
        }
        <View style={styles.details}>
            {
              <View style={styles.orgNameView}>
                <Text style={styles.cardTitle}>{props.data.name?.toUpperCase()}</Text>
                {
                  props.data.verified ? 
                      <IconSet name='ok-circle' color={verifyIconColor} size={15}/>
                  : <></>
                }
              </View>
            }
            <Text style={styles.id}>{props.data.location.toLocaleLowerCase()}</Text>
            {
              !props.data.verified ? 
                <Text style={styles.status}>{`Status: Pending verification`}</Text>
              : <></>
            }
        </View>
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