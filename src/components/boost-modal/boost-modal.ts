import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { trigger, state, style, transition, animate } from "@angular/core";
import { Alerts } from "../../providers/alerts";
import { UserService } from "../../providers/user-service";
import { NotificationService } from "../../providers/notification-service";

@Component({
  selector: 'boost-modal',
  templateUrl: 'boost-modal.html',

    animations: [
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 1000ms ease-in')
      ])
    ])
  ]
})
export class BoostModal {

  fetchingData: boolean = false; 
  buttonState: any = "in";
  name: string;
  oneSignalId: string; 

  constructor(public navCtrl: NavController, public alerts: Alerts, public user: UserService, public pushService: NotificationService, public params: NavParams) {
    this.name = params.get('shareMoodWith'); 
    console.log(this.name);

    this.user.findUserbyName(this.name).subscribe(user => this.oneSignalId = user.oneSignalId); 
    console.log("Correct id: " + this.oneSignalId); 
  //   let users = this.user.getUsers().subscribe(users => {
  //     users.forEach(function(user) { 
  //       user.oneSignalId
  //       console.log("Que? " + user.oneSignalId);
  //     })
  //   })
  }

  ionViewDidEnter() { 
    this.sendMoodToUser(); 
  }

  sendMoodToUser() {
    let pushBody = {
        "app_id": "6324c641-04b6-4310-8190-359c8de46f19",
        "include_player_ids": [ this.oneSignalId ],
        "headings": {"en": "Boost request"},
        "contents": {"en": "Maarten requested a boost!"},
        "data": {"action": "openPage", "message": "This is a secret message!"}
      } 
    this.pushService.sendNotification(pushBody)
      .then(data => {
        this.alerts.presentTopToast("Push sent!")
        this.alerts.presentBottomToast("Successfully sent your request to Maarten");
      })
      .catch(err => { this.alerts.presentTopToast("Error sending push" + err)})
  }

  returnToDashboard() {
    this.navCtrl.setRoot('dashboard'); 
  }

}
