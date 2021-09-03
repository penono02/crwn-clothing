import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE ={
    hidden: true,
    cartItems:[]
}

 const cartReducer = (state=INITIAL_STATE, action)=>{

    switch(action.type){

        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {  //will return a new state/new object, that takes all the previous state, and we also add a field hidden
                ...state,
                hidden: !state.hidden
            }

            case CartActionTypes.ADD_ITEM:
                return {
                    ...state,
                    cartItems: addItemToCart(state.cartItems, action.payload)
                }

            case CartActionTypes.REMOVE_ITEM:
               return{
                   ...state,
                   cartItems: removeItemFromCart(state.cartItems, action.payload)
               }

            case CartActionTypes.CLEAR_ITEM_FROM_CART:
                return{  
                    ...state,
                    cartItems: state.cartItems.filter(
                        //takes the state (state here is the old state) 
                        //compare the id of item in old state with payload id then returns a new array and overwrite old array by new array return by filter
                        cartItem=>cartItem.id !== action.payload.id
                        )
                }

            default:
                return state;

    } 
}

export default cartReducer;