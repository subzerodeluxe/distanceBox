import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { Alerts } from "../../providers/alerts";
import { StorageService } from "../../providers/storage-service";
import { Image } from "../../models/image.interface";
import { AuthService } from "../../providers/auth-service";
import { NotificationService } from "../../providers/notification-service";
import { UserService } from "../../providers/user-service";

@Component({
  selector: 'image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModal implements OnInit{

  date: string;
  uid: string; 
  receivingOneSignalId: string; 
  moodPicture: any; 
  receivedPicture: any; 
  pushNotificationImage: string; 
  imageObject = {} as Image;
  receivedImageObject = {} as Image; 
  imageUploader: string; 
  pictureUploaded: boolean; 
  loadProgress: number = 0;
  shareImageWith: boolean;
  persons: any; 


  constructor(public params: NavParams, public navCtrl: NavController, public user: UserService, public pushService: NotificationService, public auth: AuthService, public alerts: Alerts, public storage: StorageService) {
    this.moodPicture = params.get('moodPicture'); 
    this.date = new Date().toDateString(); 
    this.uid = this.auth.afAuth.auth.currentUser.uid; 

    if(params.get('imageObject')) {
      this.receivedImageObject = params.get('imageObject');  // Ontvangt image object vanuit pushnotificatie 
      this.pushNotificationImage = this.receivedImageObject.url; 
    }

    this.user.getUserProfile().subscribe(currentUser => {
      this.imageUploader = currentUser.name; 
    })
  }

  ngOnInit() {
     this.user.getUsers().subscribe(users => {
      this.persons = users;  
    })
  }

  uploadImageToStorage() {
    if(this.moodPicture != null) { 
      this.storage.uploadImageToStorage(this.moodPicture)
        .then((savedPicture) => {
          this.receivedPicture = savedPicture.downloadURL;
          this.loadProgress = this.storage.percentage; 
          this.pictureUploaded = true; 
        }).catch(error => {
          this.alerts.presentBottomToast("Could not upload image. Please try again!"); 
        })
    } else {
      this.alerts.presentBottomToast("ERROR BEEP BEEP"); 
    }
  }

  uploadImageToDatabase() {
     if(this.shareImageWith) { 
      console.log("Share with: " + this.shareImageWith); 
      this.user.findUserbyName(this.shareImageWith).subscribe(user => {
      this.receivingOneSignalId = user.oneSignalId; 
      })
    }

    this.imageObject = { uploadedBy: this.uid, url: this.receivedPicture, timestamp: this.date, sentTo: this.receivingOneSignalId }; 
    this.storage.uploadImageToDatabase(this.imageObject)
      .then((success) => { 
        this.navCtrl.setRoot('dashboard');

        let imageObject = this.imageObject; 
        let pushBody = {
          "app_id": "6324c641-04b6-4310-8190-359c8de46f19",
          "include_player_ids": [ this.receivingOneSignalId ],
          "headings": {"en": "New image"},
          "contents": {"en": this.imageUploader + " uploaded a new image"},
          "data": {"action": "newImage", "imageObject": imageObject }
        } 
        this.pushService.sendNotification(pushBody)
          .then(data => {
            this.alerts.presentTopToast("Push sent!")
            this.alerts.presentBottomToast("Successfully sent your image to Maarten");
          })
          .catch(err => { this.alerts.presentTopToast("Error sending push" + err)})
      }).catch((error) => {
        this.alerts.presentBottomToast("Something went wrong. Please try again"); 
      })
  }

}
