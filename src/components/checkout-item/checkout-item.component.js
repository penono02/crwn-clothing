import React from "react";
import { connect } from "react-redux";

import { clearItemFromCart, addItem, removeItem } from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({cartItem, onClearItem, onAddItem, onRemoveItem})=>{
   const { name, imageUrl, price, quantity } = cartItem;

     return(
        <div className="checkout-item">
                <div className="image-container">
                   <img src={imageUrl} alt="item" />
                </div>
                <span className="name">{name} </span>
                <span className="quantity">
                    <div className="arrow" onClick={()=>onRemoveItem(cartItem)}>&#10094;</div>
                     <span className="value">{quantity}</span>
                    <div className="arrow" onClick={()=>onAddItem(cartItem)}>&#10095;</div>
                    </span>
                <span className="price">{price}</span>
                <span className="remove-button" onClick={()=>onClearItem(cartItem)}>&#10005;</span>
        </div>
    );
}

const mapDispatchToProps = dispatch =>({
    onClearItem: (item)=>dispatch(clearItemFromCart(item)),
    onAddItem: (item)=>dispatch(addItem(item)),
    onRemoveItem: (item)=>dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);