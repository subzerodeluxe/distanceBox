import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { Dashboard } from "../dashboard/dashboard";
import { Alerts } from "../../providers/alerts";
import { UserService } from "../../providers/user-service";
import { Profile } from "../profile/profile";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  
 loggedIn: boolean = false;

  constructor(public navCtrl: NavController, 
   public auth: AuthService, public alert: Alerts, 
   public loadCtrl: LoadingController, public user: UserService,
   public nav: NavController) {    
  }
 

  loginWithFacebook() {
    const loadMessage = this.loadCtrl.create({
      content: "Signing you in ..." 
    });
    loadMessage.present(); 

    this.auth.loginWithFacebook().subscribe((success) => { 
        
      loadMessage.dismiss(); 
      this.navCtrl.setRoot(Dashboard);  
    }, err => {
      loadMessage.dismiss();
      let message = this.alert.showAlertMessage("Bad connection?", "Could not sign you in! Try again", "OK");
      message.present(); 
    });
  } // loginWithFacebook
}
