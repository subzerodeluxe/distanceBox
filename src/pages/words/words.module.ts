import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordsPage } from './words';

@NgModule({
  declarations: [
    WordsPage,
  ],
  imports: [
    IonicPageModule.forChild(WordsPage),
  ],
  exports: [
    WordsPage
  ]
})
export class WordsPageModule {}
