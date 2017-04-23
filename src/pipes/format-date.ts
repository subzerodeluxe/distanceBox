import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'formatDate'
})

@Injectable()
export class FormatDate implements PipeTransform {
  
  transform(date) {
    
     let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
      ];

      let dayNames = [
        "Sun", "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat", 
      ];

      let day = date.getDate();
      let dayIndex = date.getDay(); 
      let monthIndex = date.getMonth();
      let year = date.getFullYear();
    
      return dayNames[dayIndex] + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}