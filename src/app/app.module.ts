import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DistanceBox } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from "../providers/auth-service";
import { TimezoneService } from "../providers/timezone-service";
import { WeatherService } from "../providers/weather-service";
import { Facebook } from "@ionic-native/facebook";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Alerts } from "../providers/alerts";
import { UserService } from "../providers/user-service";
import { Login } from "../pages/login/login";
import { Profile } from "../pages/profile/profile";

// setup Firebase credentials 
export const firebaseConfig = {
    apiKey: "AIzaSyB9j6apbWkYb02Qjr8C4SPdZWO_lRC_WWg",
    authDomain: "distancebox.firebaseapp.com",
    databaseURL: "https://distancebox.firebaseio.com",
    storageBucket: "distancebox.appspot.com",
    messagingSenderId: "116109602089"
};

@NgModule({
  declarations: [
    DistanceBox,
    Dashboard,
    Profile 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(DistanceBox),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DistanceBox,
    Dashboard,
    Profile 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, TimezoneService, WeatherService,
    Alerts, Facebook, UserService 
  ]
})
export class AppModule {}
