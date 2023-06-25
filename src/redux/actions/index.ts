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