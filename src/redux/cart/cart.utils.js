export const addItemToCart =(cartItems,     cartItemToAdd)=>{ 
    //cartItems is all the existing items, cartItemToAdd is the item being added.

    const existingCartItem = cartItems.find(cartItem =>cartItem.id ===cartItemToAdd.id);

    if(existingCartItem){  //if item is found
        return cartItems.map(cartItem=>     //remember map will return a new array with whatever item type you want, string, object.
            cartItem.id===cartItemToAdd.id  //if id matches, then
            ? {...cartItem, quantity: cartItem.quantity + 1}   //increase quantity
            : cartItem  //otherwise, return same cart
            );
    }

 //if item is not found, then add a quantity field to item being added.

 return [...cartItems , {...cartItemToAdd, quantity: 1}];

}


export const removeItemFromCart =(cartItems, cartItemToRemove)=>{

    const existingCartItem = cartItems.find(
        cartItem=> cartItem.id === cartItemToRemove.id
        );


    if (existingCartItem.quantity === 1){  //if it's only 1 item left then, filter it out
        return cartItems.filter(cartItem=>cartItem.id !== cartItemToRemove.id);
    }


    return cartItems.map(cartItem=>     //again another case of map() to return new object or modified object
        cartItem.id === cartItemToRemove.id  //if it's the same id then return a new object with existing cartItem keys, add a quantity to it and return a new array otherwise return exact same cartItem object
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
        );



}