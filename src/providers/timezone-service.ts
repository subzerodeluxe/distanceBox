import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TimezoneService {

  constructor() {
    console.log('Hello TimezoneService Provider');
  }

}
