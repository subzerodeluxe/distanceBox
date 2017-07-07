import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Profile } from "../../models/profile.interface";

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})

export class UserInfoComponent {

  profileData = {} as Profile; 

  constructor(public ev: Events) {
    this.ev.subscribe('userProfile', profileData => {
      this.profileData = profileData; 
    });   
  }
}
