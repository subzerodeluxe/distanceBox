import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';
import { FormatDate } from "../../pipes/format-date";
import { CountdownComponent } from "../../components/countdown/countdown";
import { FormatTimestamp } from "../../pipes/formate-timestamp";

@NgModule({
  declarations: [
    Dashboard,
    FormatDate,
    FormatTimestamp,
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
