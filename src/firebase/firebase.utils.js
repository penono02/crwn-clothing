import firebase from "firebase/app" //By doing this, we're importing the firebase utility library
import "firebase/firestore";
import "firebase/auth";

const config ={
    apiKey: "AIzaSyD3hggbPQxH7kUR12wxIDg55_I9Xmu7dEc",
    authDomain: "crwn-db-fe9e9.firebaseapp.com",
    projectId: "crwn-db-fe9e9",
    storageBucket: "crwn-db-fe9e9.appspot.com",
    messagingSenderId: "1059777539302",
    appId: "1:1059777539302:web:172e6a654a8035f6415f27"
  };

  export  const createUserProfileDocument = async (userAuth, additionalData)=>{
      
    if(!userAuth) return;  //if not we don't want to do anything or we exit

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();  
    //The snapshot only represents the data
    //to perform CRUD operation, you must use the documentRef()

    if(!snapShot.exists){ //if there isn't any data in snapshot, then create new data
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData

        })
      }catch(error){
        console.log("error creating user", error.message);
      }

    }

    return userRef;  // we make sure the user always the userRef in case we need it elsewhere
  }
  
  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider(); //give us access to the auth provider class

  provider.setCustomParameters({prompt:'select_account'});


export const signInWithGoogle = ()=>auth.signInWithPopup(provider); // note that sign in with popup, can take other types of popups (ie. twitter), we want to use the google one, so we pass our google provider

export default firebase;  //export default is firebase in case we need the whole library;
