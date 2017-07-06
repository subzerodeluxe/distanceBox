import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from "angularfire2";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

  user: FirebaseObjectObservable<any>;
  uid: string; 
  private authState: FirebaseAuthState;

  constructor(public af: AngularFire, public storage: Storage) { 
  } 
  
  editUserProfile(userObject) { 
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log(this.authState.uid); 
    });

    let id = this.authState?this.authState.uid:''; 

    this.user = this.af.database.object(`/users/${id}`);
    this.user.update({
      birthday: userObject.birthday   
    }).then(_ => {
      console.log('set birthday in Firebase --> check!');
    }).catch(error => {
      console.log('set birthday in Firebase --> error!'); 
    })
  }  
}