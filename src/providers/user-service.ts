import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Alerts } from "./alerts";
import { FirebaseApp, AngularFire } from "angularfire2";

@Injectable()
export class UserService {

  public firebase: any;
  public gotUser: any; 

  constructor(private alert: Alerts,
  @Inject(FirebaseApp) firebase: any, public af: AngularFire) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {  
        this.gotUser = user; 
      } else {
        this.alert.showAlertMessage("Oops", "Could not find user", "OK"); 
      }
    })
  }

  addtoDatabase(user) {
    console.log("We got the user " + JSON.stringify(user)); 
      let name = user.displayName;
      let email = user.email;
      let uid = user.uid; 

    let currentUserRef = this.af.database.object(`/users/${uid}`);  
    currentUserRef.set({name: name, email: email});
}

  addUserToDatabase() {
    this.addtoDatabase(this.gotUser); 
  }
}