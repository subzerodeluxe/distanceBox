import { Injectable, EventEmitter, Inject} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp, FirebaseObjectObservable } from 'angularfire2'; //Add FirebaseApp 
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { auth } from 'firebase';
import { UserService } from "./user-service";

 
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;
  public userData: any; 
  public uid: string;

  user: FirebaseObjectObservable<any>;
   
   constructor(private alertCtrl: AlertController, 
   private af: AngularFire, @Inject(FirebaseApp)firebase: any, public storage: Storage,
   private platform: Platform, private fb: Facebook
) { 
    this.firebase = firebase; 
    
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
  }
  
  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {

        return this.fb.login(['email', 'public_profile'])
          .then((res: FacebookLoginResponse) => { 
            const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            this.firebase.auth().signInWithCredential(facebookCredential)
              .then(data => {
                this.storage.set('uid', data.uid);
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
            this.storage.set('uid', result.uid);
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

  get currentUser():string {
    return this.authState?this.authState.auth.uid:''; 
  }
  get userName():string {
    return this.authState?this.authState.auth.displayName:'';
  } 

  get userImage():string {
    return this.authState?this.authState.auth.photoURL:'';
  } 

  get userEmail():string {
    return this.authState?this.authState.auth.email:'';
  }
}