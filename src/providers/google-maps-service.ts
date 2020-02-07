import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { ConnectivityService } from "./connectivity-service";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
 
@Injectable()
export class GoogleMapsService {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  sasiMarker: any; 
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey = ""; 
 
  constructor(public connectivityService: ConnectivityService, public geolocation: Geolocation) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
        let yogja = new google.maps.LatLng(-7.795580, 110.369490);
 
        let mapOptions = {
          center: yogja,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        let sasi = new google.maps.LatLng(-7.822276, 110.3692412);
        let image = {
          url: "https://firebasestorage.googleapis.com/v0/b/distancebox.appspot.com/o/SasiMarker%2FsasiMarker.png?alt=media&token=f8efdb1f-2318-4e1e-b21f-ba49d720d085",
          scaledSize : new google.maps.Size(30, 30)
        }

        this.sasiMarker = new google.maps.Marker({
          position: sasi,
          animation: google.maps.Animation.DROP,
          title: "Sasi's place",
          icon: image
        })

        this.sasiMarker.setMap(this.map);
        resolve(true);
    });
 
  }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
 
  addMarker(lat: number, lng: number): void {
 
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
 
    this.markers.push(marker);  
 
  }
 
}
