import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoodModal } from './mood-modal';
import { SafePipe } from "../../pipes/safe-pipe";

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
