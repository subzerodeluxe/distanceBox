import { Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/auth-service";
import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app'
import * as moment from 'moment'; import { TimezoneService } from "../providers/timezone-service";
;

@Component({
  templateUrl: 'app.html'
})

export class DistanceBox {
  
  @ViewChild('nav') navCtrl: NavController; 
 
  private authState: any; 
  public onAuth: EventEmitter<any> = new EventEmitter();
  public firebase : any;

  correctDate: any; 
  correctTime: any;
  gotTime: boolean = false; 
  globalTime: any; 
  finalTimeStamp: any; 
  receivedCode: any; 
  checkTime: any; 
  selectedCity: any; 
  placeholder: any; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, 
  public afAuth: AngularFireAuth, public time: TimezoneService, public auth: AuthService) {
    
    this.firebase = firebase; 

    this.afAuth.authState.subscribe((state) => {
      this.authState = state;
      this.onAuth.emit(state);
    }) 

    firebase.auth().onAuthStateChanged(user => {
      if(user) { // when user is authenticated 
        this.navCtrl.setRoot('credentials');
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

  loadPage(page: any) {
    this.navCtrl.setRoot(page); 
    this.menuCtrl.close();
  }

  logOutUser() :void {
     this.auth.logout();
     this.menuCtrl.close();
     this.navCtrl.setRoot('login'); 
  }

  cityChange(code) {
    this.receivedCode = code; 
    console.log(this.receivedCode); 

    if(this.receivedCode == 'Europe/Amsterdam') {
      clearTimeout(this.checkTime);
      this.gotTime = false;
      this.startTime(this.receivedCode); 
      
    } else {
      clearTimeout(this.checkTime); 
      this.gotTime = false; 
      this.startTime(this.receivedCode); 
    }
  }

  
  getTime(code) {
    this.time.getTimeByCity(code).subscribe(
      data => {
          console.log('Get Time response ' + JSON.stringify(data));
          var foreignTime = new Date(data.timestamp*1000);
          var foreignHours = foreignTime.getUTCHours();
          this.finalTimeStamp = foreignTime.setHours(foreignHours);
          var finalTime = new Date(this.finalTimeStamp);
          
          console.log("finalTime: " + finalTime); 

          // set correctDate 
          this.correctDate = this.formatDate(finalTime); 
      
          // SET GLOBALTIME 
          this.globalTime = finalTime; 
        },
        err => {
          console.log(err);
        },
        () => console.log('Completed!')
    );
  } // getTime() 


  startTime(cityCode) {
  
    if (this.gotTime == false) {
      this.getTime(cityCode); 
      this.gotTime = true; 
    } 
  
    this.checkTime = setTimeout(() => {

      var hours = this.globalTime.getHours();
      var localMinutes = new Date().getMinutes(); 
      this.globalTime.setMinutes(localMinutes);
      var minutes = this.globalTime.getMinutes();
      var localSeconds = new Date().getSeconds();
      this.globalTime.setSeconds(localSeconds);
      var seconds = this.globalTime.getSeconds();
      
      this.correctTime = moment(this.globalTime).format('hh:mm:ss a');
      var consoleTime = moment(this.globalTime).format('hh:mm:ss a'); 
      console.log(consoleTime);

      this.startTime(cityCode);
    }, 1000) 
  }


  formatDate(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];

    var dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday", 
    ];

    var day = date.getDate();
    var dayIndex = date.getDay(); 
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return dayNames[dayIndex] + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
  } // formatDate() 

}

