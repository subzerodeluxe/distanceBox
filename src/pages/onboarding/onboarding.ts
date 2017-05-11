import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'onboarding'
})

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  shakeButton: boolean = true; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loadLoginPage() {
    this.navCtrl.setRoot('login'); 
  }

}
