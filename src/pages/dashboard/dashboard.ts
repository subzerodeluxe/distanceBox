import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseApp } from "angularfire2";
import { AuthService } from "../../providers/auth-service";
import { FormatDate } from "../../pipes/format-date";

@IonicPage({
  name: 'dashboard'
})

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class Dashboard {

  userName: string;
  showMoodBox: boolean = true; 
  date: any; 

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

   ngOnInit() {
     this.date = new Date(); 

   }
   hideMoodBox() {
     this.showMoodBox = false; 
   }

   logOutUser() {
     this.auth.logout();
     this.navCtrl.setRoot('login'); 
   }

   loadMoodRate() {
      this.navCtrl.push('submitMood'); 
   }

}

