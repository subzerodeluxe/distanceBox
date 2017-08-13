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

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
  constructor(public navCtrl: NavController, public maps: GoogleMapsService, 
    public platform: Platform, public locations: LocationsService) {
 
  }
 
  ionViewDidLoad(){
 
    this.platform.ready().then(() => {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
    });
 
  }

}
