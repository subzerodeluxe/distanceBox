import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { Alerts } from "../../providers/alerts";
import { StorageService } from "../../providers/storage-service";
import { Image } from "../../models/image.interface";
import { AuthService } from "../../providers/auth-service";

@Component({
  selector: 'image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModal {

  date: string;
  uid: string; 
  moodPicture: any; 
  receivedPicture: any; 
  imageObject = {} as Image;
  pictureUploaded: boolean; 

  constructor(public params: NavParams, public navCtrl: NavController, public auth: AuthService, public alerts: Alerts, public storage: StorageService) {
    this.moodPicture = params.get('moodPicture'); 
    this.date = new Date().toDateString(); 
    this.uid = this.auth.afAuth.auth.currentUser.uid; 
  }

  uploadImageToStorage() {
    if(this.moodPicture != null) { 
      this.storage.uploadImageToStorage(this.moodPicture)
        .then((savedPicture) => {
          this.receivedPicture = savedPicture.downloadURL; 
          console.log("Nu wel? " + JSON.stringify(this.receivedPicture)); 
          this.pictureUploaded = true; 
        }).catch(error => {
          this.alerts.presentBottomToast("Could not upload image. Please try again!"); 
        })
    } else {
      this.alerts.presentBottomToast("ERROR BEEP BEEP"); 
    }
  }

  uploadImageToDatabase() {
    this.imageObject = { uid: this.uid, url: this.receivedPicture, timestamp: this.date }; 
    this.storage.uploadImageToDatabase(this.imageObject)
      .then((success) => { 
        this.navCtrl.setRoot('dashboard');
        this.alerts.presentBottomToast("Successfully sent your image to Maarten");
      }).catch((error) => {
        this.alerts.presentBottomToast("Something went wrong. Please try again"); 
      })
  }

}
