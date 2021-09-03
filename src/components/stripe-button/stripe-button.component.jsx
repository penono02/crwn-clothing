import React from "react";
import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({ price })=>{
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_sAU0q7zJigw6fGlziKS3QcAk00l3o3vhKH";


    const onToken = token =>{
        //token is to pass to the backend for payment processing
        //see my backend code in either MealsToGo firebase Pay functions 
        //or EddyBTechnology backend code for stripe payment processing
        console.log(token);
        alert("Payment successfull");
    }
    return (
        <StripeCheckout 
        label="Pay Now"
        name="CRWN Cothing Ltd."
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"  
        token={onToken}    
        stripeKey ={publishableKey} 
        />
    );
}

export default StripeCheckoutButton;