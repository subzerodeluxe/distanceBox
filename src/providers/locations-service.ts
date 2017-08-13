import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { Location } from "../models/location.interface";

@Injectable()
export class LocationsService {

  data: any; 

  constructor(public http: Http, public db: AngularFireDatabase) {
   //this.db.list(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/locations`)
  }

  getLocations() {
    if(this.data){
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      
      this.http.get('https://distancebox.firebaseio.com/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/locations.json').map(res => res.json()).subscribe(data => {

          this.data = this.applyHaversine(data.locations);

          this.data.sort((locationA, locationB) => {
              return locationA.distance - locationB.distance;
          });

          resolve(this.data);
      });

  });


    
    //   this.db.list(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/locations`).map((res) => {
    //     console.log("WAT is dit? " + res);
    //     this.data = this.applyHaversine(res.locations);

    //     this.data.sort((locationA, locationB) => {
    //         return locationA.distance - locationB.distance;
    //     });

    //   }); 
         
    //   resolve(this.data); 
     
    // });
  }

  applyHaversine(locations) {
 
    let usersLocation = {
        lat: -7.822276, 
        lng: 110.3692412
    };

    locations.map((location) => {

        let placeLocation = {
            lat: location.latitude,
            lng: location.longitude
        };

        location.distance = this.getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'miles'
        ).toFixed(2);
    });

    return locations;
  }
 
  getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
 
}