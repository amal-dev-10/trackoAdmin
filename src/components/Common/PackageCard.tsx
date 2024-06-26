import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiResponse, packagesProps } from '../../interfaces/common'
import { borderColor, cardColor, goldColor, iconColor, primaryColor, textColorPrimary, textColorSecondary } from '../../styles/colors'
import { shadowGenerator, showToast } from '../../utils/helper'
import { fontSize } from '../../styles/fonts'
import { confirmAction, confirmModalPropertiesAction, removePackageAction, showConfirmModalAction, updatePackage } from '../../redux/actions'
import { connect } from 'react-redux'
import IconSet from '../../styles/icons/Icons'
import { deletePackage, updatePackageService } from '../../services/apiCalls/serviceCalls'
import { key } from '../../styles/constants'
import Loading from './Loading'

type props = {
    packDetail?: packagesProps,
    updatePack: any,
    businessId: string,
    showModal: any,
    confirmation: boolean,
    setProperties: any,
    removePackage: any,
    setConfirm: any
}

type EditableProps = {
    active: boolean,
    features: string[],
    cost: string,
    duration: number,
    numOfYearOrMonths: string,
    title: string,
    tier: string
}

const PackageCard = ({packDetail, updatePack,businessId,confirmation,showModal,setProperties,removePackage,setConfirm}: props) => {
    const [showLoader, setShowLoader] = useState(false as boolean);
    const [currentId, setCurrentId] = useState("" as string);
    const [editable, setEditable] = useState({
        active: packDetail?.active || false,
        cost: packDetail?.cost || "0",
        duration: packDetail?.duration || 0,
        features: packDetail?.features || [],
        numOfYearOrMonths: packDetail?.numOfYearOrMonths || "1",
        tier: packDetail?.tier || "",
        title: packDetail?.title || ""
    } as EditableProps);
    const [newFeature, setNewFeature] = useState("" as string);
    const [editMode, setEditMode] = useState(false as boolean);
    const [def, setDefault] = useState({
        active: packDetail?.active || false,
        cost: packDetail?.cost || "0",
        duration: packDetail?.duration || 0,
        features: packDetail?.features || [],
        numOfYearOrMonths: packDetail?.numOfYearOrMonths || "1",
        tier: packDetail?.tier || "",
        title: packDetail?.title || ""
    } as EditableProps)

    const addFeature = ()=>{
        if(newFeature){
            setEditable({...editable, features: [...editable.features, newFeature]});
            setNewFeature("");
        }
    };

    const featureRemoveClicked = (index: number)=>{
        if(editable.features.length){
            let d = editable;
            d.features.splice(index, 1);
            setEditable({...d});
        }
    }

    const editCancelClicked = ()=>{
        setEditMode(false);
        setEditable({
            ...def
        });
        setNewFeature("");
    };

    const validate = (d: any)=>{
        let newData = d as packagesProps;
        let valid: string[] = [];
        if(!(newData.cost && parseInt(newData.cost) > 0)){
            valid.push("Cost should be greater than 0")
        }
        if(!(newData.features.length && newData.features.length > 0)){
            valid.push("You should atleast add 1 feature");
        }
        if(!(newData.numOfYearOrMonths && parseInt(newData.numOfYearOrMonths) > 0)){
            valid.push("Number of months cant be 0");
        }
        if(!valid.length){
            return true
        }else{
            showToast(valid[0]);
            return false
        }
    }

    const activateOrUpdateClicked = async (active: boolean)=>{
        let newData = {...packDetail, ...editable, active: active};
        let check = validate(newData);
        if(check){
            setShowLoader(true);
            let resp: apiResponse = await updatePackageService(businessId, newData, true);
            updatePack({...resp.data, newTempId: packDetail?.id});
            setEditable({...editable, active: active})
            setDefault({...editable, active: active});
            setEditMode(false);
            setShowLoader(false);
        }
    }

    const removeIconClicked = ()=>{
        setCurrentId(packDetail?.id || "");
        if(packDetail?.id && packDetail?.id.length > 4){
            setProperties({msg: `You have selected ${packDetail?.tier.toUpperCase()} package to remove.\nSure that you want to remove.`})
            showModal(true);
        }else{
            removePackage(packDetail?.id);
        }
    }

    const deletePackageFromDb = async ()=>{
        let resp: apiResponse = await deletePackage(packDetail?.id || "");
        if(resp.status === 200){
            removePackage(packDetail?.id);
            showToast("Package deleted successfully.");
        }else{
            showToast("Something went wrong.");
        }
        setConfirm(false);
    }

    useEffect(()=>{
        if(confirmation && packDetail?.id && packDetail.id === currentId){
            deletePackageFromDb();
        }
    }, [confirmation])

    useEffect(()=>{
        setEditable({
            active: packDetail?.active || false,
            cost: packDetail?.cost || "0",
            duration: packDetail?.duration || 0,
            features: packDetail?.features || [],
            numOfYearOrMonths: packDetail?.numOfYearOrMonths || "1",
            tier: packDetail?.tier || "",
            title: packDetail?.title || ""
        });
        setDefault({
            active: packDetail?.active || false,
            cost: packDetail?.cost || "0",
            duration: packDetail?.duration || 0,
            features: packDetail?.features || [],
            numOfYearOrMonths: packDetail?.numOfYearOrMonths || "1",
            tier: packDetail?.tier || "",
            title: packDetail?.title || ""
        });
    }, [packDetail]);


  return (
    <View style={[styles.packCard, shadowGenerator(2,2)]}>
        <View style={styles.logoView}>
            <Text style={styles.newTemplateTitle} numberOfLines={1} ellipsizeMode='tail'>
                {
                    editable?.tier || packDetail?.active ? 
                    editable?.tier.toUpperCase() : "NEW TEMPLATE"
                }
            </Text>
            {/* <IconSet name={packDetail?.tier+'pack'} color={goldColor} size={80}/> */}
            {
                (editable.active && !editMode) ?
                <TouchableOpacity onPress={()=>{setEditMode(true)}} style={styles.editBtn} activeOpacity={0.7}>
                    <IconSet name='pencil' color={iconColor} size={15}/>
                </TouchableOpacity> :
                (editable.active) &&
                <TouchableOpacity onPress={()=>{editCancelClicked()}} style={styles.editBtn} activeOpacity={0.7}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            }
        </View>
        <View style={styles.inputsView}>
            {
                !(editable?.active && !editMode) ?
                <View style={styles.packNameView}>
                    <Text style={[key, {color: borderColor}]}>{"Tier * ( 3 to 14 characters )"}</Text>
                    <TextInput
                        style={[styles.packNameInput]}
                        keyboardType='name-phone-pad'
                        onChangeText={(e)=>{setEditable({...editable, tier: e})}}
                        cursorColor={textColorSecondary}
                        value={editable.tier}
                        placeholderTextColor={borderColor}
                        placeholder='Eg. Premium Pack'
                        maxLength={14}
                    />
                </View> : <></>
            }
            <View style={styles.packNameView}>
                <Text style={[key, {color: borderColor}]}>Pack name *</Text>
                {
                    (editable?.active && !editMode) ?
                    <Text style={styles.packTitle}>{editable?.title}</Text> :
                    <TextInput
                        style={[styles.packNameInput]}
                        keyboardType='name-phone-pad'
                        onChangeText={(e)=>{setEditable({...editable, title: e})}}
                        cursorColor={textColorSecondary}
                        value={editable.title}
                    />
                }
            </View>
            <View style={styles.packageDetailView}>
                <Text style={[key, {color: borderColor}]}>Cost & Duration *</Text>
                <View style={[styles.costCard, shadowGenerator()]}>
                    <View style={styles.costLabel}>
                        <View style={styles.unitView}>
                            <Text style={styles.unit}>{packDetail?.currency}</Text>
                        </View>
                        {
                            (editable?.active && !editMode) ?
                            <Text style={styles.price}>{editable?.cost}</Text> :
                            <TextInput
                                style={[styles.priceInput, styles.commonInput]}
                                placeholderTextColor={borderColor}
                                keyboardType='number-pad'
                                onChangeText={(e)=>{setEditable({...editable, cost: e})}}
                                cursorColor={textColorSecondary}
                                value={editable.cost}
                            />
                        }
                    </View>
                    <Text style={{color: iconColor}}>/</Text>
                    <View style={styles.priceOptions}>
                        {
                            (editable.active && !editMode) ?
                                <Text>{editable.numOfYearOrMonths}</Text> 
                            :
                            <TextInput
                                style={[styles.numberOfMonthsOrYearInput, styles.commonInput]}
                                placeholderTextColor={borderColor}
                                keyboardType='number-pad'
                                onChangeText={(e)=>{setEditable({...editable, numOfYearOrMonths: e})}}
                                cursorColor={textColorSecondary}
                                value={editable.numOfYearOrMonths}
                            />
                        }
                        {
                            (editable.active && !editMode) ? 
                            <Text>{packDetail?.durationList[editable.duration]}</Text>
                            :
                            <View style={styles.durationView}>
                                {
                                    packDetail?.durationList.map((data, i: number)=>{
                                        return (
                                            <TouchableOpacity 
                                                style={[styles.durationBtn, editable.duration === i ? styles.active : styles.inActive]} 
                                                key={"duration" + i}
                                                onPress={()=>{setEditable({...editable, duration: i})}}
                                            >
                                                <Text>{data}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
      <View style={styles.spacer}></View>
      <View style={styles.featureView}>
        <Text style={styles.text}>FEATURES</Text>
        <View style={styles.featureList}>
            {
                editable?.features.map((data, i:number)=>{
                    return (
                        <View style={styles.feature} key={"feature" + i}>
                            <IconSet name='angle-left' color={textColorPrimary} size={20} style={styles.rotate}/>
                            <Text style={styles.f}>{data}</Text>
                            {
                                (!editable.active || editMode) ?   
                                <TouchableOpacity onPress={()=>{featureRemoveClicked(i)}} style={{padding: 5}}>
                                    <Text style={styles.remove}>{"X"}</Text>
                                </TouchableOpacity>
                                : <Text></Text>
                            }
                        </View>
                    )
                })
            }
            {
                (editable?.features && editable.features.length < 5 && (!editable.active || editMode )) &&
                <View style={styles.feature}>
                    <IconSet name='angle-left' color={textColorPrimary} size={20} style={styles.rotate}/>
                    <TextInput
                        placeholder=''
                        style={styles.textInput}
                        cursorColor={borderColor}
                        onChangeText={(e)=>{setNewFeature(e)}}
                        value={newFeature}
                    />
                    <TouchableOpacity onPress={()=>{addFeature()}} style={styles.addBtn}>
                        <Text style={styles.addText}>{"+ ADD"}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
      </View>
        <View style={styles.btnView}>
            {
                (editable?.active && editMode) &&
                <TouchableOpacity style={[styles.btn, styles.withBorder]} onPress={()=>{activateOrUpdateClicked(true)}} activeOpacity={0.7}>
                    <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
            }
            {
                editable?.active ?     
                    <TouchableOpacity style={[styles.btn]} onPress={()=>{activateOrUpdateClicked(false)}} activeOpacity={0.7}>
                        <Text style={styles.btnText}>Deactivate</Text>
                    </TouchableOpacity>
                : 
                    <TouchableOpacity style={[styles.btn, styles.withBorder]} onPress={()=>{activateOrUpdateClicked(true)}} activeOpacity={0.7}>
                        <Text style={styles.btnText}>Activate</Text>
                    </TouchableOpacity>
            }
            <TouchableOpacity style={[styles.btn]} onPress={()=>{removeIconClicked()}} activeOpacity={0.7}>
                <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
        </View>
        {
            showLoader ? 
            <Loading/>
            : <></>
        }
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
    updatePack: (data: packagesProps)=>dispatch(updatePackage(data)),
    showModal: (show: boolean)=>{dispatch(showConfirmModalAction(show))},
    setProperties: (data: {msg?: string, title?: string})=>{dispatch(confirmModalPropertiesAction(data))},
    removePackage: (id: string)=>{dispatch(removePackageAction(id))},
    setConfirm: (confirm: boolean)=>{dispatch(confirmAction(confirm))}
})

const mapStateToProps = (state: any)=>({
    businessId: state.dashboard.selectedBusiness.uid,
    confirmation: state.confirmation.confirm
})

export default connect(mapStateToProps, mapDispatchToProps)(PackageCard)

const styles = StyleSheet.create({
    packCard:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: cardColor,
        gap: 20,
        padding: 10,
        borderRadius: 10,
        width: Dimensions.get("window").width * 0.8,
        marginHorizontal: 10
    },
    packImage:{
        height: 90,
        width: 150,
        resizeMode: "contain"
    },
    costCard:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 10,
        width: "100%",
        backgroundColor: primaryColor,
        borderRadius: 10
    },
    unit:{
        fontSize: fontSize.small,
        color: textColorPrimary
    },
    price:{
        fontSize: fontSize.large,
        fontWeight: "400",
    },
    costLabel:{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5,
        height: "100%"
    },
    spacer:{
        height: 2,
        width: "100%",
        backgroundColor: primaryColor,
        borderRadius: 20
    },
    featureView:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flex: 1,
        width : "100%"
    },
    featureList:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "100%"
    },
    text:{
        color: borderColor,
        fontSize: fontSize.xmedium
    },
    btnView:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 10
    },
    feature:{
        borderBottomWidth: 2,
        borderBottomColor: borderColor,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 5,
    },
    angle:{
        fontSize: fontSize.medium,
        color: textColorPrimary,
        fontWeight: "600"
    },
    remove:{
        color: "crimson",
        fontWeight: "700"
    },
    textInput:{
        padding:0,
        flex: 1,
        textAlign: "center",
    },
    addBtn:{
        padding: 5,
    },
    addText:{
        color: borderColor,
        fontWeight: "700",
        fontSize: fontSize.xmedium
    },
    btn:{
        padding: 10,
        borderRadius: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingLeft: 40,
        paddingRight: 40,
    },
    withBorder:{
        backgroundColor: textColorPrimary
    },
    btnText:{
        fontSize: fontSize.small,
        color: borderColor,
        fontWeight: "700"
    },
    f:{
        fontSize: fontSize.xmedium,
        color: textColorSecondary
    },
    priceOptions:{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
    },
    priceInput:{
        fontSize: fontSize.large,
        fontWeight: "400",
        color: iconColor
    },
    commonInput:{
        borderBottomWidth: 2,
        borderBottomColor: borderColor,
        padding: 0,
        paddingHorizontal: 10,
        textAlign: "center",
    },
    durationBtn:{
        padding: 5,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    durationView:{
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    numberOfMonthsOrYearInput:{
        fontSize: fontSize.small,
        fontWeight: '400',
        color: iconColor
    },
    active:{
        borderWidth: 2,
        borderColor: iconColor, 
    },
    inActive: {
        borderWidth: 2,
        borderColor: borderColor,
    },
    unitView:{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    logoView:{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    editBtn:{
        position: "absolute",
        right: 0,
        top: 0,
        padding: 5
    },
    rotate:{
        transform:[{rotate: "180deg"}]
    },
    packageDetailView:{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        alignItems: "flex-start"
    },
    packNameView:{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        alignItems: "flex-start"
    },
    packNameInput:{
        backgroundColor: primaryColor,
        borderRadius: 10,
        padding: 10,
        width: "100%"
    },
    newTemplateTitle:{
        color: goldColor,
        fontSize: fontSize.medium,
        maxWidth: "90%",
        fontWeight: "500",
    },
    inputsView:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    packTitle:{
        fontSize: fontSize.xmedium,
        color: textColorSecondary
    }
})