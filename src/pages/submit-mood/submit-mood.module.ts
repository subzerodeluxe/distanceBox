import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitMood } from './submit-mood';
import { SmileRateModule } from "../../components/smile-rate/smile-rate.module";

@NgModule({
  declarations: [
    SubmitMood,
  ],
  imports: [
    SmileRateModule,
    IonicPageModule.forChild(SubmitMood),
  ],
  exports: [
    SubmitMood
  ]
})
export class SubmitMoodModule {}
