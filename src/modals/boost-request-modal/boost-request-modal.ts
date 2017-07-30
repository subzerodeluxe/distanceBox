import { Component } from '@angular/core';
import { NavParams, ViewController, ActionSheetController, Platform } from "ionic-angular";
import { ReceivedBoostRequest } from "../../models/receivedBoostRequest.interface";


@Component({
  selector: 'boost-request-modal',
  templateUrl: 'boost-request-modal.html'
})
export class BoostRequestModal {

  profileImage: string;
  boostRequestObject = {} as ReceivedBoostRequest;


  constructor(public nav: NavParams, public viewCtrl: ViewController, public platform: Platform, public actionSheetCtrl: ActionSheetController) {
    this.boostRequestObject = this.nav.get('boostRequestObject');
    this.profileImage = this.boostRequestObject.sendByProfileImage; 
    console.log("Boostrequest Object: " + JSON.stringify(this.profileImage)); 
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What would you like to send?',
      cssClass: 'action-sheets-boost',
      buttons: [
        {
          text: 'Drawing',
          icon: !this.platform.is('ios') ? 'happy-outline' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
         {
          text: 'Audio message',
          icon: !this.platform.is('ios') ? 'musical-notes-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Hugs & Kisses',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Picture of myself',
          icon: !this.platform.is('ios') ? 'camera-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
           {
          text: 'Video message',
          icon: !this.platform.is('ios') ? 'videocam-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}