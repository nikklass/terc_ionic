import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { Profile } from '../../models/profiles/profile.interface';

@Component({
  selector: 'app-editavatar',
  templateUrl: 'editavatar.component.html'
})
export class EditavatarComponent {

	  updateProfile = {} as Profile;

	  private loader : any;

	  responseData : any;
	  
	  constructor(private navCtrl: NavController, 
	              private authService: AuthServiceProvider, 
	              public myUserData: MyUserData,
	              private data: DataService,
	              private alertCtrl: AlertController, 
	              private loadingCtrl:LoadingController) 
	  {

	      //get user stored in storage
  		  this.data.getMyProfile().then((userProfile: Profile) => {

	      	  this.loader.dismiss();

	      	  //let userProfile = user;
	      	  //let userProfile = JSON.parse(user);

	      	  this.updateProfile = { 
		      	  	id: userProfile.id,
		      	  	dob: userProfile.dob,
		      	  	dob_updated: 1
	      	  };

	      });

	  } 

	  onUpload() {	      
	     //
	  }

	  onFilePicked(event) {	      
	     //console.log(event);
	  }

	  onProfile() {
	    this.navCtrl.setRoot('ProfilePage');
	  }

}
