import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { GoogleMapsService } from "../../providers/google-maps-service";
import { LocationsService } from "../../providers/locations-service";

@IonicPage({
  name: 'roadMap'
})

@Component({
  selector: 'page-roadmap',
  templateUrl: 'roadmap.html',
})
export class RoadMap {

 
  tab1Root: any = 'map';
  tab2Root: any = 'list';

  constructor() {}

}
