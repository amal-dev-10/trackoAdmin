import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { fontSize } from "../../styles/fonts";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { apiResponse, dropDownProps, packagesProps } from "../../interfaces/common";
import { borderColor, cardColor, iconColor, primaryColor, textColorPrimary } from "../../styles/colors";
import { activatePackage, getPackages } from "../../services/apiCalls/serviceCalls";
import { connect } from "react-redux";
import { mapPackagesToState, setAllClients, showActivatePackage, updateMembershipState } from "../../redux/actions";
import { showToast } from "../../utils/helper";
import { iMembership, iMembershipDetails } from "../../interfaces/iClient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton, Checkbox } from "react-native-paper";

type modalProps = {
    businessId: string,
    showActivatePack: any,
    updateClientState: any,
    clientData: iMembership,
    setClients: any
}

const ActivateMembership = ({businessId, showActivatePack, updateClientState, clientData, setClients}:modalProps)=>{
    const [dropData, setDropData] = useState([] as dropDownProps[]);
    const [packId, setPackId] = useState("" as string);
    const [msg, setMsg] = useState("" as string);
    const [start, setStart] = useState("" as any);
    const [showStartCalender, setShowStartCalender] = useState(false as boolean);
    const [packages, setPackages] = useState([] as packagesProps[]);
    const [packOptionMsg, setPackOptionMsg] = useState("" as string);
    const [valid, setValid] = useState(false as boolean);

    const opt = [
        { label: 'Resume', value: 'resume' },
        { label: 'Restart', value: 'restart' },
        { label: 'Custom', value: 'custom' },
    ]

    const [options, setOptions] = useState(opt as any);

    const [checkboxes, setCheckboxes] = useState([
        {label: 'Data Verified', value: 'verified', checked: false }
    ])

    const [selectedOption, setSelectedOption] = useState('' as string);

    const handleOptionChange = (value: any) => {
        setSelectedOption(value);
    };

    const getDropDownData = async ()=>{
        let data: apiResponse = await getPackages(businessId);
        if(data.status === 200){
            setPackages([...data.data]);
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
            setDropData([...temp]);
            if(temp.length){
                if((clientData?.memberShipDetails?.tier === undefined || clientData?.memberShipDetails?.expired)){
                    setMsg("You can activate package to your client.");
                }else{
                    setMsg("There is already an active membership for this client")
                }
            }else{
                setMsg("There are no packages. You can add packages in the package tab.")
            }
        }else{
            showToast("Something went wrong.")
            showActivatePack(false);
        }
    }

    const activateMembershipClicked = async ()=>{
        const check: boolean = validate();
        if(check){
            if(checkboxes[0].checked){
                let resp: apiResponse = await activatePackage(packId, selectedOption, {validFrom: start});
                if(resp?.status === 200){
                    updateClientState(resp.data);
                    // setClients([]);
                    showActivatePack(false);
                }else{
                    showToast("Something went wrong!")
                }
            }else{
                showToast("Please verify the data")
            }
        }
    }

    const validate = (): boolean=>{
        if(packId){
            if(selectedOption === "resume"){
                setValid(true);
                return true
            }else if(selectedOption === "restart"){
                setValid(true);
                return true
            }else if(selectedOption === "custom"){
                if(start){
                    setValid(true);
                    return true
                }else{
                    setValid(false);
                    showToast("Select a start date.");
                    return false
                }
            }else{
                setValid(false);
                showToast("Select a package option.");
                return false
            }
        }else{
            setValid(false);
            showToast("Select a pack.");
            return false
        }
    }

    const handleCheckBoxClicked = (opt: any)=>{
        let temp = checkboxes;
        temp[0].checked = !opt.checked;
        setCheckboxes([...temp]);
    }

    const handleDateChange = (event: any, date: Date | undefined)=>{
        if(date){
            setStart(date);
        }
        setShowStartCalender(false);
    }

    const dropDownChanged = (pack: string)=>{
        setPackId(pack);
    }

    useEffect(()=>{
        let packDetail = packages.find((x)=>{return x.id === packId}) || null as packagesProps | null;
        if(packDetail){
            let days: number = 0;
            let yearOrMonth: string = packDetail.durationList[packDetail.duration]
            yearOrMonth === "year" ? days = 365 * parseInt(packDetail.numOfYearOrMonths) : yearOrMonth === "month" ? days = 30 * parseInt(packDetail.numOfYearOrMonths) : days = 0;
            //
            let validFrom =  new Date();
            if(selectedOption === "resume"){
                if(clientData && clientData.memberShipDetails.validThruString){
                    validFrom = new Date(clientData?.memberShipDetails.validThruString)
                    validFrom.setDate(validFrom.getDate() + 1);
                    setValid(true);
                }
            }else if(selectedOption === "custom"){
                if(start){
                    validFrom = start;
                    setValid(true);
                }
            }
            let resultDate = new Date(validFrom);
            resultDate.setDate(validFrom.getDate() + days);
            setPackOptionMsg(`${validFrom.toLocaleDateString()} TO ${resultDate.toLocaleDateString()}`);
        }
    }, [selectedOption, start])

    useEffect(()=>{
        getDropDownData();
        if(!clientData.memberShipDetails?.validFromString){
            let t = opt.find((x)=>{return x.value === "custom"});
            if(t){
                setOptions([t])
            }
        }
    },[])

    return (
        <View style={styles.modalView}>
            <View style={styles.container}>
                <View style={styles.headerActivate}>
                    <Text style={styles.title}>Activate</Text>
                </View>
                <View style={styles.detail}>
                    {
                        dropData.length ?
                            (clientData?.memberShipDetails?.tier === undefined || clientData?.memberShipDetails?.expired) ? 
                                <>
                                    <Text style={styles.msgText}>{msg}</Text>
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
                                            dropDownChanged(item.value)
                                        } }
                                        itemTextStyle={{fontSize: fontSize.small}}
                                        activeColor='#3e3e3e57'
                                    />
                                    {
                                        packId ? 
                                            <View style={styles.startOption}>
                                                <Text style={styles.msgText}>{"Membership start Options *"}</Text>
                                                <View style={styles.radioView}>
                                                    {
                                                        options.map((option: any) => (
                                                            <View key={option.value} style={styles.radio}>
                                                                <RadioButton
                                                                    value={option.value}
                                                                    status={selectedOption === option.value ? 'checked' : 'unchecked'}
                                                                    onPress={() => handleOptionChange(option.value)}
                                                                    color={textColorPrimary}
                                                                    uncheckedColor={borderColor}
                                                                />
                                                                <Text>{option.label}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                            </View>
                                        : <></>
                                    }
                                    {
                                        selectedOption === "custom" ?     
                                            <TouchableOpacity style={styles.filterDateBtn} onPress={()=>{setShowStartCalender(true)}}>
                                                <Text>{start ? start.toLocaleDateString() : "START DATE"}</Text>
                                            </TouchableOpacity>          
                                        : <></>
                                    }
                                </> 
                            : <Text style={styles.msgText}>{msg}</Text>
                        : <Text style={styles.msgText}>{msg}</Text>
                    }
                    {
                        valid ? 
                            <View>
                                {
                                    checkboxes.map((x, i:number)=>{
                                        return (
                                            <View style={styles.checkBoxView} key={"checkbox" + i}>
                                                <Checkbox
                                                    status={x.checked ? "checked" : "unchecked"}
                                                    color={textColorPrimary}
                                                    uncheckedColor={borderColor}
                                                    onPress={()=>{handleCheckBoxClicked(x)}}                            
                                                />
                                                <Text style={{color: iconColor, fontSize: fontSize.small}}>{x.label}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        : <></>
                    }
                </View>
                {
                    packOptionMsg ? 
                        <View style={styles.selectedPackageDetail}>
                            <Text style={styles.msgText}>Package starts from</Text>
                            <Text style={{color: iconColor}}>{packOptionMsg}</Text>
                        </View>
                    : <></>
                }
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
            {
                showStartCalender ? 
                <DateTimePicker
                    value={start ? start : new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(e, d)=>{handleDateChange(e, d)}}
                    onTouchCancel={()=>{setShowStartCalender(false)}}
                />
                : <></>
            }
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
    updateClientState: (data: iMembershipDetails)=>{dispatch(updateMembershipState(data))},
    setClients: (data: iMembership[])=>dispatch(setAllClients(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivateMembership);

const styles = StyleSheet.create({
    container:{
        backgroundColor: cardColor,
        elevation: 3,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        // minHeight: "45%",
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
        gap: 10,
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
    },
    filterDateBtn:{
        padding: 10,
        backgroundColor: primaryColor,
        borderRadius: 10,
        elevation: 3
    },
    radio:{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    radioView:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        justifyContent: "center"
    },
    startOption:{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    selectedPackageDetail:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    checkBoxView:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // width: "100%"
    }
})