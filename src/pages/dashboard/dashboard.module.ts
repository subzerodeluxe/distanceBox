import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';
import { FormatDate } from "../../pipes/format-date";

@NgModule({
  declarations: [
    Dashboard,
    FormatDate
  ],
  imports: [
    IonicPageModule.forChild(Dashboard)
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule {}
