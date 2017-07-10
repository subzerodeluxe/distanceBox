import { Component, Inject, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { FirebaseApp } from "angularfire2";
import { AuthService } from "../../providers/auth-service";
import { CountdownComponent } from "../../components/countdown/countdown";
import { Profile } from "../../models/profile.interface";
import { UserService } from "../../providers/user-service";

@IonicPage({
  name: 'dashboard'
})

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class Dashboard {

  @ViewChild(CountdownComponent) countdown: CountdownComponent;
  
  userName: string;
  showMoodBox: boolean = true; 
  shakeButton: boolean = true; 
  date: any; 
  inputSeconds: number; 
  inputDate: any; 
  profileData = {} as Profile; 


  constructor(public navCtrl: NavController, public user: UserService, public ev: Events, 
  public auth: AuthService,
  @Inject(FirebaseApp)firebase: any) {
    firebase.auth().onAuthStateChanged(user => {
        
      let regex = /(\w+)\s\w+/; 
      this.userName = regex.exec(user.displayName)[1];
    }) 
   } 

   ionViewDidEnter() {
    this.user.getUserProfile().subscribe(userProfileObservable => {
      console.log("Dashboard user: " + JSON.stringify(userProfileObservable)); 
      this.profileData = userProfileObservable;

      this.ev.publish('userProfile', this.profileData);  
    });
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

