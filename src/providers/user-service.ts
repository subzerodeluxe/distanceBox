import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from "../models/profile.interface";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class UserService {

  user: any;
  userProfile: FirebaseObjectObservable<Profile>; 
 
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { 
  } 
  
  editUserProfile(userObject) { 
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    this.user = this.db.object(`/users/${userId}`);
    
    this.user.update({
      birthday: userObject.birthday  
    }).then(_ => {
      console.log('set birthday in Firebase --> check!');
    }).catch(error => {
      console.log('set birthday in Firebase --> error!'); 
    })
  }  

  updateUserProfile(userObject) { 
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    this.user = this.db.object(`/users/${userId}`);
    
    this.user.update({
      birthday: userObject.birthday,
      name: userObject.name,
      email: userObject.email 
    }).then(_ => {
      console.log('set birthday in Firebase --> check!');
    }).catch(error => {
      console.log('set birthday in Firebase --> error!'); 
    })
  }  

  getUserProfile(): FirebaseObjectObservable<Profile> {
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    return this.userProfile = this.db.object(`/users/${userId}`); 
  }
}