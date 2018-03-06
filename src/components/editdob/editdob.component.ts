import { Component, EventEmitter, Output  } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { Profile } from '../../models/profiles/profile.interface';

@Component({
  selector: 'app-editdob',
  templateUrl: 'editdob.component.html'
})

export class EditdobComponent {

	  updateProfile = {} as Profile;

	  @Output() editdobStatus: EventEmitter<any>;

	  private loader : any;

	  responseData : any;
	  
	  constructor(private navCtrl: NavController, 
	              private authService: AuthServiceProvider, 
	              public myUserData: MyUserData,
	              private data: DataService,
	              private alertCtrl: AlertController, 
	              private loadingCtrl:LoadingController) 
	  {

	      this.editdobStatus = new EventEmitter<any>();

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //get user stored in db
  		  this.data.getMyProfile().then((userProfile: Profile) => {

	      	  this.loader.dismiss();

	      	  this.updateProfile = { 
		      	  	id: userProfile.id,
		      	  	dob: userProfile.dob,
		      	  	dob_updated: 1
	      	  };

	      });

	  } 


	  onEditDob() {
	     
	      //basic error check
	      if (!this.updateProfile.dob ) {
		        let alert = this.alertCtrl.create({
			          cssClass:'alert-danger',
			          title:'Error', 
			          subTitle:'Date of birth is required',
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

	      console.log(this.updateProfile);

	      this.authService.PutAuthData(this.updateProfile, "users/dob/" 
	      					+ this.updateProfile.id).then((result: any) => {

	            this.loader.dismiss();
	            this.updateProfile = result.data;
	            //store user object in storage
	            this.myUserData.setUser(this.updateProfile);
	            //redirect to profile
	            this.editdobStatus.emit(this.updateProfile);

	      }, (err) => {

		        this.loader.dismiss();
		        let errormsg =  JSON.parse(err._body);
		        var error = new Array();
	            error['error'] = errormsg;
	            //send result back to calling page
	            this.editdobStatus.emit(error);

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
