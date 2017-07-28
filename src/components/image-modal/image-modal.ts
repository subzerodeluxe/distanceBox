import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { Alerts } from "../../providers/alerts";
import { StorageService } from "../../providers/storage-service";
import { Image } from "../../models/image.interface";
import { AuthService } from "../../providers/auth-service";
import { NotificationService } from "../../providers/notification-service";

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

  constructor(public params: NavParams, public navCtrl: NavController, 
    public pushService: NotificationService, 
    public auth: AuthService, public alerts: Alerts, public storage: StorageService) {
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
    this.imageObject = { uploadedBy: this.uid, url: this.receivedPicture, timestamp: this.date }; 
    this.storage.uploadImageToDatabase(this.imageObject)
      .then((success) => { 
        this.navCtrl.setRoot('dashboard');
        this.alerts.presentBottomToast("Successfully sent your image to Maarten");

        let testBody = {
          "app_id": "6324c641-04b6-4310-8190-359c8de46f19",
          "include_player_ids": ["4886745d-b80c-4ee4-920c-2e6bbab80f81"],
          "headings": {"en": "New image"},
          "contents": {"en": "Maarten uploaded a new image"},
          "data": {"action": "openPage", "message": "This is a secret message!"}
        } 
        this.pushService.testNotification(testBody)
          .then(data => {
            this.alerts.presentTopToast("Push sent!")
          })
          .catch(err => { this.alerts.presentTopToast("Error sending push" + err)})
      }).catch((error) => {
        this.alerts.presentBottomToast("Something went wrong. Please try again"); 
      })
  }

}
