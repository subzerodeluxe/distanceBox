import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { BoostModal } from './boost-modal';

@NgModule({
  declarations: [
    BoostModal,
  ],
  imports: [
    IonicPageModule.forChild(BoostModal),
  ],
  exports: [
    BoostModal
  ]
})
export class BoostModalModule {}
