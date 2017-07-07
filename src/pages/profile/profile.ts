import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { UserService } from "../../providers/user-service";
import { Alerts } from "../../providers/alerts";
import { Profile } from "../../models/profile.interface";


@IonicPage({
  name: 'profile'
})

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

   userForm: FormGroup;
   birthday: any; 
   profileData = {} as Profile;  
   fetchingData: boolean = false; 
   noData: boolean = true; 
 
  constructor(public navCtrl: NavController, public user: UserService, 
  public navParams: NavParams, public alert: Alerts, public fb: FormBuilder, public auth: AuthService) {
    
  }

  ngOnInit():any {
    this.userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        birthday: ['', Validators.required]
    });
   }

  ionViewDidLoad() {
    this.fetchingData = true; // start spinner to indicate fetching form data 
    this.user.getUserProfile().subscribe( userProfileObservable => {
      this.profileData = userProfileObservable;
       this.fetchingData = false; 
       this.noData = false; 
    });
  }

  updateProfile() {
    console.log("User object " + JSON.stringify(this.userForm.value)); 
    this.user.updateUserProfile(this.userForm.value);

    this.alert.presentBottomToast("Your profile was succesfully updated!");
  }

  skipPage() {
    this.navCtrl.setRoot('dashboard'); 
  }

  signOut() {
    this.auth.logout(); 
  }

}
