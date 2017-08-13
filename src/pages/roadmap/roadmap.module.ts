import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadMap } from "./roadmap";

@NgModule({
  declarations: [
    RoadMap 
  ],
  imports: [
    IonicPageModule.forChild(RoadMap)
  ],
  exports: [
    RoadMap
  ]
})
export class RoadMapModule {}
