import { Component } from '@angular/core';

@Component({
  selector: 'boost-modal',
  templateUrl: 'boost-modal.html'
})
export class BoostModal {

  fetchingData: boolean = false; 

  constructor() {
    console.log('Hello BoostModalComponent Component');
  }

}
