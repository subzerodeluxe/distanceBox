import { Component } from '@angular/core';

/**
 * Generated class for the NotificationListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListComponent {

  text: string;

  constructor() {
    console.log('Hello NotificationListComponent Component');
    this.text = 'Hello World';
  }

}
