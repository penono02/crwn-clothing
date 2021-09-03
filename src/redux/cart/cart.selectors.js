import { createSelector } from "reselect";

// 2 types of selectors -> input selector and outpout selector

//INPUT SELECTOR - is function that takes in the entire state and returns the reducer (in our case cart reducer)
const selectCart = state=>state.cart;

//Output selector - takes in input selector and returns an output - can pass many input selectors to the array
export const selectCartItems = createSelector([selectCart], cart=>cart.cartItems);
//Note here if have multiple input selectors as say const selectUser = state=>state.user we would have [selectCart, selectUser] as first arg, (cart, user)=>...
//Because we use createSelector to create cart =>cart.cartItems, it's now a memoir selector


export const selectCartHidden = createSelector(
     [selectCart],
     cart=>cart.hidden
);

//we also have to create a selector for our quantity count so
export const selectCartItemsCount = createSelector([selectCartItems],   //once you set the selector you can use here too just lke input selector
     cartItems=>cartItems.reduce(   
    (accumulatedQuantity, cartItem )=>accumulatedQuantity + cartItem.quantity,
    0))

export const selectCartTotal = createSelector([selectCartItems],   //once you set the selector you can use here too just lke input selector
     cartItems=>cartItems.reduce(   
    (accumulatedQuantity, cartItem )=>accumulatedQuantity + cartItem.quantity * cartItem.price,
    0))


    //At this point, you import the selector in to component that needs the state and use it.