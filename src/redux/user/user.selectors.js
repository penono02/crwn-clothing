import { createSelector } from "reselect";

const selectUser = state=> state.user; //state . reducer name (INPUT)

export const selectCurrentUser =createSelector(
    [selectUser], 
    user=>user.currentUser  //will give you the state object and you just access the state using dot notation
    );