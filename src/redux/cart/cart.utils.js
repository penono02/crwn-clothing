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