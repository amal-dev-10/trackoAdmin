// Bottom navigation actions

import { iBusinessSettings, iFinanceInsight, iMembershipInsight, ibusiness, mainStat } from "../../interfaces/business";
import { iApiCall, iTransactions, packagesProps } from "../../interfaces/common";
import { iFilters, iMembership, iMembershipDetails } from "../../interfaces/iClient";
import { fomatFirstLetterCapital, setRoute } from "../../utils/helper";
import store from "../store";

export const tabIconClicked = (payload: any = null)=>{
  return {
    type: "TAB_ICON_CLICKED",
    payload: payload
  };
};

// client screen actions

export const getMembershipData = (payload: any = null)=>{
  return {
    type: "GET_MEMBERSHIP_DATA",
    payload: payload
  };
}

export const updateMembershipState = (payload: iMembershipDetails)=>{
  return {
    type: "UPDATE_MEMBERSHIP",
    payload: payload
  };
}

// request screen actions

export const getRequests = (payload: any = null)=>{
  return {
    type: "GET_REQUESTS",
    payload: payload
  };
}

// Package screen action

export const getAllPackages = (payload: any = null)=>{
  return {
    type: "GET_ALL_PACKAGES",
    payload: payload
  };
}

export const updatePackage = (payload: any = null)=>{
  return {
    type: "UPDATE_PACKAGE",
    payload: payload
  }
}

export const showActivatePackage = (payload: boolean)=>{
  return {
    type: "SHOW_ACTIVATE_PACKAGE",
    payload: payload
  }
}

export const removePackageAction = (payload: string)=>{
  return {
    type: "REMOVE_PACKAGE",
    payload: payload
  }
}

// Overlay

export const setOverlayComponent = (payload: any = null)=>{
  let st = store;
  let index: number = st.getState().overlay.componentList.findIndex((x)=>{return x.id === payload});
  if(index > -1){
    setRoute(fomatFirstLetterCapital(st.getState().overlay.componentList[index].screenName || ""))
  }
  return {
    type: "SET_OVERLAY_COMPONENT",
    payload: payload
  }
}

export const closeOverlayComponent = (payload: any = null)=>{
  return {
    type: "CLOSE_OVERLAY_COMPONENT",
    payload: payload
  }
}

// profile

export const toggleSubButton = (payload: any = null)=>{
  return {
    type: "SUB_BUTTON_TOGGLE",
    payload: payload
  }
}

// loader

export const setLoader = (payload: any = null)=>{
  return {
    type: "SHOW_LOADER",
    payload: payload
  }
}

// main loader

export const showMainLoaderAction = (payload: boolean)=>{
  return {
    type: "SHOW_MAIN_LOADER",
    payload: payload
  }
}

// dashboard

export const setAllBusinesses = (payload: ibusiness[])=>{
  return {
    type: "SET_ALL_BUSINESS_LIST",
    payload: payload
  }
}

export const setSelectedBusiness = (payload: ibusiness)=>{
  return {
    type: "SET_SELECTED_BUSINESS",
    payload: payload
  }
}

export const updateBusinessAction = (payload: ibusiness)=>{
  return {
    type: "UPDATE_BUSINESS",
    payload: payload
  }
}

// clients

export const setAllClients = (payload: iMembership[])=>{
  return {
    type: "SET_ALL_CLIENTS",
    payload: payload
  }
}

export const setSelectedClient = (payload: iMembership)=>{
  return {
    type: "SET_SELECTED_CLIENT",
    payload: payload
  }
}

export const resetReducerAction = (payload: string)=>{
  return {
    type: "RESET_REDUCER",
    payload: payload
  }
}

export const setClientMode = (payload: string)=>{
  return {
    type: "SET_MODIFY_CLIENT_MODE",
    payload: payload
  }
}

export const updateClientAction = (payload: any)=>{
  return {
    type: "UPDATE_CLIENT_DETAILS",
    payload: payload
  }
}

// packages

export const mapPackagesToState = (payload: packagesProps[])=>{
  return {
    type: "MAP_SAVED_PACKAGE",
    payload: payload
  }
}

export const setIdTransactions = (payload: string)=>{
  return {
    type: "SET_ID",
    payload: payload
  }
}

export const setTransactions = (payload: iTransactions[])=>{
  return {
    type: "SET_TRANSACTIONS",
    payload: payload
  }
}

export const setTransactionMode = (payload: string)=>{
  return {
    type: "SET_MODE",
    payload: payload
  }
}

// home

export const setHomeStatsAction = (payload: mainStat)=>{
  return {
    type: "SET_HOME_STAT",
    payload: payload
  }
}

export const setMembershipInsightAction = (payload: iMembershipInsight)=>{
  return {
    type: "SET_MEMBERSHIP_INSIGHT",
    payload: payload
  }
}

export const setFinanceInsightAction = (payload: iFinanceInsight)=>{
  return {
    type: "SET_FINANCE_INSIGHT",
    payload: payload
  }
}

// route

export const setRouteNameAction = (payload: string)=>{
  return {
    type: "SET_ROUTE_NAME",
    payload: payload
  }
}

export const checkBoxClickedAction = (payload: iFilters[])=>{
  return {
    type: "CHECKBOX_CLICKED",
    payload: payload
  }
}

export const filterTabClickedAction = (payload: iFilters[])=>{
  return {
    type: "FILTER_TAB_CLICKED",
    payload: payload
  }
}

export const previousFilterDataState = ()=>{
  return {
    type: "SET_PREVIOUS_FILTER",
    payload: null
  }
}

export const applyFilterAction = (payload: iFilters[])=>{
  return {
    type: "APPLY_FILTER",
    payload: payload
  }
}

export const setDropDownDatAction = (payload: iFilters[])=>{
  return {
    type: "SET_DROPDOWN_DATA",
    payload: payload
  }
}

export const addNewTemplateAction = ()=>{
  return {
    type: "ADD_NEW_TEMPLATE",
    payload: null
  }
}

//confirmation

export const confirmModalPropertiesAction = (payload: {msg?: string, title?: string})=>{
  return {
    type: "SET_MODAL_PROPERTIES",
    payload: payload
  }
}

export const confirmAction = (payload: boolean)=>{
  return {
    type: "SET_CONFIRM",
    payload: payload
  }
}

export const showConfirmModalAction = (payload: boolean)=>{
  return {
    type: "SHOW_CONFIRMATION_MODAL",
    payload: payload
  }
}

export const setApiCallAction = (payload: iApiCall)=>{
  return {
    type: "SET_NEW_API_CALL",
    payload: payload
  }
}

export const completeApiCallAction = (payload: string)=>{
  return {
    type: "COMPLETE_API_CALL",
    payload: payload
  }
}

export const cancelApiCall = (payload: string)=>{
  return {
    type: "CANCEL_API_CALL",
    payload: payload
  }
}

export const updateBusinessSettingsAction = (payload: iBusinessSettings)=>{
  return {
    type: "UPDATE_BUSINESS_SETTINGS",
    payload: payload
  }
}

export const resetSelectedBusinessAction = ()=>{
  return {
    type: "RESET_SELECTED_BUSINESS",
    payload: null
  }
}



