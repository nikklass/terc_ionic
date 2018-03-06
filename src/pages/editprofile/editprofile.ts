import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  	constructor(private navCtrl: NavController,
                private alertCtrl: AlertController) {
	}

	message : any;

	editprofile($event) {

	    //if no error
	  	if (!$event.error) {
		    	
	    	//set profile page as our root page
	        this.navCtrl.setRoot('ProfilePage');

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
