// Bottom navigation actions

export const tabIconClicked = (payload: any = null)=>{
  return {
    type: "TAB_ICON_CLICKED",
    payload: payload
  };
};

export const getMembershipData = (payload: any = null)=>{
  return {
    type: "GET_MEMBERSHIP_DATA",
    payload: payload
  };
}