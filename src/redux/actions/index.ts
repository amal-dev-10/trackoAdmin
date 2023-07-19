// Bottom navigation actions

import { iMembershipInsight, ibusiness, mainStat } from "../../interfaces/business";
import { iTransactions, packagesProps } from "../../interfaces/common";
import { iMembership, iMembershipDetails } from "../../interfaces/iClient";

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

// Overlay

export const setOverlayComponent = (payload: any = null)=>{
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


