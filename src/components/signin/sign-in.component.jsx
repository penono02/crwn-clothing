import React from "react";
import  FormInput  from "../form-input/form-input.component";
import  CustomButton  from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

export class SignIn extends React.Component{

    constructor(props){

            super(props);

            this.state ={
                email:'',
                password:''
            }
    }



 handleSubmit = async (event)=>{
     event.preventDefault();
const {email, password } = this.state;

try{
    await auth.signInWithEmailAndPassword(email, password); //notice we use sigininwithemailandpassword counterpart
    //if the auth.signInWithEmailAndPassword succeeds then we clear our state
    this.setState({email:'', password:''});
}
catch(error){
    console.log(error);
}
 
 }

handleChange = event=>{
     const { name, value }  = event.target;  // yes you can destructure target b/c it's an obj
     this.setState({[name]: value});  //dynamically set property/value - this way you assign same handleChange to both email and password fld
}

     render(){

        return(
        <div className ="signin">
            <h2>I already have an account </h2>
            <span>Sign in with your email address and password </span>
            <form onSubmit={this.handleSubmit}>
                <FormInput label="email" type="email" name ="email" value ={this.state.email} required handleChange= {this.handleChange} />
                <FormInput label="password" type="password" name ="password" value ={this.state.password} required handleChange= {this.handleChange} />
                <div className="buttons">
                <CustomButton type ="submit">Sign In </CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign In with Google </CustomButton>
                </div>
               
            </form>

        </div>)
     }


}