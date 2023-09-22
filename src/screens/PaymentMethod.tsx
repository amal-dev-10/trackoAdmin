import { Alert, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary, textColorSecondary } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import IconSet from '../styles/icons/Icons'
import { apiResponse, iOwner, iSubscribedData, iSubscription, iSubscriptionData } from '../interfaces/common'
import { addCardToCustomer, createSubscription, getAllSavedCards, removeCard, setACardToDefault, updateSubscriptionPayment } from '../services/apiCalls/serviceCalls'
import { closeOverlayComponent, setOverlayComponent, setSavedCardsAction, updateOwnerAction } from '../redux/actions'
import { connect } from 'react-redux'
import { showToast } from '../utils/helper'
import { ScrollView } from 'react-native-gesture-handler'
import { RadioButton } from 'react-native-paper'
import { CardField, confirmPayment, createPaymentMethod } from '@stripe/stripe-react-native'
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput'
import Button from '../components/Common/Button'
import { navigate } from '../navigations/NavigationService'

type newType = iSubscription & {selected?: boolean}

type props = {
    openOverlay: any,
    closeOverlay: any,
    setSavedCard: any,
    cards: any[],
    plans: newType[],
    updateOwner: any,
    ownerDetail: iOwner
}

type iKeys = {
    clientSecret: string,
    subscriptionId: string,
    customerId: string,
    amountPayable: number | null,
    planData: {subscription: iSubscriptionData, subscribedData: iSubscribedData}
}

const PaymentMethod = ({openOverlay, closeOverlay, setSavedCard, cards, plans, ownerDetail, updateOwner}: props) => {
    
    const [cardDetails, setCardDetails] = useState<Details>();
    const [selectedPlan, setSelectedPlan] = useState({} as newType);
    const [selectedCard, setSelectedCard] = useState<any>({});

    const tools = [
        {id: "setAsDefault", name: "Set as default"},
        {id: "remove", name: "Remove"}
    ]

    const [addNew, setAddNew] = useState({
        name: "ADD NEW CARD",
        id: 1,
        expanded: true
    })

    const [allKeys, setAllKeys] = useState<iKeys>()

    const saveAndSecureCard = async ()=>{
        try{
            if(cardDetails?.complete){
                let p = await createPaymentMethod({
                    paymentMethodType: "Card",
                });
                let resp: apiResponse = await addCardToCustomer({
                    paymentMethod: p
                });
                if(resp.status === 200){
                    setSavedCard([...cards, resp.data])
                }else{
                    showToast(resp.message);
                }
            }else{
              showToast("Enter your Card Details")
            }
        }
        catch(err){
            console.log(err)
        }
      }

    const toolClicked = async (toolId: string, paymentMethodId: string)=>{
        try{
            let resp: null | apiResponse = null;
            switch(toolId){
                case "setAsDefault":
                    resp = await setACardToDefault({paymentMethodId: paymentMethodId})
                    break;
                case "remove":
                    resp = await removeCard({paymentMethodId: paymentMethodId})
                    break;
                default:
                    break;
            }
            if(resp && resp?.status === 200){
                let temp = cards;
                let index:number = temp.findIndex((x)=>{return x.id === paymentMethodId});
                if(index > -1){
                    if(toolId === "remove"){
                        temp.splice(index, 1);
                    }else if (toolId === "setAsDefault"){
                        temp = temp.map((x)=>{
                            if(x.id === paymentMethodId){
                                x.default = true
                            }else{
                                x.default = false
                            }
                            return x
                        });
                    }
                    setSavedCard([...temp]);
                }
                showToast("SuccessFull");
            }else{  
                let msg: string = ""
                if(toolId === "remove"){
                    msg = "Card not removed."
                }else if(toolId === "setAsDefault"){
                    msg = "Process failed"
                }
                showToast(msg)
            }
        }catch(err){
            console.log(err)
        }
    }

    const expandClicked = async (id: string)=>{
        LayoutAnimation.configureNext({
            duration: 200, // Adjust the frame rate by changing the duration
            update: {
              type: LayoutAnimation.Types.linear,
            },
        });
        if(id != "addNew"){
            let temp = cards.map((x)=>{
                if(x?.id === id){
                    x.expanded = true;
                    let tool = tools;
                    if(x.default){
                        let ind : number = tools.findIndex((d)=> d.id === "setAsDefault");
                        if(ind > -1){
                            tool.splice(ind, 1);
                        }
                    }
                    x.tools = tool;
                }else{
                    x.expanded = false;
                }
                return x
            });
            let t = addNew;
            t.expanded = false;
            setAddNew({...t});
            setSavedCard([...temp]);
        }else{
            let temp = addNew;
            let crds = cards.map((x)=>{
                x.expanded = false;
                return x
            });
            setSavedCard([...crds]);
            temp.expanded = true;
            setAddNew({...temp})
        }
    }

    const payNow = async ()=>{
        let selectedCard = cards.find((x)=>x.expanded);
        if(selectedCard && selectedCard.id && allKeys?.subscriptionId){
            let resp: apiResponse = await updateSubscriptionPayment(allKeys.subscriptionId, selectedCard.id, false);
            if(resp && resp.status === 200){
                let data = {...allKeys as any, ...resp.data}
                setAllKeys({...data});
                if(allKeys.clientSecret){
                    const confirm = await confirmPayment(allKeys.clientSecret);
                    if(!confirm.error){
                        let temp = allKeys.planData;
                        temp.subscription.status = "active";
                        updateOwner({...ownerDetail, ...temp});
                        closeOverlay(15);
                        closeOverlay(14);
                        showToast("payment Successfull");
                    }else{
                        showToast(confirm.error.message);
                    }
                }else{
                    if(resp.message === "cannot_downgrade"){
                        Alert.alert("Failed","You cannot downgrade from your existing subscription.", [{text: "OK"}], {userInterfaceStyle: "dark"})
                        // showToast("You cannot downgrade from your existing subscription.");
                    }
                }
            }else{
                showToast("Something went wrong.")
            }
        }
    }

    const getAllSavedCardsData = async ()=>{
        let resp: apiResponse = await getAllSavedCards();
        if(resp.status === 200){
            setSavedCard([...resp.data])
        }else{
            showToast("Something went wrong.")
        }
        return resp.data
    }

    const createClientSecret = async (tempCards: any[])=>{
        if(tempCards.length){
            let defPaymentId = tempCards.find((x)=>{return x?.default}).id;
            let planSelected = plans.find((x)=>{return x.selected}) as iSubscription;
            if(defPaymentId && planSelected?.priceData?.id){
                let resp: apiResponse = await createSubscription(planSelected.priceData.id, defPaymentId);
                if(resp.status === 200){
                    let key: iKeys = resp.data;
                    if(key.clientSecret){

                    }else{ 
                        if(resp.message === "cannot_downgrade"){
                            Alert.alert("Failed","You cannot downgrade from your existing subscription.", [{text: "OK"}], {userInterfaceStyle: "dark"})
                            // showToast("You cannot downgrade from your existing subscription.");
                        }else{
                            showToast("Something went wrong.")
                        }
                        closeOverlay(15);
                    }
                    setAllKeys({...key});
                }else{
                    closeOverlay(15)
                    showToast("Something went wrong")
                }
            }
        }
    }

    const start = async ()=>{
        let tempCards = await getAllSavedCardsData();
        await createClientSecret(tempCards);
    }

    useEffect(()=>{
        let data = cards.find((x)=>{return x?.expanded}) as iSubscription;
        setSelectedCard(data);
    }, [cards])

    useEffect(()=>{
        let data = plans.find((x)=>{return x.selected}) as iSubscription;
        setSelectedPlan(data);
    }, [plans])

    useEffect(()=>{
        start()
        return ()=>{setSavedCard([])}
    }, [])
  return (
    <View style={styles.paymentMethodScreen}>
        <Text style={styles.title}>{"PAYMENTS"}</Text>
        <ScrollView>
            <View style={[styles.cardsView, styles.column]}>
                <View style={[styles.titleView, styles.row]}>
                    {/* <Text style={styles.sectionTitle}>ADDED CARDS</Text> */}
                    <TouchableOpacity style={styles.addBtn} onPress={()=>{openOverlay(16)}}>
                        <IconSet name='credit-card' size={20} color={textColorPrimary}/>
                        <Text style={styles.btnText}>Cards</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.contentView, styles.column]}>
                    <View style={[styles.card, styles.column, {justifyContent: "center", gap: 10}]}>
                        <View style={[styles.row, {alignItems: "center"}]}>
                            <RadioButton
                                value="addNew"
                                status={addNew.expanded ? 'checked' : "unchecked"}
                                onPress={() => {expandClicked("addNew")}}
                                color={textColorPrimary}
                                uncheckedColor={borderColor}
                            />
                            <TouchableOpacity
                                onPress={()=>{expandClicked("addNew")}} 
                                style={[styles.addNewBtn, styles.row]}
                                activeOpacity={0.6}
                            >
                                <Text style={styles.newCard}>{addNew.name}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            addNew.expanded &&
                            <View style={styles.newCardView}>
                                <CardField
                                    placeholders={{
                                        number: '4242 4242 4242 4242'
                                    }}
                                    onCardChange={(d)=>{setCardDetails(d)}}
                                    postalCodeEnabled={false}
                                    cardStyle={{borderWidth: 2, borderColor: borderColor, borderRadius: 10, textColor: textColorSecondary, backgroundColor: cardColor}}
                                    style={{ height: 55, width: "100%"}}
                                />
                            </View>
                        }
                    </View>
                    {
                        cards.map((x, i:number)=>{
                            return (
                                <View style={[styles.card, styles.column]} key={"card" + i}>
                                    <TouchableOpacity
                                        onPress={()=>{expandClicked(x.id)}} 
                                        style={[styles.cardsCard, styles.row, x.expanded ? styles.cardSeparator : {}]}
                                        activeOpacity={0.6}
                                    >
                                        <RadioButton
                                            value="addNew"
                                            status={x.expanded ? "checked" : "unchecked"}
                                            onPress={() => {expandClicked(x.id)}}
                                            color={textColorPrimary}
                                            uncheckedColor={borderColor}
                                        />
                                        <View style={styles.left}>
                                            {
                                                x?.default &&
                                                <Text style={styles.primaryPayment}>Default payment method</Text>
                                            }
                                            <Text style={styles.cardNumber}>XXXX XXXX XXXX {x?.card?.last4}</Text>
                                            <Text style={styles.providerText}>{x?.card?.brand}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        x.expanded &&
                                        <View style={[styles.expandedView, styles.row]}>
                                            {
                                                x.tools.map((t: any, index: number)=>{
                                                    return (
                                                        <TouchableOpacity 
                                                            style={styles.cardToolsBtn} 
                                                            activeOpacity={0.6} 
                                                            key={"tool" + index}
                                                            onPress={()=>{toolClicked(t.id, x.id)}}
                                                        >
                                                            <Text style={styles.cardToolBtnText}>{t.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
        <View style={styles.btnView}>
            {
                addNew.expanded ? 
                <Button
                    onTouch={()=>{saveAndSecureCard()}}
                    width='60%'
                    text='SAVE & SECURE'
                    key={0}
                /> :
                selectedPlan?.priceData.unit_amount &&
                <Button
                    onTouch={()=>{payNow()}}
                    width='60%'
                    text={'PAY ₹' + (allKeys?.amountPayable || 0) / 100}
                    key={1}
                />
            }
        </View>
    </View>
  )
}

const mapStateToProps = (state: any)=>({
    cards: state.monetization.savedCards,
    plans: state.monetization.subscriptionPlans,
    ownerDetail: state.auth.user,
})

const mapDispatchToProps = (dispatch: any)=>({
    openOverlay: (id: number)=>{dispatch(setOverlayComponent(id))},
    closeOverlay: (id: number)=>{dispatch(closeOverlayComponent(id))},
    setSavedCard: (data: any[])=>{dispatch(setSavedCardsAction(data))},
    updateOwner: (data: iOwner)=>{dispatch(updateOwnerAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod)

const styles = StyleSheet.create({
    paymentMethodScreen:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        paddingTop: 20
    },
    title:{
        fontSize: fontSize.xLarge,
        color: textColorPrimary,
        fontWeight: "300",
        marginBottom: 20,
        textAlign: "left"
    },
    row:{
        display: "flex",
        flexDirection: "row"
    },
    column: {
        display: "flex",
        flexDirection: "column"
    },
    titleView:{
        justifyContent: "space-between",
        alignItems: "center"
    },
    sectionTitle:{
        color: borderColor,
        fontSize: fontSize.xmedium
    },
    addBtn:{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: 10,
        backgroundColor: cardColor,
        borderRadius: 10,
        height: 90,
        width: 90,
        borderWidth: 2,
        borderColor: borderColor
    },
    btnText:{
        fontSize: fontSize.xmedium,
        color: textColorSecondary,
        fontWeight: "500"
    },
    cardsView:{
        gap: 10
    },
    contentView:{
        gap: 5
    },
    cardsCard:{
        alignItems: "center",
        justifyContent: "center",
    },
    addNewBtn:{
        justifyContent: "flex-start"
    },
    cardSeparator: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        borderBottomColor: primaryColor
    },
    newCard:{
        fontSize: fontSize.xmedium
    },
    card: {
        backgroundColor: cardColor,
        padding: 10,
        borderRadius: 10,
        minHeight: 70
    },
    cardNumber:{
        color: textColorSecondary,
        fontSize: fontSize.medium
    },
    providerText:{
        fontSize: fontSize.small,
        color: iconColor
    },
    left:{
        flex: 1
    },
    primaryPayment:{
        fontSize: fontSize.xSmall,
        color: borderColor
    },
    expandIcon:{
        marginRight: 10
    },
    expandedView: {
        paddingVertical: 10,
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    cardToolsBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: borderColor,
        borderRadius: 10,
    },
    cardToolBtnText: {
        color: iconColor,
        fontSize: fontSize.small
    },
    newCardView:{
        borderTopWidth: 2,
        borderTopColor: primaryColor,
        paddingVertical: 10
    },
    btnView:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        flexDirection: "row"
    }
})