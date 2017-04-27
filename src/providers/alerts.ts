import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, ToastController } from "ionic-angular";

@Injectable()
export class Alerts {

   constructor(public alertCtrl: AlertController, 
   public toastCtrl: ToastController) {}
    
    
    showAlertMessage(title, message, buttonText) {
      console.log(message);
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: [buttonText]
      });
      return alert; 
    }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
            });
        toast.present();
    }

}
