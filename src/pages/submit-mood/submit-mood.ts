import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Alerts } from "../../providers/alerts";
import { MoodModal } from "../../components/mood-modal/mood-modal";

@IonicPage({
  name: 'submitMood'
})

@Component({
  selector: 'page-submit-mood',
  templateUrl: 'submit-mood.html',
})

export class SubmitMood {
  
  moodRating: any; 
  moodColor: any; 

  constructor(public navCtrl: NavController, public ev: Events, public alert: Alerts, public modalCtrl: ModalController, public navParams: NavParams) {
    this.ev.subscribe('moodColor', moodColor => {
      this.moodColor = moodColor; 
      console.log("De kleur is: " + this.moodColor); 
    });   
  }

  ionViewWillLoad(){
    this.moodColor = '#D99862'; 
  }

  saveMood(rating) {
    this.moodRating = rating; 
    console.log("Dit is de rating " + rating); 
  }

  saveCurrentMood() {
    if(this.moodRating != null) {
      let modal = this.modalCtrl.create(MoodModal, { mood: this.moodRating, moodColor: this.moodColor });
      modal.present();
    } else {
      this.alert.showAlertMessage("Oops", "Could not save your rating. Try again", "OK"); 
    }
  }

  



}
