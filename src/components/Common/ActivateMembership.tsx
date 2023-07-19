import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { fontSize } from "../../styles/fonts";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { apiResponse, dropDownProps, packagesProps } from "../../interfaces/common";
import { borderColor, cardColor, iconColor, primaryColor } from "../../styles/colors";
import { activatePackage, getPackages } from "../../services/apiCalls/serviceCalls";
import { connect } from "react-redux";
import { mapPackagesToState, showActivatePackage, updateMembershipState } from "../../redux/actions";
import { showToast } from "../../utils/helper";
import { iMembership, iMembershipDetails } from "../../interfaces/iClient";

type modalProps = {
    businessId: string,
    showActivatePack: any,
    updateClientState: any,
    clientData: iMembership
}

const ActivateMembership = ({businessId, showActivatePack, updateClientState, clientData}:modalProps)=>{
    const [dropData, setDropData] = useState([] as dropDownProps[]);
    const [packId, setPackId] = useState("" as string);

    const getDropDownData = async ()=>{
        let data: apiResponse = await getPackages(businessId);
        let temp: dropDownProps[] = [];
        data.data.map((d: packagesProps)=>{
            if(d?.active){
                temp.push(
                    {
                        label: d.tier.toUpperCase(),
                        value: d.id
                    }
                )                
            }
        });
        setDropData([...temp])
    }

    const activateMembershipClicked = async ()=>{
        if(packId){
            let resp: apiResponse = await activatePackage(packId)
            if(resp.status === 200){
                updateClientState(resp.data);
                showActivatePack(false);
            }else{
                showToast("Something went wrong!")
            }
        }
    }

    const dropDownChanged = (pack: string)=>{
        setPackId(pack.toUpperCase());
    }

    useEffect(()=>{
        getDropDownData();
    },[])

    return (
        <View style={styles.modalView}>
            <View style={styles.container}>
                <View style={styles.headerActivate}>
                    <Text style={styles.title}>Activate</Text>
                </View>
                <View style={styles.detail}>
                    {
                        // dropData.length && !clientData.memberShipDetails?.expired ?
                        //     <Text style={styles.msgText}>You can activate package to your client.</Text>
                        // : 
                        // clientData.memberShipDetails?.tier && !clientData.memberShipDetails.expired ? 
                        // <Text style={styles.msgText}>There is already an active membership for this client</Text>
                        // : dropData.length ? <></> : <Text style={styles.msgText}>There are no packages. You can add packages in the package tab.</Text>
                    }
                    {
                        dropData.length ?
                            (clientData?.memberShipDetails?.tier === undefined || clientData?.memberShipDetails?.expired) ? 
                                <>
                                    <Text style={styles.msgText}>You can activate package to your client.</Text>
                                    <Dropdown
                                        style={[styles.dropdown]}
                                        placeholderStyle={{fontSize: fontSize.small}}
                                        selectedTextStyle={{color: iconColor, fontSize: fontSize.small}}
                                        containerStyle={styles.dropDownContainer}
                                        data={dropData}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'Select package'}
                                        // value={year.value}
                                        onChange={function (item): void {
                                            dropDownChanged(item.label)
                                        } }
                                        itemTextStyle={{fontSize: fontSize.small}}
                                        activeColor='#3e3e3e57'
                                    /> 
                                </> 
                            : <Text style={styles.msgText}>There is already an active membership for this client</Text>
                        : <Text style={styles.msgText}>There are no packages. You can add packages in the package tab.</Text>
                    }
                </View>
                <View style={styles.footer}>
                    {
                        (clientData?.memberShipDetails?.tier === undefined || clientData?.memberShipDetails?.expired) ?
                        <Button
                            onTouch={()=>{activateMembershipClicked()}}
                            text='Activate'
                            width='50%'
                        /> : <></>
                    }
                    <Button
                        onTouch={()=>{showActivatePack(false)}}
                        text='Cancel'
                        width='50%'
                        borderLess={true}
                    />

                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state: any)=>({
    businessId: state.dashboard.selectedBusiness.uid,
    clientData: state.client.selectedClient
});

const mapDispatchToProps = (dispatch: any)=>({
    mapPackage: (data: packagesProps[])=>{dispatch(mapPackagesToState(data))},
    showActivatePack: (show:boolean)=>{dispatch(showActivatePackage(show))},
    updateClientState: (data: iMembershipDetails)=>{dispatch(updateMembershipState(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivateMembership);

const styles = StyleSheet.create({
    container:{
        backgroundColor: cardColor,
        elevation: 3,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        minHeight: "40%",
        maxHeight: "70%",
        width: "90%"
    },
    headerActivate:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#1d1d1d",
        borderBottomWidth: 2
    },
    detail:{
        flex: 1,
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "column",
        gap: 10
    },
    title:{
        color: iconColor,
        fontSize: fontSize.medium
    },
    footer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    modalView:{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: Dimensions.get("window").height,
        backgroundColor: "#2b2b2b68"
    },
    dropdown:{
        width: "80%",
        backgroundColor: primaryColor,
        paddingVertical: 9,
        paddingHorizontal: 10,
        elevation: 4,
        borderRadius: 10
    },
    dropDownContainer:{
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderWidth: 0,
        elevation: 2,
        marginTop: 5
    },
    msgText:{
        width: "80%",
        textAlign: "center",
        fontSize: fontSize.small,
        color: borderColor
    }
})