import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

  user: FirebaseObjectObservable<any>;
  uid: string; 

  constructor(public af: AngularFire, public storage: Storage) { 
     this.storage.get('uid').then((data) => {
      if(data != null) {
        this.uid = data; 
        console.log("User ID " + data)
      } else {
        console.log("No data"); 
      }
    }) 
  } 
  
  editUserProfile(userObject) { 
    this.user = this.af.database.object(`/users/${this.uid}/birthday`);
    this.user.set({
      birthday: userObject.birthday   
    }).then(_ => console.log('set birthday in Firebase --> check!'));
  }  
}