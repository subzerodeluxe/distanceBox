import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'submitMood'
})
@Component({
  selector: 'page-submit-mood',
  templateUrl: 'submit-mood.html',
})
export class SubmitMood {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitMood');
  }

}
