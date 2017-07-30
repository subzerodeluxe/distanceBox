import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { ReceivedBoostRequest } from "../models/receivedBoostRequest.interface";

@Injectable()
export class NotificationService {

  baseUrl: string = "https://onesignal.com/api/v1/notifications";
  receivedBoostRequestsRef: FirebaseListObservable<ReceivedBoostRequest[]>;
  boostRequest: any; 
  
  constructor(public http: Http, public db: AngularFireDatabase, public afAuth: AngularFireAuth) { 
    let userId = this.afAuth.auth.currentUser?this.afAuth.auth.currentUser.uid:"";
    this.receivedBoostRequestsRef = this.db.list(`/boxes/DA72tCfOH2ZFaCZcVnEPj53cl7JA/receivedBoostRequests`);
  }

  sendNotification(notificationData) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl, JSON.stringify(notificationData), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
  }

  saveBoostRequestNotification(notificationObject) {
    this.receivedBoostRequestsRef.push(notificationObject); 
  }

  getAllBoostRequestNotifications() {
    return this.receivedBoostRequestsRef.map((data) => { 
      return data.reverse(); 
    });  // use reverse because give back newest notifications first 

  }

  removeBoostRequest(request) {
    this.receivedBoostRequestsRef.remove(request.$key); 
  }

}