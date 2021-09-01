import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import { ReactComponent as Logo } from "../../assets/crown.svg"; //By importing as ReactComponent, you can use the image as a component
import { auth } from "../../firebase/firebase.utils";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden })=>(
<div className="header">
    <Link className="logo-container" to="/">
        <Logo className="logo" />
    </Link>

    <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/shop">CONTACT</Link>
        {
     //if object is evaluated to true then div, null is evaluated to false then link
         currentUser ?
         <div className="option" onClick={()=>auth.signOut()}> SIGN OUT  </div>
         :
         <Link className ="option" to ="/signin"> SIGN IN </Link>

     }
     <CartIcon />
    </div>
    {hidden && (<CartDropdown />)}
</div>);

/*const mapStateToProps = state =>{
    return {
    currentUser: state.user.currentUser
}
//if you recall a function that returns an object can be shortened to the below like so:*/


const mapStateToProps = ({user:{ currentUser }, cart: { hidden }}) =>({ //more advanced way to destructure
    currentUser,
    hidden
});


export default  connect(mapStateToProps) (Header); // Remember a HOC takes in a component and returns a modified/updated version of it