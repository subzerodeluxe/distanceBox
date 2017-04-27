import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class StorageService {

  storageRef: any;
  images: FirebaseListObservable<any>;

  constructor() { }

    uploadImage(img) {
    var d = new Date(),
      n = d.getTime(),
      fileName = n + ".jpg";

    return this.storageRef.child(fileName).putString(img, 'base64').then(snapshot => {
         let downloadURL = snapshot.downloadURL;
         this.images.push({link: downloadURL});
         return true;
      });
  }

}
