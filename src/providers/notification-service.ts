import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  baseUrl: string = "https://onesignal.com/api/v1/notifications";
  
  constructor(public http: Http) { }

  testNotification(notificationData) {
    
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
}