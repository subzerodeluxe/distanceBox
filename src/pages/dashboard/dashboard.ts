import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from "../profile/profile";
import { UserService } from "../../providers/user-service";
import { FirebaseApp } from "angularfire2";
import { AuthService } from "../../providers/auth-service";

@IonicPage({
  name: 'dashboard'
})

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  userName: string; 

  constructor(public navCtrl: NavController, 
  public auth: AuthService, 
  @Inject(FirebaseApp)firebase: any,  
   public navParams: NavParams) {
    firebase.auth().onAuthStateChanged(user => {
        
      let regex = /(\w+)\s\w+/; 
      this.userName = regex.exec(user.displayName)[1];

      console.log("Dit is username " + this.userName); 

    }) 
   } 

   logOutUser() {
     this.auth.logout();
     this.navCtrl.setRoot("Login"); 
   }

   loadMoodRate() {
      this.navCtrl.push("submitMood"); 
   }

}

