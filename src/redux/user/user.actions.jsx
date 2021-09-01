//actions are functions that return an object with type and payload()
import { userActionTypes } from "./user.types";

export const setCurrentUser = user =>({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});