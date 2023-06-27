// Bottom navigation actions

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

