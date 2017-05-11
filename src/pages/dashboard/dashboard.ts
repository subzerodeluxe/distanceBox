import { Component, Inject } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { FirebaseApp } from "angularfire2";
import { AuthService } from "../../providers/auth-service";

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
  shakeButton: boolean = true; 
  date: any; 

  constructor(public navCtrl: NavController, 
  public auth: AuthService,
  @Inject(FirebaseApp)firebase: any) {
    firebase.auth().onAuthStateChanged(user => {
        
      let regex = /(\w+)\s\w+/; 
      this.userName = regex.exec(user.displayName)[1];
    }) 
   } 

   ngOnInit() {
     this.date = new Date(); 

   }
   hideMoodBox() {
     this.showMoodBox = false; 
   }

   loadMoodRate() {
      this.navCtrl.push('submitMood'); 
   }

}

