import { Component, EventEmitter, Output  } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { Profile } from '../../models/profiles/profile.interface';

@Component({
  selector: 'app-editprofile',
  templateUrl: 'editprofile.component.html'
})

export class EditprofileComponent {

	  updateProfile = {} as Profile;
	  //updateProfile : any;

	  @Output() editprofileStatus: EventEmitter<any>;

	  private loader : any;
	  private loadereditprofile : any;
	  responseData : any;
	  
	  constructor(private navCtrl: NavController, 
	              private authService: AuthServiceProvider, 
	              private myUserData: MyUserData,
	              private data: DataService,
	              private alertCtrl: AlertController, 
	              private loadingCtrl:LoadingController) 
	  {

	      this.editprofileStatus = new EventEmitter<any>();

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //get user stored in storage
  		  this.data.getMyProfile().then((userProfile: Profile) => {

	      	  this.loader.dismiss();
	      	  
	      	  //let userProfile = user;
	      	  //let userProfile = JSON.parse(user);

	      	  this.updateProfile = { 
		      	  	id: userProfile.id,
		      	  	first_name: userProfile.first_name, 
		      	  	last_name: userProfile.last_name,
		      	  	gender: userProfile.gender,
		      	  	preferred_amount: userProfile.preferred_amount
	      	  };

	      });

	  } 

	  onEditProfile() {
	     
	      //basic error check
	      if (this.updateProfile.state_id === '' || this.updateProfile.first_name === '' 
	      	|| this.updateProfile.last_name === '' || this.updateProfile.phone_country === '') {
		        let alert = this.alertCtrl.create({
			          cssClass:'alert-danger',
			          title:'Error', 
			          subTitle:'All fields marked * are required',
			          buttons:['OK']
		        });
		        alert.present();
		        return;
	      } 

	      //show loader
	      this.loader = this.loadingCtrl.create({
	        content: "Saving..."
	      });
	      this.loader.present();

	      this.authService.PutAuthData(this.updateProfile, "users/" 
	      					+ this.updateProfile.id).then((result: any) => {

	            this.loader.dismissAll();
	            this.updateProfile = result.data;
	            //store user object in storage
	            this.myUserData.setUser(this.updateProfile);
	            //redirect to profile
	            this.editprofileStatus.emit(this.updateProfile);

	      }, (err) => {

		        this.loader.dismissAll();
		        let errormsg =  JSON.parse(err._body);
		        var error = new Array();
	            error['error'] = errormsg;
	            //send result back to calling page
	            this.editprofileStatus.emit(error);

	      });

	  }

	  onProfile() {
	    this.navCtrl.setRoot('ProfilePage');
	  }

	  //if user leaves before loaders finish, quit them
	  onViewWillLeave() {
	    if (this.loader != null) {
	      this.loader.dismissAll();
	    }
	  }

}
