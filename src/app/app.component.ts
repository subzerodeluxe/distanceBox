import { Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { Platform, NavController, MenuController, Toggle } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseApp, AngularFire, FirebaseAuthState } from 'angularfire2'; 
import { AuthService } from "../providers/auth-service";

@Component({
  templateUrl: 'app.html'
})
export class DistanceBox {
  
  isAuthenticated: boolean = false; 
  @ViewChild('nav') navCtrl: NavController; 
  public firebase : any;
  dashboard: string = 'dashboard'; 
  login: string = 'login'; 
  profile: string = 'profile';

  correctDate: any; 
  correctTime: any; 
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  
  constructor(platform: Platform,  @Inject(FirebaseApp)firebase: any,
  statusBar: StatusBar, splashScreen: SplashScreen, 
  public menuCtrl: MenuController, private af: AngularFire, public auth: AuthService) {
    this.firebase = this.firebase; 

    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user); 
        this.isAuthenticated = true;
        this.navCtrl.setRoot(this.dashboard); 
      } else {
        console.log(user); 
        this.isAuthenticated = false; 
        this.navCtrl.setRoot(this.login);  
      }
    })

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
     this.navCtrl.setRoot(this.login); 
  }
}

