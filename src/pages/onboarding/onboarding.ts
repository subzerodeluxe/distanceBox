import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'onboarding'
})

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  shakeButton: boolean = true; 

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams) {
  }

  loadLoginPage() {
    this.storage.remove('uid');
    this.navCtrl.setRoot('login'); 
  }

}
