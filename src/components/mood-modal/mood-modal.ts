import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController, NavController, ModalController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Alerts } from "../../providers/alerts";
import { StorageService } from "../../providers/storage-service";
import { BoostModal } from "../boost-modal/boost-modal";

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
  currentImage: string = ""; 

  constructor(params: NavParams, public navCtrl: NavController, public viewCtrl: ViewController,public loadingCtrl: LoadingController, public alerts: Alerts,
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

    this.persons = [{"name": "Maarten"},{"name": "Thijs"}]; 
  }
  
  
  giveBoost() {
    let modal = this.modalCtrl.create(BoostModal);
    modal.present(); 
  }

  takePicture() {
    // Create options for the Camera Dialog
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      cameraDirection: 1, 
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
      this.currentImage = base64Image;

    }, (err) => {
      this.alerts.presentBottomToast("Could not take picture. Please try again!");
    });
  }

  closeModal() {
      //this.viewCtrl.dismiss();
    this.navCtrl.setRoot('dashboard'); 
  }

 
}
