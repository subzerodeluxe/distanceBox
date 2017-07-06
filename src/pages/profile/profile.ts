import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { UserService } from "../../providers/user-service";
import { Storage } from '@ionic/storage';
import { Alerts } from "../../providers/alerts";


@IonicPage({
  name: 'profile'
})

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit {

   userForm: FormGroup;
 
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
     this.user.editUserProfile(this.userForm.value);
    
     this.alert.presentBottomToast("Awesome! Your profile is now complete!");
     this.navCtrl.setRoot('dashboard'); 
   }

  skipPage() {
    this.navCtrl.setRoot('dashboard'); 
  }

  signOut() {
    this.auth.logout(); 
  }

}
