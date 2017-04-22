import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from "ionic-angular";

@Injectable()
export class Alerts {

   constructor(public alertCtrl: AlertController) {}
    
    
    showAlertMessage(title, message, buttonText) {
      console.log(message);
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: [buttonText]
      });
      return alert; 
    }


}
