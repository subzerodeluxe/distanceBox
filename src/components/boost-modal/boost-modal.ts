import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { trigger, state, style, transition, animate } from "@angular/core";

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

  constructor(public navCtrl: NavController) {
    console.log('Hello BoostModalComponent Component');
  }

  sendMoodToUser() {
    
  }

  returnToDashboard() {
    this.navCtrl.setRoot('dashboard'); 
  }

}
