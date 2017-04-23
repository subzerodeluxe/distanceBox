import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'mood-modal',
  templateUrl: 'mood-modal.html'
})
export class MoodModal {

  moodRating: any;
  welcomeMessage: string;
  closingMessage: string;  
  showCamera: boolean; 
  shareMood: boolean; 

  constructor(params: NavParams, 
  public viewCtrl: ViewController) {
    
    this.moodRating = params.get('mood'); 

   console.log("Dit is meegekomen " + this.moodRating);
 }

  ngOnInit() {
    if(this.moodRating >= 50) {
      this.welcomeMessage = "Good to hear!"; 
      this.closingMessage = "Want to share your smile?"; 
      this.showCamera = true; 
    } else {
      this.welcomeMessage = "Oh noo ...";
      this.closingMessage = "You could use a boost";
      this.shareMood = true; 
    }
    
  }

  closeModal() {
      this.viewCtrl.dismiss();
   }

}
