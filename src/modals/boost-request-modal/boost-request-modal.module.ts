import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { BoostRequestModal } from "./boost-request-modal";
import { BoostDecisionComponent } from "../../components/boost-decision/boost-decision";

@NgModule({
  declarations: [
    BoostRequestModal,
    BoostDecisionComponent
  ],
  imports: [
    IonicPageModule.forChild(BoostRequestModal)
  ],
  exports: [
    BoostRequestModal
  ]
})
export class BoostModalModule {}
