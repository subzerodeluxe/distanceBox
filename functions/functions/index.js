const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase); 

// Create user profile 
exports.createUserProfile = functions.auth.user().onCreate(event => {

    admin.database().ref(`/users/${event.data.uid}`).set({
        name: event.data.displayName,
        email: event.data.email,
        profileImage: event.data.photoURL, 
        fbToken: event.data.providerData 
    }); 
})