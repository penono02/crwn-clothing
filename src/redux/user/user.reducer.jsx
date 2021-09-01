// A reducer is just a function that takes in the old/current state, and action and return an updated state
import { userActionTypes } from "./user.types";
const INITIAL_STATE ={
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action)=>{  //state is the old/current state. if it's null, then it falls back to INITIAL_STATE

     switch( action.type){
        case userActionTypes.SET_CURRENT_USER:

            return{
                ...state,
                currentUser:action.payload
            }


        default:
            return state;
     }
}

export default userReducer;