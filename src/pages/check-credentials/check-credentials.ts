import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { UserService } from "../../providers/user-service";
import { Storage } from '@ionic/storage';
import { Alerts } from "../../providers/alerts";


@IonicPage({
  name: 'credentials'
})

@Component({
  selector: 'page-check-credentials',
  templateUrl: 'check-credentials.html',
})
export class CheckCredentialsPage implements OnInit {

  userForm: FormGroup;
  birthday: any; 
 
  constructor(public navCtrl: NavController, public storage: Storage, public user: UserService, 
  public navParams: NavParams, public alert: Alerts, public fb: FormBuilder, public auth: AuthService) {
    
  }

  ngOnInit():any {
    this.userForm = this.fb.group({
        birthday: ['', Validators.required]
    });
   }

   updateProfile() {
     console.log("User object " + JSON.stringify(this.userForm.value)); 
     this.user.editUserProfile(this.userForm.value)
      .then(_ => {
        this.alert.presentBottomToast("Awesome! Your profile is now complete!");
        this.navCtrl.setRoot('dashboard'); 
      }).catch(err => this.alert.presentBottomToast("Could not update your profile. Try again!"));
   }

  skipPage() {
    this.navCtrl.setRoot('dashboard'); 
  }

  signOut() {
    this.auth.logout(); 
  }
}
