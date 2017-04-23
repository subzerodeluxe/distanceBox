import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoodModal } from './mood-modal';

@NgModule({
  declarations: [
    MoodModal,
  ],
  imports: [
    IonicPageModule.forChild(MoodModal),
  ],
  exports: [
    MoodModal
  ]
})
export class MoodModalModule {}
