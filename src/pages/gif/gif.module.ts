import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Gif } from './gif';
import { FormatDate } from "../../pipes/format-date";
import { CountdownComponent } from "../../components/countdown/countdown";
import { FormatTimestamp } from "../../pipes/formate-timestamp";

@NgModule({
  declarations: [
    Gif,
    FormatDate,
    FormatTimestamp,
    CountdownComponent
  ],
  imports: [
    IonicPageModule.forChild(Gif)
  ],
  exports: [
    Gif
  ]
})
export class GifModule {}
