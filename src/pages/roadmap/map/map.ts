import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { LocationsService } from "../../../providers/locations-service";
import { GoogleMapsService } from "../../../providers/google-maps-service";

@IonicPage({
  name: 'map'
})

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {

 
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
