import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from "../models/user.interface";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class UserService {

  userProfile: FirebaseObjectObservable<any>; 
  uid: string; 
  user: any; 
 
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { 
  
  } 
  
  editUserProfile(userObject) { 
    let id = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 

    this.user = this.db.object(`/users/${id}`);
    
    this.user.update({
      birthday: userObject.birthday   
    }).then(_ => {
      console.log('set birthday in Firebase --> check!');
    }).catch(error => {
      console.log('set birthday in Firebase --> error!'); 
    })
  }  

  getActiveUser(): FirebaseObjectObservable<any>{
    let id = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    console.log("Current user id: " + id); 
    
    return this.userProfile = this.db.object(`/users/${id}`);

  }
}