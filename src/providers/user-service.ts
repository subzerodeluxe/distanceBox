import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Alerts } from "./alerts";
import { FirebaseApp, AngularFire } from "angularfire2";
import { NativeStorage } from "@ionic-native/native-storage";
import { Platform } from "ionic-angular";

@Injectable()
export class UserService {

  public firebase: any;
  public gotUser: any; 
  gender: any;
  birthday: any;  
  name: any; 

  constructor(private alert: Alerts, public af: AngularFire, private nativeStorage: NativeStorage,
  @Inject(FirebaseApp) firebase: any, private platform: Platform) {
    
        this.nativeStorage.getItem('user')
        .then(data => {
          this.name = data.name; 
          this.gender = data.gender;
          this.birthday = data.birthday; 
        })
    
    firebase.auth().onAuthStateChanged(user => {
      if(user) {  
        this.gotUser = user; 
      } else {
        this.alert.showAlertMessage("Oops", "Could not find user", "OK"); 
      }
    })
  } // constructor 

  addtoDatabase(user) {
      let displayName = user.displayName;
      let email = user.email;
      let uid = user.uid; 
  
    let currentUserRef = this.af.database.object(`/users/${uid}`);  
    currentUserRef.set({name: displayName, displayName: displayName, email: email, gender: uid, birthday: uid});
}

  addUserToDatabase() {
    this.addtoDatabase(this.gotUser); 
  }
}