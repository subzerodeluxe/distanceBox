import { Injectable, EventEmitter, Inject} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Platform, AlertController } from 'ionic-angular';

import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp } from 'angularfire2'; //Add FirebaseApp 
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { auth } from 'firebase';
import { UserService } from "./user-service";

 
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;
   
   constructor(private alertCtrl: AlertController, 
   private af: AngularFire, @Inject(FirebaseApp)firebase: any,
   private platform: Platform, private fb: Facebook, private user: UserService,
   private nativeStorage: NativeStorage) { 
    this.firebase = firebase; 
    
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
  }


  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {

        return this.fb.login(['email', 'public_profile', 'user_birthday'])
          .then(res => { 
            let userId = res.authResponse.userID; 
            let params = new Array(); 

            this.fb.api("/me?fields=name,gender,birthday", params)
              .then(user => {
               
                // add to nativestorage 
                this.nativeStorage.setItem('user', {
                    name: user.name,
                    gender: user.gender,
                    birthday: user.birthday
                  })
              })

            const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

            // signin firebase auth
            this.firebase.auth().signInWithCredential(facebookCredential)
              .then(result => {
                observer.next();
              })
              .catch(error => {
                observer.error(error);
              });
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then(result => {
            //console.log("Dit is het result hoor " + JSON.stringify(result)); 
            observer.next();
          }).catch(error => {
            observer.error(error);
        });
      }
    });
  } // loginWithFacebook

  logout() {
    this.af.auth.logout();
  }

}