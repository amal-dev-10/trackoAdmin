import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, goldColor, iconColor, primaryColor, textColorPrimary, textColorSecondary, verifyIconColor } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { ibusiness } from '../interfaces/business'
import { fomatFirstLetterCapital } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { setOverlayComponent, setTransactionMode } from '../redux/actions'

type props = {
  business: ibusiness,
  openOverlay: any,
  mode: any,
  loginMode: string | null
}

type sectionProp = {
  title: string,
  buttons: {name: string, icon: string}[]
}

const BusinessProfile = ({business, openOverlay, mode, loginMode}:props) => {
  const [section, setSection] = useState([
    {
      buttons: [
        {name: "All Transactions", icon: "exchange"},
        // {name: "Payments", icon: "credit-card"},
      ],
      title: "MONEY"
    },
    {
      buttons: [
        // {name: "Gallery", icon: "picture"},
        {name: "Settings", icon: "cog-outline"},
        // {name: "Share", icon: "share"},
        // {name: "Deactivate Account", icon: "cancel-circled-outline"},
      ],
      title: "MORE"
    }

  ] as sectionProp[]);
  const [stars, setStars] = useState([] as any[]);
  const [rating, setRating] = useState(0 as number);

  const ratingStarGenerator = ()=>{
      let int: number = Math.floor(rating);
      let deci: number = rating % 1;
      let temp: any[] = []
      for (let index = 0; index < int; index++) {
          temp.push(
              <IconSet name='star' color={goldColor} size={18} key={"fullStar" + index}/>
              )
      }
      if(deci != 0){
          temp.push(
              <IconSet name='star-half-alt' color={goldColor} size={18} key={"half"}/>
            )
      };
      return temp
  }

  const profileButtonsClicked = (name: string)=>{
    let id: string = name.replace(" ", "").toLowerCase();
    switch(id){
      case "alltransactions":
        mode("all");
        openOverlay(1);
        break;
      case "settings":
        openOverlay(13);
        break; 
      default:
        break;
    }
  }

  useEffect(()=>{
    let starList = ratingStarGenerator();
    setStars([...starList]);
  }, [rating])

  useEffect(()=>{
    setRating(parseInt(business?.rating || "0"));
  },[]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.businessProfileScreen}>
        <Text style={styles.title}>{loginMode === "admin" ? "BUSINESS PROFILE" : loginMode === "client" ? "PROFILE" : ""}</Text>
        <View style={[styles.row,styles.spaceBetween, styles.profileCard]}>
          <View style={[styles.column, styles.left, {flex: 1}]}>
            <View style={[styles.row, {width: "100%"}]}>
              <Text style={styles.nameText} numberOfLines={1} ellipsizeMode='tail'>{business.name.toUpperCase()}</Text>
              {/* {
                business.verified &&
                <IconSet name='ok-circle' color={verifyIconColor} size={20}/>
              } */}
            </View>
            <Text style={styles.phoneText}>{fomatFirstLetterCapital(business.location)}</Text>
            {
              rating ? 
                  <View style={styles.ratingView}>
                      {
                          stars
                      }
                      <Text>{rating}</Text>
                  </View>
              : <Text style={styles.noRatingText}>No rating</Text>
            }
          </View>
          <View style={[styles.column, styles.right]}>
            <View style={styles.profileImage}>
              {
                business.logoUrl ? 
                  <Image
                    source={{uri: business.logoUrl}}
                    style={{height: 50, width: 50, borderRadius: 25}}
                  />
                : 
                <IconSet name='user-circle-o' size={30} color={iconColor}/>
              }
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.secondRow]}>
          {
            loginMode === "admin" &&
            <TouchableOpacity style={[styles.profileBtn, styles.row]} activeOpacity={0.7} onPress={()=>{openOverlay(12)}}>
              <IconSet name='pencil' size={14} color={iconColor}/>
              <Text style={styles.roundBtnText}>EDIT</Text>
            </TouchableOpacity>
          }
        </View>
        <>
          {
            section.map((d, di: number)=>{
              return (
                <View style={[styles.column,styles.sectionComponent]} key={"section" + di}>
                  <Text style={styles.sectionTitle}>{d.title}</Text>
                  <View style={styles.section}>
                    {
                      d.buttons.map((b, i:number)=>{
                        return (
                          <TouchableOpacity 
                            style={[styles.row, styles.sectionButton, d.buttons.length - 1 === i ? {} : styles.buttonBottomBorder]} key={`section${di}button${i}`}
                            onPress={()=>{profileButtonsClicked(b.name)}}
                          >
                            <View style={[styles.row, styles.buttonFirst]}>
                              <IconSet name={b.icon} size={20} color={borderColor}/>
                              <Text style={{color: textColorSecondary, fontSize: fontSize.small}}>{b.name}</Text>
                            </View>
                            <IconSet name='angle-left' size={20} style={{transform: [{rotate: "180deg"}]}}/>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
        </>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: any)=>({
  business: state.dashboard.selectedBusiness,
  loginMode: state.appState.loginMode
})

const mapDispatchToProps = (dispatch: any)=>({
  openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
  mode: (m: string)=>{dispatch(setTransactionMode(m))}
})

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile)

const styles = StyleSheet.create({
  businessProfileScreen:{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingTop: 20
  },
  row:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  spaceBetween:{
    justifyContent: "space-between"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  left:{
    alignItems: "flex-start"
  },
  right:{
    alignItems: "flex-end"
  },
  profileImage:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cardColor,
    height: 50,
    width: 50,
    borderRadius: 30,
    elevation: 3
  },
  nameText:{
    fontSize: fontSize.medium,
    fontWeight: "500",
    color: textColorSecondary,
    minWidth: "85%",
    maxWidth: "90%"
  },
  phoneText:{
    fontSize: fontSize.small,
    color: borderColor
  },
  title:{
    fontSize: fontSize.large,
    color: textColorPrimary,
    fontWeight: "300",
    marginBottom: 20
  },
  section:{
    width: "100%",
    padding: 10,
  },
  sectionComponent:{
    borderRadius: 5,
    elevation: 3,
    backgroundColor: cardColor,
    // gap: 3,
    paddingTop: 6
  },
  sectionTitle:{
    fontSize: fontSize.xmedium,
    color: borderColor,
    borderLeftWidth: 5,
    borderLeftColor: borderColor,
    // padding: 5,
    paddingVertical: 5,
    paddingLeft: 12,
    borderRadius: 2
  },
  sectionButton:{
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  buttonFirst:{
    gap: 10
  },
  buttonBottomBorder:{
    borderBottomWidth: 1,
    borderBottomColor: primaryColor,
  },
  profileCard:{
    padding: 5
  },
  profileBtn:{
    gap: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: textColorPrimary
  },
  roundBtnText:{
    fontSize: fontSize.small,
    color: iconColor
  },
  secondRow:{
    justifyContent: "center",
    width: "100%"
  },
  ratingView:{
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  noRatingText:{
    color: borderColor,
    fontSize: fontSize.small
  }
})