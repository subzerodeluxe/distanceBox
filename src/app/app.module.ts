import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { DistanceBox } from './app.component';
import { AuthService } from "../providers/auth-service";
import { TimezoneService } from "../providers/timezone-service";
import { WeatherService } from "../providers/weather-service";
import { Facebook } from "@ionic-native/facebook";
import { Alerts } from "../providers/alerts";
import { UserService } from "../providers/user-service";
import { MoodModal } from "../components/mood-modal/mood-modal";
import { StorageService } from "../providers/storage-service";
import { SafePipe } from "../pipes/safe-pipe";
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BoostModal } from '../components/boost-modal/boost-modal';
import { BoostService } from '../providers/boost-service';
import { UserInfoComponent } from '../components/user-info/user-info';


// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    DistanceBox, // name of app 
    MoodModal,
    SafePipe,
    UserInfoComponent,
    BoostModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(DistanceBox),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DistanceBox,
    MoodModal,
    BoostModal
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, TimezoneService, WeatherService,
    Alerts, Facebook, UserService, StorageService,
    BoostService 
  ]
})
export class AppModule {}
