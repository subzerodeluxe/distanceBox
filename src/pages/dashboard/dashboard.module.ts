import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';
import { Profile } from "../profile/profile";
import { Login } from "../login/login";


@NgModule({
  declarations: [
    Dashboard
    
  ],
  imports: [
    IonicPageModule.forChild(Dashboard),
    
  ],
  exports: [
    Dashboard
    
  ]
})
export class DashboardModule {}
