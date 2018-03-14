import { Component } from '@angular/core';
import { IonicPage, AlertController, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})

export class ForgotpassPage {

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController) {
  }

  message : any;

  forgotpass($event) {
    
      //console.log($event);

      //if no error
      if (!$event.error) {
        
          //set menu page as our root page
          this.navCtrl.setRoot('LoginPage');

      } else {
        
        this.message = $event.error.message;

        let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle: this.message,
              buttons: ['OK']
            });
            alert.present();
      }

  }

}
