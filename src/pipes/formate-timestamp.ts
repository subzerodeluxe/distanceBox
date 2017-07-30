import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as moment from 'moment'; 

@Pipe({
  name: 'formatTimestamp'
})

@Injectable()
export class FormatTimestamp implements PipeTransform {
  
  transform(timestamp) {
    
    var dateTime = moment(timestamp).format("DD-MM-YYYY h:mm:ss");
    
    return dateTime;  
  }
}

