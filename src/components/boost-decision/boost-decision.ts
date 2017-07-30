import { Component } from '@angular/core';

@Component({
  selector: 'boost-decision',
  templateUrl: 'boost-decision.html'
})
export class BoostDecisionComponent {

  text: string;

  constructor() {
    console.log('Hello BoostDecisionComponent Component');
    this.text = 'Hello World';
  }

}
