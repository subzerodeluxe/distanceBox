import { Component, Inject, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, ModalController } from 'ionic-angular';

import { FirebaseApp } from "angularfire2";
import { AuthService } from "../../providers/auth-service";
import { CountdownComponent } from "../../components/countdown/countdown";
import { Profile } from "../../models/profile.interface";
import { UserService } from "../../providers/user-service";
import { NotificationService } from "../../providers/notification-service";
import { Alerts } from "../../providers/alerts";
import { BoostRequestModal } from "../../modals/boost-request-modal/boost-request-modal";
import { Gif } from "../../pages/gif/gif";
 
@IonicPage({
  name: 'dashboard'
})

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class Dashboard {

  @ViewChild(CountdownComponent) countdown: CountdownComponent;
  shouldAnimate: boolean = true;
  userName: string;
  showMoodBox: boolean = true; 
  shakeButton: boolean = true; 
  date: any; 
  inputSeconds: number; 
  inputDate: any; 
  profileData = {} as Profile; 
  receivedNotifications: any;

  constructor(public navCtrl: NavController, public user: UserService, public alerts: Alerts, public ev: Events, public pushService: NotificationService, 
  public auth: AuthService, public modalCtrl: ModalController, 
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

    this.receivedNotifications = this.pushService.getAllBoostRequestNotifications(); 
  }

  openBoostRequest(boostRequest) {
    let modal = this.modalCtrl.create(BoostRequestModal, { boostRequestObject: boostRequest }); 
    modal.present();
  }

  hideMoodBox() {
    this.showMoodBox = false; 
   }

  loadMoodRate() {
    this.navCtrl.push('submitMood'); 
  }

  loadGifPage() {
    this.navCtrl.push(Gif);
  }

  removeNotification(boostRequest) {
    let sendTo = boostRequest.sendByName; 

    this.pushService.removeBoostRequest(boostRequest);
    this.alerts.presentBottomToast("Declined " + sendTo + "'s request for a boost :(")

    // let pushBody = {
    //     "app_id": "6324c641-04b6-4310-8190-359c8de46f19",
    //     "include_player_ids": [ boostRequest.oneSignalId ],
    //     "headings": {"en": "Oh dear ..."},
    //     "contents": {"en": "Maarten " + " doesn't want to give you a boost :("}
    // }
      
    // this.pushService.sendNotification(pushBody)
    //   .then(data => {
    //     this.alerts.presentTopToast("Push sent!")
    //     this.alerts.presentBottomToast("Successfully sent your request to Maarten");
    //   })
    //   .catch(err => { this.alerts.presentTopToast("Error sending push" + err)})
  }

}

