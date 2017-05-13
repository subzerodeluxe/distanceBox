import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';
import { FormatDate } from "../../pipes/format-date";
import { CountdownComponent } from "../../components/countdown/countdown";

@NgModule({
  declarations: [
    Dashboard,
    FormatDate,
    CountdownComponent
  ],
  imports: [
    IonicPageModule.forChild(Dashboard)
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule {}
