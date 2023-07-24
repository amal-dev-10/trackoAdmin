import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { mainLoaderReducer } from '../redux/reducers/mainLoader'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import { connect } from 'react-redux'
import { ibusiness } from '../interfaces/business'
import { fomatFirstLetterCapital } from '../utils/helper'
import IconSet from '../styles/icons/Icons'
import { setOverlayComponent, setTransactionMode } from '../redux/actions'

type props = {
  business: ibusiness,
  openOverlay: any,
  mode: any
}

type sectionProp = {
  title: string,
  buttons: {name: string, icon: string}[]
}

const BusinessProfile = ({business, openOverlay, mode}:props) => {
  const [section, setSection] = useState([
    {
      buttons: [
        {name: "All Transactions", icon: "exchange"},
        {name: "Payments", icon: "credit-card"},
      ],
      title: "MONEY"
    },
    {
      buttons: [
        {name: "Gallery", icon: "exchange"},
        {name: "Settings", icon: "credit-card"},
        {name: "Share", icon: "credit-card"},
        {name: "Deactivate Account", icon: "credit-card"},
      ],
      title: "MORE"
    }

  ] as sectionProp[]);

  const profileButtonsClicked = (name: string)=>{
    let id: string = name.replace(" ", "").toLowerCase();
    switch(id){
      case "alltransactions":
        mode("all");
        openOverlay(1);
        break
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.businessProfileScreen}>
        <Text style={styles.title}>BUSINESS PROFILE</Text>
        <View style={[styles.row,styles.spaceBetween, styles.profileCard]}>
          <View style={[styles.column, styles.left]}>
            <View style={styles.row}>
              <Text style={styles.nameText}>{business.name.toUpperCase()}</Text>
              {
                business.verified &&
                <IconSet name='phone' color={textColorPrimary} size={20}/>
              }
            </View>
            <Text style={styles.phoneText}>{fomatFirstLetterCapital(business.location)}</Text>
          </View>
          <View style={[styles.column, styles.right]}>
            <View style={styles.profileImage}>
              <IconSet name='user-circle-o' size={30} color={iconColor}/>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.secondRow]}>
          <TouchableOpacity style={[styles.profileBtn, styles.row]} activeOpacity={0.7}>
            <IconSet name='pencil' size={14} color={iconColor}/>
            <Text style={styles.roundBtnText}>EDIT</Text>
          </TouchableOpacity>
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
                              <IconSet name={b.icon} size={20} color={iconColor}/>
                              <Text>{b.name}</Text>
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
  business: state.dashboard.selectedBusiness
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
    gap: 5
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
    color: textColorSecondary
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
  }
})