import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountdownComponent } from './countdown';

@NgModule({
  declarations: [
    CountdownComponent,
  ],
  imports: [
    IonicPageModule.forChild(CountdownComponent),
  ],
  exports: [
    CountdownComponent
  ]
})
export class CountdownComponentModule {}
