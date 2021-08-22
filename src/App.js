import React from 'react';
import { Route, Switch} from "react-router-dom";

import { HomePage } from "./pages/HomePage/homepage.component";
import ShopPage from "../src/pages/shop/shop.component";
import { Header } from "./components/header/header.component";
import { SignInSignOut } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument  } from "./firebase/firebase.utils"

import './App.css';

class App extends React.Component {

 constructor(props){
    super(props);

    this.state={
      currentUser: null
    }
 }

 unsubscribeFromAuth = null;

 componentDidMount(){
   //componentDidMount is a runoff, runs once on first render and never runs again..so it would be impossible
   //to check when a user state changes (logs in, logs out, etc)
   //Luckily, firebase provides a onAuthStateChanged that manages state for us, it fires every time
   //there is a user state change and it creates a session. user's info remains until they sign out
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{  //userAuth here is the user state
      // this.setState({currentUser: user});
       if (userAuth){ //if someone logs in with their google account then 
         const userRef = await createUserProfileDocument(userAuth); 

          userRef.onSnapshot(snapShot=>{
            this.setState({
              currentUser:{ //user data like  display name is in snapShot.data() but user id is snapshot
                id:snapShot.id, //we add a new id field to currentUser state, then distribute the other fields of snapshot to the state
                ...snapShot.data()    
              }
            }, ()=>{
              //if you want to see current state after it has been updated, you have to pass a callback function to setState()
                console.log(this.state.currentUser);
            })

          });

       }

       //if userAuth is null meaning (not userAuth), we set the currentUser state to null or userAuth(it's null anyway)
       //Again if user ever logs out, we know we set the current state to null
       //Rememember onAuthStateChanged will fire every time the user does something so this componentDidMount will fire 
       //every time
       this.setState({
      currentUser:userAuth
    })
      
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
        <Header currentUser={this.state.currentUser} />
  
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={ SignInSignOut } />
  
        </Switch>
      
      </div>
    );
  }
 
}

export default App;
