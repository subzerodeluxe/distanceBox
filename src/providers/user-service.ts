import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

  user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public storage: Storage) { 
    let uid = this.getUid();  
    console.log("This is UID " + uid); 
    this.user = this.af.database.object(`/users/${uid}`);
  } 

  
  getUid() {
    return this.storage.get('uid');
  }
  

  editUserProfile(userObject) { 
    this.user.update({
      birthday: userObject.birthday   
      }).then(_ => console.log('set!'));
  }  
}