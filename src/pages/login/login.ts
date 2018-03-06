import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController) {
    }

    message : any;

    login($event) {
      
        //console.log($event);

        //if no error
      	if (!$event.error) {
          
  	    	  //set menu page as our root page
  	        this.navCtrl.setRoot('MenuPage');

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
