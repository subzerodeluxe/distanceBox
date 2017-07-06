import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckCredentialsPage } from './check-credentials';

@NgModule({
  declarations: [
    CheckCredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckCredentialsPage),
  ],
  exports: [
    CheckCredentialsPage
  ]
})
export class CheckCredentialsPageModule {}
