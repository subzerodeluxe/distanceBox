import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageModal } from './image-modal';

@NgModule({
  declarations: [
    ImageModal,
  ],
  imports: [
    IonicPageModule.forChild(ImageModal),
  ],
  exports: [
    ImageModal
  ]
})
export class ImageModalModule {}
