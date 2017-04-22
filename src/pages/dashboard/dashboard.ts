import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from "../profile/profile";
import { UserService } from "../../providers/user-service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {


  constructor(public navCtrl: NavController, 
   public user: UserService, 
   public navParams: NavParams) {
    
   } 

  ngOnInit() {
    this.user.addUserToDatabase(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

}

