import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { LocationsService } from "../../../providers/locations-service";

@IonicPage({
  name: 'list'
})

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class List {

  locations: any; 

  constructor(public location: LocationsService) {}

  ionViewDidEnter() {
    this.locations = this.location.getLocations(); 
    console.log("Binnengekomen locaties: " +this.locations);
  }

}
