import { KeyboardType, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiResponse } from '../interfaces/common';
import { connect } from 'react-redux';
import Button from '../components/Common/Button';
import { CardField, StripeProvider, useStripe, CardForm, createPaymentMethod } from '@stripe/stripe-react-native';
import { container, showToast } from '../utils/helper';
import { borderColor, cardColor, textColorPrimary, textColorSecondary } from '../styles/colors';
import { TextInput } from 'react-native-gesture-handler';
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import { addCardToCustomer } from '../services/apiCalls/serviceCalls';
import { closeOverlayComponent, setSavedCardsAction } from '../redux/actions';

type props = {
  closeOverlay: any,
  setSavedCard: any,
  cards: any[]
}

const AddCard = ({closeOverlay, cards, setSavedCard}: props) => {
  const [inputList, setInputList] = useState([
    {
      name: "nameInput",
      placeHolder: "Name On Card",
      valid: true,
      id: 1,
      value: ""
    }
  ]);
  const [cardDetails, setCardDetails] = useState<Details>();

  const handleInputChange = (value: string, id: string)=>{
    let temp = inputList;
    let index: number = inputList.findIndex((x)=>{return x.name === id});
    if(index > -1){
      temp[index].value = value;
    }
    setInputList([...temp]);
    temp = temp.map((x)=>{
      switch(x.name){
        case "nameInput":
          if(!x.value && (x.value.length > 3 && x.value.length < 16)){
            x.valid = false
          }else{
            x.valid = true
          }
          break;
        default:
          break;
      }
      return x
    });
    setInputList([...temp])
  }

  const saveAndSecureCard = async ()=>{
    if(cardDetails?.complete && inputList[0].value){
      let p = await createPaymentMethod({
        paymentMethodType: "Card",
      });
      let resp: apiResponse = await addCardToCustomer({
        paymentMethod: p
      });
      if(resp.status === 200){
        setSavedCard([...cards, resp.data])
        closeOverlay(16);
      }else{
        showToast("Something went wrong")
      }
    }else{
      showToast("Enter your Card Details")
    }
  }
  return (
    <View style={[styles.addCardScreen]}>
      <View style={styles.inputViews}>
        {
          inputList.map((x)=>{
            return (
              <View style={[styles.inputView, x.valid === false ? styles.inValid : styles.valid]} key={x.id}>
                <TextInput
                  placeholder={x.placeHolder}
                  cursorColor={borderColor}
                  placeholderTextColor={borderColor}
                  style={styles.input}
                  onChangeText={(val: string)=>{handleInputChange(val, x.name)}}
                  value={x.value}
                />
              </View>
            )
          })
        }
        <CardField
          placeholders={{
            number: '4242 4242 4242 4242'
          }}
          onCardChange={(d)=>{setCardDetails(d)}}
          postalCodeEnabled={false}
          cardStyle={{borderWidth: 2, borderColor: borderColor, borderRadius: 10, textColor: textColorSecondary, backgroundColor: cardColor}}
          style={{ height: 60, width: "95%"}}

        />
      </View>
      <View style={styles.buttonView}>
        <Button
          onTouch={()=>{saveAndSecureCard()}}
          width='60%'
          text='SAVE & SECURE'
          key={0}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
  cards: state.monetization.savedCards
})

const mapDispatchToProps = (dispatch: any)=>({
  closeOverlay: (id: number)=>{dispatch(closeOverlayComponent(id))},
  setSavedCard: (data: any[])=>{dispatch(setSavedCardsAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

const styles = StyleSheet.create({
    addCardScreen:{
        display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
      paddingTop: 20,
      flex: 1
    },
    buttonView:{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30,
        width: "100%"
    },
    inputViews:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    cardField:{
      backgroundColor: "blue"
    },
    inputView:{
      height: 60,
      paddingHorizontal: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "95%",
      borderRadius: 10
    },
    inValid:{
      borderColor: "crimson",
      borderWidth: 2,
    },
    valid: {
      borderColor: borderColor,
      borderWidth: 2,
    },
    input:{
      width: "100%"
    }
})