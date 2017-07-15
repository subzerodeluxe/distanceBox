import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import firebase from 'firebase';

@Injectable()
export class StorageService {


  savedPicture: any; 

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }


  uploadImageToStorage(imageString) {

    let image: string  = 'img-' + new Date().getTime() + '.png';

    return firebase.storage().ref('/uploads/images/' + image)   // store in FB storage
    .putString(imageString, 'base64', {contentType: 'image/png'}); 
    
  }

  uploadImageToDatabase(imageObject) {
    return firebase.database().ref('boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/data/images').push(imageObject); 
  }

  // uploadImage(imageString): Promise<any> {

  //   let image: string  = 'img-' + new Date().getTime() + '.png';

  //   return new Promise((resolve, reject) => { 
  //     firebase.storage().ref('/uploads/images/' + image)
  //     .putString(imageString, 'base64', {contentType: 'image/png'})
  //     .then((savedPicture) => {
  //       firebase.database()
  //       .ref('users/Xu72tCfOH2ZFaCZcVnEPj53cl7J2/images')
  //       .child('image').set(savedPicture.downloadURL);
  //     })
  //   }); 
  // }
}
