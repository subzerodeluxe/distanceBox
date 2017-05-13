import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { UserService } from "../../providers/user-service";


@IonicPage({
  name: 'profile'
})

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit {

   userForm: FormGroup;
   error = false;
   errorMessage = '';

  constructor(public navCtrl: NavController, public user: UserService, 
  public navParams: NavParams, public fb: FormBuilder, public auth: AuthService) {
   
  }

  ngOnInit():any {
       this.userForm = this.fb.group({
           birthday: ['', Validators.required]
       });
   }

   editUser() {
     console.log(this.userForm.value); 
     this.user.editUserProfile(this.userForm.value);
   }

  skipPage() {
    this.navCtrl.setRoot('dashboard'); 
  }

  signOut() {
    this.auth.logout(); 
  }

}
