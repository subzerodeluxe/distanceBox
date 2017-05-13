import { Component } from '@angular/core';
import { ICountdown } from "../../models/i-countdown";


@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})

export class CountdownComponent {

    countdown: ICountdown; 
    daysLeft: string; 

    constructor() {}

    ngOnInit() {
        this.initCountDown(); 
    }

    initCountDown() {
      this.daysLeft = this.calculateDaysLeft("2017", "8", "28"); 

        this.countdown = <ICountdown> {  
          daysLeft: this.daysLeft, 
          departureDate: "August 28th 2017", 
          year: "2017", 
          month: "8",
          day: "28",
          finishedText: "Maarten will depart today!"
        };

        this.countdown.daysLeft = this.calculateDaysLeft(this.countdown.year, this.countdown.month, this.countdown.day); 
    } 

    calculateDaysLeft(yr, m, d) {
   
      var today = new Date()
      var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
      var todayy=today.getFullYear()
      if (todayy < 1000)
        todayy+=1900
      var todaym=today.getMonth()
      var todayd=today.getDate()
      var todaystring=months[todaym]+" "+todayd+", "+todayy
      var futurestring=months[m-1]+" "+d+", "+yr
      var difference=(Math.round((Date.parse(futurestring)-Date.parse(todaystring))/(24*60*60*1000))*1)
      
      if (difference == 0) {
        return this.countdown.finishedText;  
      }
      else if (difference > 0 )
        return difference + " " + " days left"; 
      }
      
}