import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;

  constructor() {
    this.progress = "50";
  }


  // progress vanuit 
}
