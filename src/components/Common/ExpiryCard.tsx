import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatTime, getHourGap, openWhatsapp, shadowGenerator, showToast } from '../../utils/helper'
import IconSet from '../../styles/icons/Icons'
import { borderColor, cardColor, goldColor, iconColor, primaryColor, textColorPrimary, verifyIconColor } from '../../styles/colors'
import { key } from '../../styles/constants'
import { fontSize } from '../../styles/fonts'
import { iExpiredData } from '../../interfaces/iClient'
import { openOverlayParameter } from '../../interfaces/common'
import { setIdTransactions, setOverlayComponent, setTransactionMode } from '../../redux/actions'
import { connect } from 'react-redux'
import { Checkbox } from 'react-native-paper'
import { Firestore, Timestamp } from 'firebase/firestore'

type props = {
  data: iExpiredData & {selected?: boolean, showSelect?: boolean, delivered?: undefined | boolean},
  openOverlay: any,
  mode: any,
  setId: any,
  selectable?: boolean,
  longPressed?: any,
  checkBoxClicked?: any
}

const ExpiryCard = ({data, mode, openOverlay, setId, selectable, longPressed, checkBoxClicked}: props) => {
  const [ended, setEnded] = useState(data as iExpiredData & {selected?: boolean, showSelect?: boolean, delivered?: undefined | boolean});
  const [notifiedOn, setNotifiedOn] = useState(new Date());
  
  const viewTransaction = ()=>{
    setId(data.clientId);
    mode("client");
    openOverlay(1);
  }
  
  const cardLongPressed = ()=>{
    if(!data.showSelect && selectable){
      // let temp = ended;
      // temp.showSelect = true;
      // temp.selected = true;
      // setEnded({...temp});
      longPressed()
    }
  }

  const cardClicked = ()=>{
    if(selectable){
      // if(ended.showSelect){
      //   let temp = ended;
      //   temp.selected = !temp.selected;
      //   setEnded({...temp})
      // }
      checkBoxClicked();
    }
  }

  useEffect(()=>{
    setEnded(JSON.parse(JSON.stringify(data)));
    let n = data?.notifiedOn as any
    if(n){
      let t = new Timestamp(n?._seconds, n?._nanoseconds);
      setNotifiedOn(t.toDate());
    }
  },[data]);

  return (
    <TouchableOpacity 
      style={[styles.expiryCard]} 
      onLongPress={()=>{cardLongPressed()}}
      onPress={()=>{cardClicked()}} 
      activeOpacity={0.7}
    >
      <View style={{flex: 1, display: "flex", flexDirection: "row", gap: 10, alignItems: "center"}}>
        {
          data.showSelect ? 
            <View style={styles.checks}>  
              <Checkbox
                onPress={()=>{cardClicked()}}
                status={data.selected ? 'checked' : "unchecked"}
                color={textColorPrimary}
                uncheckedColor={borderColor}
              />
            </View>
          : <></>
        }
        <View style={[styles.imageSection, styles.common]}>
          {
            ended.profileImageUrl ?
            <Image
               source={{uri: ended.profileImageUrl}}
               style={{height: 60, width: 60, borderRadius: 40}} 
            /> 
            : <IconSet name='user-o' size={60} color={iconColor}/>
          }
          <Text style={styles.nameTag} numberOfLines={1} ellipsizeMode='tail'>{ended.name.toUpperCase()}</Text>
          {
            ended.phoneVerified ? 
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                <Text style={{fontSize: fontSize.xSmall, color: borderColor}}>Verified</Text>
                <IconSet name='ok-circle' color={verifyIconColor} size={10}/>
              </View>
            : <></>
          }
        </View>
        <View style={styles.spacer}></View>
        <View style={[styles.detailSection, styles.common]}>
          <View style={styles.part}>
            <Text style={[key, {color: borderColor}]}>Subscription Ended</Text>
            <Text style={styles.value} numberOfLines={1} ellipsizeMode='tail'>{ended.endedString.toUpperCase()}</Text>
          </View>
          <View style={styles.part}>
            <Text style={[key, {color: borderColor}]}>Package</Text>
            <Text style={[styles.value, {color: goldColor}]} numberOfLines={1} ellipsizeMode='tail'>{ended.tier.toUpperCase()}</Text>
          </View>
          {
            ended?.notified ? 
              <View style={styles.notifiedView}>
                <Text style={{color: iconColor, fontSize: fontSize.small}}>Notified</Text>
                <IconSet name='ok-circle' size={15} color={"#12b100"}/>
              </View>
            : ended.delivered != undefined ?
                ended.delivered ? 
                  <></>
                : 
                <View style={styles.deliveredView}>
                  <Text style={styles.deliveredText}>Undelivered</Text>
                  <IconSet name='cancel-circled' color={"crimson"} size={15}/>
                </View>
              : <></>
          }
        </View>
        <View style={[styles.buttonSection]}>
          <TouchableOpacity style={styles.btn}  activeOpacity={0.7} onPress={()=>{openWhatsapp(data.phoneNumber)}}>
            <IconSet name='whatsapp' color="#25D366" size={20}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}  activeOpacity={0.7} onPress={()=>{viewTransaction()}}>
            <IconSet name='exchange' color={iconColor} size={20}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: "100%", display: "flex", flexDirection: "row" ,justifyContent: "space-between", alignItems: "center"}}>
        <View>
          {/* {
            ended.delivered != undefined ?
              ended.delivered ? 
                <></>
              : <View style={styles.deliveredView}>
                  <IconSet name='cancel' color={"crimson"} size={20}/>
                  <Text style={styles.deliveredText}>Undelivered</Text>
                </View>
            : <></>
          } */}
        </View>
        {
          ended.notified ? 
            <View>
              {
                getHourGap(notifiedOn.getTime()) >= 1 ? 
                  <Text style={{fontSize: fontSize.xSmall, color: borderColor}}>{
                    `Last notified: ${formatTime(getHourGap(notifiedOn.getTime()))} ago`
                  }</Text>
                : <Text style={{fontSize: fontSize.xSmall, color: borderColor}}>{
                  "Last notified: few minutes ago"
                }</Text>
              }
            </View>
          : <Text style={{fontSize: fontSize.xSmall, color: borderColor}}>{
            "Client not notified yet"
          }</Text>
        }
      </View>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: openOverlayParameter)=>{dispatch(setOverlayComponent(id))},
  setId: (id: string)=>{dispatch(setIdTransactions(id))},
  mode: (mode: string)=>{dispatch(setTransactionMode(mode))}
});

export default connect(null, mapDispatchToProps)(ExpiryCard)

const styles = StyleSheet.create({
  expiryCard:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: cardColor,
    width: Dimensions.get("window").width * 0.9,
    paddingHorizontal: 10,
    // maxHeight: Dimensions.get("window").height * 0.15,
    marginRight: 10,
    elevation: 3
  },
  common: {
    display: "flex",
    flexDirection: "column",
  },
  imageSection:{
    alignItems: "center",
    justifyContent:"center",
    gap: 5,
    flex: 0.4
  },
  detailSection:{
    alignItems: "flex-start",
    flex: 0.6,
    gap: 5,
    height: "100%",
    justifyContent: "center"
  },
  buttonSection:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  part:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  value:{
    color: iconColor,
    fontSize: fontSize.small,
    width: "100%"
  },
  nameTag:{
    fontSize: fontSize.small,
    fontWeight: "500",
    width: "100%",
    textAlign: "center"
  },
  btn:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
    borderRadius: 10,
    padding: 10,
    elevation: 3
    // padding: 10
  },
  spacer:{
    height: "100%",
    backgroundColor: primaryColor,
    width: 1
  },
  btnText:{
    color: textColorPrimary
  },
  checks:{
    height: "100%",
    flex: 0.1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  notifiedView:{
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
    gap: 5
  },
  deliveredView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5
  },
  deliveredText:{
    fontSize: fontSize.small,
    color: iconColor,
  }
})