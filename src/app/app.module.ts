import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DistanceBox } from './app.component';
import { SafePipe } from "../pipes/safe-pipe";
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services 
import { BoostService } from '../providers/boost-service';
import { AuthService } from "../providers/auth-service";
import { TimezoneService } from "../providers/timezone-service";
import { WeatherService } from "../providers/weather-service";
import { Alerts } from "../providers/alerts";
import { UserService } from "../providers/user-service";
import { StorageService } from "../providers/storage-service";
import { NotificationService } from '../providers/notification-service';
import { ConnectivityService } from "../providers/connectivity-service";
import { GoogleMapsService } from "../providers/google-maps-service";
import { LocationsService } from "../providers/locations-service";

// Native
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from "@ionic-native/facebook";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

// Modals
import { ImageModal } from '../modals/image-modal/image-modal';
import { BoostRequestModal } from '../modals/boost-request-modal/boost-request-modal';
import { BoostModal } from '../modals/boost-modal/boost-modal';
import { MoodModal } from "../modals/mood-modal/mood-modal";

// AF2 Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Components
import { NotificationListComponent } from '../components/notification-list/notification-list';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { BoostDecisionComponent } from '../components/boost-decision/boost-decision';
import { UserInfoComponent } from '../components/user-info/user-info';
import { AnimateItemSlidingDirective } from "../directives/animate-item-sliding";

// setup Firebase credentials
export const firebaseConfig = {
    apiKey: "AIzaSyB9j6apbWkYb02Qjr8C4SPdZWO_lRC_WWg",
    authDomain: "distancebox.firebaseapp.com",
    databaseURL: "https://distancebox.firebaseio.com",
    storageBucket: "distancebox.appspot.com",
    messagingSenderId: "116109602089"
};

class CameraMock extends Camera {
  getPicture(options){ 
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIG
      J1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGl
      jaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2Yg
      ZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb
      24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IG
      Nhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}

@NgModule({
  declarations: [
    DistanceBox, // name of app 
    MoodModal,
    SafePipe,
    UserInfoComponent,
    BoostModal,
    ImageModal,
    NotificationListComponent,
    ProgressBarComponent,
    BoostRequestModal,
    BoostDecisionComponent,
    AnimateItemSlidingDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(DistanceBox),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DistanceBox,
    MoodModal,
    BoostModal,
    BoostRequestModal,
    ImageModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, 
    //Camera, 
    OneSignal,
    Network,
    {provide: Camera, useClass: CameraMock},
    AuthService, TimezoneService, WeatherService,
    Alerts, Facebook, UserService, StorageService,
    BoostService,
    NotificationService,
    ConnectivityService,
    GoogleMapsService,
    LocationsService
  ]
})
export class AppModule {}