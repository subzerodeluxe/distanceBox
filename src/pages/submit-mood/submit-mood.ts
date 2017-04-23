import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
  public alert: Alerts, 
  public modalCtrl: ModalController,
  public navParams: NavParams) {
  }

   saveMood(rating) {
     this.moodRating = rating; 
     console.log("Dit is de rating " + rating); 
  }

  saveCurrentMood() {
     if(this.moodRating != null) {
      this.alert.showAlertMessage("Yeehaa", "This is your current rating " + this.moodRating + "%", "OK"); 
     } else {
       this.alert.showAlertMessage("Oops", "Could not save your rating. Try again", "OK"); 
     }

     // open modals 
    
      let modal = this.modalCtrl.create(MoodModal, { mood: this.moodRating });
      modal.present();
   
     
  }



}
