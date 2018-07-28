import "regenerator-runtime/runtime"; //required for generator functions
import React from 'react';
import { render } from 'react-dom';

import Root from './core/rootComponent';

// Render the app
const renderApp = Component => {

    render(<Component/>,
        document.getElementById('root')
    );
};

renderApp(Root);

// var user;
// //firebase auth
// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     user = result.user;
//     console.log(user)
//     firestore.collection("users").get().then((querySnapshot) => {
//         console.log(querySnapshot)
//     });
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

  //end fb auth


