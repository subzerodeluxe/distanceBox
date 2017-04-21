import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DistanceBox } from './app.component';

@NgModule({
  declarations: [
    DistanceBox
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(DistanceBox)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DistanceBox 
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
