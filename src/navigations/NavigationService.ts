import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export const navigate = (name: string, params?: object) => {
    navigationRef.current?.navigate(name, params);
};

export const resetNavigation = (index: number)=>{
    navigationRef.current?.reset({
        index: index,
        routes: [
            {name: "AuthStack"}
        ]
    })
}