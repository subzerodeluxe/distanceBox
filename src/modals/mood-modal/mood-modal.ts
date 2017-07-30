import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController, NavController, ModalController, Platform } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Alerts } from "../../providers/alerts";
import { StorageService } from "../../providers/storage-service";
import { BoostModal } from "../boost-modal/boost-modal";
import { UserService } from "../../providers/user-service";
import { ImageModal } from "../image-modal/image-modal";

@Component({
  selector: 'mood-modal',
  templateUrl: 'mood-modal.html'
})
export class MoodModal {

  moodRating: any;
  moodColor: any; 
  welcomeMessage: string;
  closingMessage: string;  
  showCamera: boolean; 
  shareMood: boolean; 
  shareMoodWith: any; 
  persons: any; 

  imageData: any; 
  moodPicture: string = null; 

  constructor(params: NavParams, public platform: Platform, public navCtrl: NavController, public user: UserService, public viewCtrl: ViewController,public loadingCtrl: LoadingController, public alerts: Alerts,
  public storage: StorageService, public camera: Camera, public modalCtrl: ModalController) {
    
    this.moodRating = params.get('mood'); 
    this.moodColor = params.get('moodColor'); 

   console.log("Dit is meegekomen " + this.moodRating + " " + this.moodColor);
 }

  ngOnInit() {
    if(this.moodRating >= 55) {
      this.welcomeMessage = "Good to hear!"; 
      this.closingMessage = "Want to share your smile?"; 
      this.showCamera = true; 
    } else {
      this.welcomeMessage = "Oh noo ...";
      this.closingMessage = "You could use a boost!";
      this.shareMood = true; 
    }

    this.user.getUsers().subscribe(users => {
      this.persons = users;  
    })
  }
  
  giveBoost() {
    let modal = this.modalCtrl.create(BoostModal, { shareMoodWith: this.shareMoodWith });
    modal.present(); 
  }

  takePicture() {
      this.camera.getPicture({
        quality : 95,
        destinationType : this.camera.DestinationType.DATA_URL,
        sourceType : this.camera.PictureSourceType.CAMERA,
        allowEdit : false,
        cameraDirection: 1,
        encodingType: this.camera.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(imageData => {
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
        //this.imageData = imageData;
        this.moodPicture = imageData; 

        let modal = this.modalCtrl.create(ImageModal, { moodPicture: this.moodPicture });
        modal.present(); 

      }, error => {
        this.alerts.presentTopToast("Error: " + JSON.stringify(error)); 
      });
  }

  closeModal() {
      //this.viewCtrl.dismiss();
    this.navCtrl.setRoot('dashboard'); 
  }

 
}
