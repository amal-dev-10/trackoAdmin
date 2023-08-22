import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconSet from '../../styles/icons/Icons'
import { borderColor, cardColor } from '../../styles/colors'
import { fontSize } from '../../styles/fonts'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

type props = {
    text: string,
    getImageData: any,
    previewImageList?: string[],
    mode: "library" | "camera"
}

const SelectImage = ({getImageData, text, previewImageList, mode}: props) => {
    const [selectedLogo, setSelectedLogo] = useState("" as string);
    const [previewList, setPreviewList] = useState([] as string[]);
    const openLibrary = async ()=>{
        if(mode === "library"){
            await launchImageLibrary({mediaType: "photo"}, (response) => {
                if (!response.didCancel && !response.errorCode && response.assets) {
                  const imageData = response?.assets[0];
                  if(imageData.uri){
                      setSelectedLogo(imageData.uri);
                      getImageData(imageData.uri);
                      setPreviewList([imageData.uri])
                  };
                }
            });
        }else if(mode === "camera"){
            await launchCamera({mediaType: "photo"}, (response)=>{
                if (!response.didCancel && !response.errorCode && response.assets) {
                    const imageData = response?.assets[0];
                    if(imageData.uri){
                        setSelectedLogo(imageData.uri);
                        getImageData(imageData.uri);
                        setPreviewList([imageData.uri])
                    };
                }
            })
        }
    }
    useEffect(()=>{
        if(previewImageList){
            setPreviewList([...previewImageList])
        }
    },[previewImageList])
  return (
    <View style={styles.row}>
        <TouchableOpacity 
            style={[styles.selectImageCard, styles.center, styles.dime]} 
            activeOpacity={0.7}
            onPress={()=>{openLibrary()}}
        >
            <Text numberOfLines={2} ellipsizeMode='tail' style={{fontSize: fontSize.xSmall, color: borderColor, width: '100%', textAlign: 'center'}}>{text}</Text>
            <IconSet name='picture' size={20} color={borderColor}/>
        </TouchableOpacity>
        {
            previewList.map((x, i: number)=>{
                return (
                    <Image
                        source={{uri: x}}
                        style={[styles.dime, styles.previewImage]}
                        key={"image" + i}

                    />
                )
            })
        }
    </View>
  )
}

export default SelectImage

const styles = StyleSheet.create({
    center:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    selectImageCard:{
        backgroundColor: cardColor,
        elevation: 3,
        gap: 5,
        borderRadius: 10,
        padding: 3
    },
    dime:{
        height: Dimensions.get("window").width * 0.2,
        width: Dimensions.get("window").width * 0.2,
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
    },
    row:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap"
    },
    previewImage: {
        borderRadius: 10
    }
})