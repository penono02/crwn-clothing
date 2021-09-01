import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";


const CartIcon = ({ toggleCartHidden })=>(<div>
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
    <span className="item-count"> 0 </span>
    </div>
</div>);

const mapDispatchToState = dispatch =>({
    toggleCartHidden: ()=>dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToState)(CartIcon);