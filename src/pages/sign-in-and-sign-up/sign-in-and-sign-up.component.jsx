import React from "react";
import { SignIn } from "../../components/signin/sign-in.component";
import { SignUp } from "../../components/signup/sign-up.component";

import "./sign-in-and-sign-up.styles.scss";

export const SignInSignOut =()=>(
<div className="sign-in-and-sign-up">
<SignIn />
<SignUp />
</div>
);