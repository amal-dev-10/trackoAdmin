import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../components/Common/Button'
import { borderColor, cardColor } from '../styles/colors'
import { fontSize } from '../styles/fonts'
import SelectImage from '../components/Common/SelectImage'
import { showToast } from '../utils/helper'
import { updateBusiness, uploadBusinessLogo } from '../services/apiCalls/serviceCalls'
import { apiResponse } from '../interfaces/common'
import { ibusiness } from '../interfaces/business'
import { setLoader, updateBusinessAction } from '../redux/actions'
import { connect } from 'react-redux'

type props = {
    updateBusinessDetail: any,
    selectedBusiness: ibusiness,
    showLoader: any
}

const EditBusiness = ({updateBusinessDetail, selectedBusiness, showLoader}: props) => {
    const [logo, setLogo]= useState(selectedBusiness.logoUrl as string);
    const [dataChanged, setDataChanged] = useState(false as boolean);
    const saveClicked = async ()=>{
        showLoader(true);
        let resp: apiResponse | null = await uploadBusinessLogo(logo);
        if(resp?.data){
            let response: apiResponse = await updateBusiness({logoUrl: resp.data} as ibusiness, true);
            if(response.status === 200){
                updateBusinessDetail({...selectedBusiness, ...response.data} as ibusiness)
                showToast("Updated Successfully");
            }else{
                showToast("Something went wrong")
            }
        }else{
            showToast("Something went wrong")
        }
        showLoader(false);
    }
    useEffect(()=>{
        setLogo(selectedBusiness?.logoUrl || "")
    }, []);

    useEffect(()=>{
        if(logo && logo != selectedBusiness.logoUrl){
            setDataChanged(true);
        }else if(logo === selectedBusiness.logoUrl){
            setDataChanged(false);
        }
        else{
            setDataChanged(false);
            showToast("No image selected.")
        }
    }, [logo]);
  return (
    <View style={[styles.common, {paddingTop: 10}]}>
        <View style={styles.common}>
            <SelectImage 
                text='Add Logo' 
                getImageData={(img: string)=>{setLogo(img)}} 
                previewImageList={logo ? [logo] : []}
                mode='library'
            />
        </View>
        <View style={[styles.center, {width: "100%"}]}>
            {
                dataChanged ? 
                    <Button
                        text='SAVE'
                        onTouch={()=>{saveClicked()}}
                        width='35%'
                    />
                : <></>
            }
        </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
    updateBusinessDetail: (data: ibusiness)=>{dispatch(updateBusinessAction(data))},
    showLoader: (show: boolean)=>{dispatch(setLoader(show))}
});

const mapStateToProps = (state:any)=>({
    selectedBusiness: state.dashboard.selectedBusiness,
  })

export default connect(mapStateToProps, mapDispatchToProps)(EditBusiness)

const styles = StyleSheet.create({
    center:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    common:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-start",
    },
    selectImageCard:{
        backgroundColor: cardColor,
        elevation: 3,
        height: Dimensions.get("window").width * 0.2,
        width: Dimensions.get("window").width * 0.2,
        borderRadius: 10
    },
    logoView:{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "flex-start"
    },
    logoText:{
        fontSize: fontSize.small,
        color: borderColor
    }
})