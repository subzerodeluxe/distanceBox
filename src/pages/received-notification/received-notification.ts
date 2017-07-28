import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'receivedNotication'
})

@Component({
  selector: 'page-received-notification',
  templateUrl: 'received-notification.html',
})
export class ReceivedNotification {

  receivedId: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.receivedId = this.navParams.get('id'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivedNotificationPage');
  }

}
