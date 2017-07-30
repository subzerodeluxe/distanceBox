import { Injectable, Output, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import firebase from 'firebase';

@Injectable()
export class StorageService {

  savedPicture: any;
  percentage: any; 
  
  constructor(public afAuth: AngularFireAuth, public zone: NgZone, public db: AngularFireDatabase) { }


  uploadImageToStorage(imageString) {
    let image: string  = 'img-' + new Date().getTime() + '.png';
    let firebasePutString = firebase.storage().ref('/uploads/images/' + image)   
    .putString(imageString, 'base64', {contentType: 'image/png'}); // store in FB storage

    firebasePutString.on('state_changed', (snapshot) => {
      this.zone.run(() => {
        this.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Percentage: " + this.percentage);
      })
    })
    
    return firebasePutString;
  }

  uploadImageToDatabase(imageObject) {
    return firebase.database().ref('boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/data/images').push(imageObject); 
  }

  getAllImages() {
    return this.db.list('boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/data/images'); 
  }

}
