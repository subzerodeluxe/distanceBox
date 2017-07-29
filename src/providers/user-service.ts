import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from "../models/profile.interface";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { OneSignal } from "@ionic-native/onesignal";
import { Alerts } from "./alerts";

@Injectable()
export class UserService {

  user: any; 
  userProfile: FirebaseObjectObservable<Profile>; 
  oneSignalUid: string; 
 
  constructor(public afAuth: AngularFireAuth, public alerts: Alerts, public db: AngularFireDatabase, public oneSignal: OneSignal) { 
    this.initializeOneSignal(); 
  } 

  initializeOneSignal() {
    this.oneSignal.getIds()
      .then((data) => { this.oneSignalUid = data.userId })
      .catch(err => { this.alerts.presentTopToast(err)}); 
    console.log("OS UID: " + this.oneSignalUid);
  }
 
  editUserProfile(userObject) { 
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    this.user = this.db.object(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/users/${userId}`);

    this.alerts.presentTopToast("UID: " + this.oneSignalUid); 
    return new Promise((resolve, reject) => {
      this.user.update({
        birthday: userObject.birthday,
        oneSignalId: this.oneSignalUid 
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      });
    })
  }  

  updateUserProfile(userObject) { 
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    this.user = this.db.object(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/users/${userId}`);

    this.user.update({
      birthday: userObject.birthday,
      name: userObject.name,
      email: userObject.email
    }).then(_ => {
      return this.user; 
    }).catch(error => {
      console.log('set birthday in Firebase --> error!'); 
    })
  }  

  getUserProfile(): FirebaseObjectObservable<Profile> {
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:""; 
    return this.userProfile = this.db.object(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/users/${userId}`); 
  }

  getUsers(): FirebaseListObservable<Profile[]> {
    return this.db.list(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/users`);
  }
}