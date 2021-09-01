import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { HomePage } from "./pages/HomePage/homepage.component";
import ShopPage from "../src/pages/shop/shop.component";
import  Header  from "./components/header/header.component";
import { SignInSignOut } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument  } from "./firebase/firebase.utils"
import { setCurrentUser } from "./redux/user/user.actions";

import './App.css';

class App extends React.Component {

  /* Because we dispatch our user to the redux, we don't need this constructor any more.
 constructor(props){
    super(props);

    this.state={
      currentUser: null
    }
 }
*/
 unsubscribeFromAuth = null;

 componentDidMount(){
   //componentDidMount is a runoff, runs once on first render and never runs again..so it would be impossible
   //to check when a user state changes (logs in, logs out, etc)
   //Luckily, firebase provides a onAuthStateChanged that manages state for us, it fires every time
   //there is a user state change and it creates a session. user's info remains until they sign out
  
   const { setCurrentUser } = this.props;   //Because we will pass setCurrentUser in multiple places, we destructure it like so
   
  
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{  //userAuth here is the user state
  
    // this.setState({currentUser: user});
       if (userAuth){ //if someone logs in with their google account then 
         const userRef = await createUserProfileDocument(userAuth); 

          userRef.onSnapshot(snapShot=>{
            setCurrentUser({  //now whenever your snapshot value updates, we're setting our reducer action object --because our compDidMount will fire, our new user value will also get dispatched to the reducer
                id:snapShot.id, //we add a new id field to currentUser state, then distribute the other fields of snapshot to the state
                ...snapShot.data()    
            })
          });

       }

       //if userAuth is null meaning (not userAuth), we set the currentUser state to null or userAuth(it's null anyway)
       //Again if user ever logs out, we know we set the current state to null
       //Rememember onAuthStateChanged will fire every time the user does something so this componentDidMount will fire 
       //every time
       setCurrentUser(userAuth);
    })
 }

 //onAuthStateChanged subscription will stay open as long as our component is still mounted to the DOM
 //Because it's a subscription (stays open), we must end the subscription when our application is unmounted to avoid memory leak
 //for this, we define an unsubcribeFromAuth function and assing auth.onAuthStateChanged to it, which will of course assign a function to it
//we want to close the subscription when our component unmounts

componentWillUnmount(){
    this.unsubscribeFromAuth();
}


  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route  path='/signin' render={ ()=>this.props.currenttUser ? (<Redirect to="/" />) : (<SignInSignOut />) } />
           {/* switch tells the router to move on when it finds it first match */}
           {/*Render allows you to jsx like it does above - can't dynamically return jsx with component props - 
                if currentUser - meaning if is user is logged then no need to stay on signin page - redirect  to home page
             */}
        </Switch>
      
      </div>
    );
  }
 
}


const mapStateToProps = ({ user })=>({  //we destructure off our user reducer - always destructure object when it makes sense to do so
  currenttUser: user.currenttUser
});

const mapDispatchToProps = dispatch=>({  // dispatch is a function that dispatch actions to reducer
  setCurrentUser: user =>dispatch(setCurrentUser(user))

});


export default connect(mapStateToProps, mapDispatchToProps)(App);
