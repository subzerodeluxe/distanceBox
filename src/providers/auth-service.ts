import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Platform, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseObjectObservable } from "angularfire2/database";
import { auth } from "firebase/app";

@Injectable()
export class AuthService {
  private authState: any; 
  public onAuth: EventEmitter<any> = new EventEmitter();
  public firebase : any;
  public userData: any; 
  public uid: string;

  user: FirebaseObjectObservable<any>;
   
   constructor(private alertCtrl: AlertController, 
   public afAuth: AngularFireAuth, private platform: Platform, private fb: Facebook) { 
    
    this.firebase = firebase; 

    this.afAuth.authState.subscribe((state) => {
      this.authState = state;
      this.onAuth.emit(state);
    }) 
  }
  
  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {

        return this.fb.login(['email', 'public_profile'])
          .then((res: FacebookLoginResponse) => { 
            const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            this.firebase.auth().signInWithCredential(facebookCredential)
              .then(data => {
                observer.next();
              })
              .catch(error => {
                observer.error(error);
              });
        });
      } else {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(result => {
            observer.next();
          }).catch(error => {
            observer.error(error);
        });
      }
    });
  } // loginWithFacebook


  logout(): firebase.Promise<void> {
    firebase.database().ref('/users')
    .child(firebase.auth().currentUser.uid).off();

    return firebase.auth().signOut();
  }

  get userName():string {
    return this.afAuth.auth?this.afAuth.auth.currentUser.displayName:''; 
  } 

  get userImage():string {
    return this.afAuth.auth?this.afAuth.auth.currentUser.photoURL:'';
  } 

  get userEmail():string {
    return this.afAuth.auth?this.afAuth.auth.currentUser.email:''; 
  }
}