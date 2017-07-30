import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePipe } from "../../pipes/safe-pipe";
import { MoodModal } from "./mood-modal";

@NgModule({
  declarations: [
    MoodModal,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(MoodModal),
  ],
  exports: [
    MoodModal,
    SafePipe
  ]
})
export class MoodModalModule {}
