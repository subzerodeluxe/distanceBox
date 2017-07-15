import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
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
  name: string; 

  constructor(public navCtrl: NavController, public params: NavParams) {
     this.name = params.get('shareMoodWith'); 
     console.log(this.name); 
  }

  sendMoodToUser() {
    
  }

  returnToDashboard() {
    this.navCtrl.setRoot('dashboard'); 
  }

}
