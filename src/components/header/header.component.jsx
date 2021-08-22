import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg"; //By importing as ReactComponent, you can use the image as a component

import { auth } from "../../firebase/firebase.utils";

export const Header = ({ currentUser })=>(
<div className="header">
    <Link className="logo-container" to="/">
        <Logo className="logo" />
    </Link>

    <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/shop">CONTACT</Link>
        {
     //object is evaluated to true then div, null is evaluated to false then link
         currentUser ?
         <div className="option" onClick={()=>auth.signOut()}> SIGN OUT  </div>
         :
         <Link className ="option" to ="/signin"> SIGN IN </Link>

     }
    </div>
</div>);