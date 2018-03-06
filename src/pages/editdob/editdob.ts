import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-dob',
  templateUrl: 'editdob.html',
})
export class EditdobPage {

  	constructor(private navCtrl: NavController,
                private alertCtrl: AlertController) {
	}

	message : any;

	editdob($event) {

		console.log($event);
		
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
