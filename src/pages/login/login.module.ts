import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { AngularFireModule } from "angularfire2";

@NgModule({
  declarations: [
    Login 
  ],
  imports: [
    IonicPageModule.forChild(Login)
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
