import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmileRateModule } from "../../components/smile-rate/smile-rate.module";
import { ReceivedNotification } from "./received-notification";

@NgModule({
  declarations: [
    ReceivedNotification
  ],
  imports: [
    IonicPageModule.forChild(ReceivedNotification),
  ],
  exports: [
    ReceivedNotification
  ]
})
export class ReceivedNotificationModule {}
