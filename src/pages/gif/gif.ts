import { Component } from '@angular/core';
import { IonicPage, NavController, Events, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'gif'
})

@Component({
  selector: 'page-gif',
  templateUrl: 'gif.html',
})
export class Gif {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GifPage');
  }

  myMove() {
    var elem = document.getElementById("loading");   
    };

}
