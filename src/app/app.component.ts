import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../providers/auth-service";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app'
import * as moment from 'moment'; 
import { TimezoneService } from "../providers/timezone-service";
import { Alerts } from "../providers/alerts";
import { UserService } from "../providers/user-service";
import { OneSignal } from "@ionic-native/onesignal";
import { NotificationService } from "../providers/notification-service";
import { ReceivedBoostRequest } from "../models/receivedBoostRequest.interface";
import { BoostRequestModal } from "../modals/boost-request-modal/boost-request-modal";
import { ImageModal } from "../modals/image-modal/image-modal";
import { Image } from "../models/image.interface";

@Component({
  templateUrl: 'app.html'
})

export class DistanceBox {
  
  @ViewChild('nav') navCtrl: NavController;

  // properties 
  public firebase : any;
  receivedCode: any; 
  selectedCity: any; 
  fetchingData: boolean = false; 
  noData: boolean = true; 
  oneSignalUid: string; 
  receivedBoostRequest = {} as ReceivedBoostRequest;
  recievedImageObject = {} as Image; 
  
    // Tilburg
    correctTilburgDate: any; 
    correctTilburgTime: any; 
    fetchedTilburgData: boolean = false; 

    // Yogja 
    correctYogjaDate: any; 
    correctYogjaTime: any; 
    fetchedYogjaData: boolean = false;  

  constructor(platform: Platform, statusBar: StatusBar, public user: UserService, splashScreen: SplashScreen, public alerts: Alerts, 
  public menuCtrl: MenuController, public oneSignal: OneSignal, public modalCtrl: ModalController, public afAuth: AngularFireAuth, public push: NotificationService, 
  public time: TimezoneService, public auth: AuthService) {
    
    this.firebase = firebase; 
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
      if(platform.is('cordova')) {
        this.initializeOneSignal(); 
      } 
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }

  initializeOneSignal() {
    this.oneSignal.startInit("6324c641-04b6-4310-8190-359c8de46f19", "116109602089"); // appID, googleProjectId
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.setSubscription(true);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
     
      let action = data.payload.additionalData['action'];
      
      if(action === "requestBoost") {
        let date = new Date().toString();  
        let timestamp = firebase.database.ServerValue.TIMESTAMP; 
        let requestedBy = data.payload.additionalData['requestedBy'];
        let profileImage = data.payload.additionalData['profileImage'];
        let sendByUid = data.payload.additionalData['sendByUid']; 
        let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:"";
 
        this.receivedBoostRequest = { "sentToUid": userId, "timestamp": timestamp, "sentByName": requestedBy, "sentByUid": sendByUid, "date": date,
        "sentByProfileImage": profileImage, "header": "New boost request", "body": requestedBy + " requested a boost", "accepted": false}; 

        this.push.saveBoostRequestNotification(this.receivedBoostRequest); 
      } else if (action === "newImage") {
        this.recievedImageObject = data.payload.additionalData['imageObject'];
      }
    })

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let action = data.notification.payload.additionalData['action'];
      
      if(action === "requestBoost") {

        let modal = this.modalCtrl.create(BoostRequestModal, { boostRequestObject: this.receivedBoostRequest }); 
        modal.present();
      } else if (action === "newImage") {
 
        let modal = this.modalCtrl.create(ImageModal, { imageObject: this.recievedImageObject }); 
        modal.present();
      }
    })
    this.oneSignal.endInit();   
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
    switch(code) { 
      case 'Tilburg': { 
      
      this.receivedCode = 'Europe/Amsterdam'; 

      this.fetchingData = true; // start spinner to indicate fetching time and date 
      
      // get time snapshot 
      this.getTime(this.receivedCode); 

      // only show Tilburg date, hide Yogja date 
      this.fetchedTilburgData = true; 
      this.fetchedYogjaData = false; 
        break; 
      } 
      case 'Yogja': { 
        this.receivedCode = 'Asia/Jakarta'; 

        this.fetchingData = true; // start spinner to indicate fetching time and date 
      
        // get time snapshot
        this.getTime(this.receivedCode);

        // only show Yogja date, hide Tilburg date 
        this.fetchedYogjaData = true;
        this.fetchedTilburgData = false;
        break; 
      } 
      default: {
        this.alerts.presentTopToast('Please select a city'); 
        break;    
      } 
    }
  }

  getTime(receivedCode) {
    this.time.getTimeByCity(receivedCode).subscribe(
      data => {
        console.log("Date object" + JSON.stringify(data));
        let finalTime = new Date(data.formatted);
        
        console.log("Final time: " + finalTime);
        this.correctTilburgTime = moment(finalTime).format('hh:mm a');
        this.correctTilburgDate = this.formatDate(finalTime); 

        this.correctYogjaTime = moment(finalTime).format('hh:mm a');
        this.correctYogjaDate = this.formatDate(finalTime); 

        this.fetchingData = false; // got data, hide spinner 
        if (this.receivedCode == 'Europe/Amsterdam') {
           this.fetchedTilburgData = true; 
           this.noData = false; 
        } else {
          this.fetchedYogjaData = true; 
          this.noData = false; 
        }
      },
      err => this.alerts.showAlertMessage("Something went wrong", err, "OK")
    ); 
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

