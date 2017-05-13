import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from "angularfire2";

@Injectable()
export class UserService {

  user: FirebaseObjectObservable<any>;
  public firebase : any;


  constructor(public af: AngularFire, @Inject(FirebaseApp)firebase: any) { 
    let uid = this.getUid();  
    console.log("This is UID " + uid); 
    //this.user = this.af.database.object(`/users/${uid}`);
  } 

  editUserProfile(userObject) { 
      this.user.update({
        birthday: userObject.birthday   
    }).then(_ => console.log('set!'));
  }

  getUid() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) { // when user is authenticated 
        return user.uid;
      } else {
        console.log("Crash!");
      }
    })  
  }
  
}