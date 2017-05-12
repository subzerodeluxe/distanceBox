import { Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { Platform, NavController, MenuController, Toggle } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFire, FirebaseAuthState, FirebaseApp } from 'angularfire2'; //Add FirebaseApp 
import { AuthService } from "../providers/auth-service";

@Component({
  templateUrl: 'app.html'
})

export class DistanceBox {
  
  @ViewChild('nav') navCtrl: NavController; 
 
  correctDate: any; 
  correctTime: any; 

  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;

  constructor(platform: Platform,  
  @Inject(FirebaseApp)firebase: any,
  statusBar: StatusBar, splashScreen: SplashScreen,
  public menuCtrl: MenuController, 
  private af: AngularFire, public auth: AuthService) {
    
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) { // when user is authenticated 
        this.navCtrl.setRoot('dashboard');
      } else {
        this.navCtrl.setRoot('onboarding'); 
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  toggleClock(toggle: Toggle) {

  }

  loadPage(page: any) {
    this.navCtrl.setRoot(page); 
    this.menuCtrl.close();
  }

  logOutUser() :void {
     this.auth.logout();
     this.menuCtrl.close();
     this.navCtrl.setRoot('login'); 
  }
}

