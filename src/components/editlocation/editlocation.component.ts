import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { Profile } from '../../models/profiles/profile.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-editlocation',
  templateUrl: 'editlocation.component.html'
})

export class EditlocationComponent implements OnDestroy {

	  updateProfile = {} as Profile;
  	  //updateProfile : any[];

	  @Output() editlocationStatus: EventEmitter<any>;

   private countriesSubscription: Subscription;
   private citiesSubscription: Subscription;
   private citySubscription: Subscription;
   private statesSubscription: Subscription;
   private stateSubscription: Subscription;
   private constituenciesSubscription: Subscription;
   private constituencySubscription: Subscription;
   private wardsSubscription: Subscription;
   private wardSubscription: Subscription;

	  private countries = new Array();
	  private states = new Array();
	  private cities = new Array();
	  private constituencies = new Array();
	  private wards = new Array();

	  private loader : any;
	  private loaderstates : any;
	  private loadercities : any;
	  private loaderconstituencies : any;
	  private loaderwards : any;

	  private loadereditprofile : any;

	  responseData : any;

	  constructor(private navCtrl: NavController,
	              private authService: AuthServiceProvider,
	              public myUserData: MyUserData,
	              private data: DataService,
	              private alertCtrl: AlertController,
	              private loadingCtrl:LoadingController)
	  {

	      this.editlocationStatus = new EventEmitter<any>();

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //get user stored in storage
  		  //this.myUserData.getUser().then((user: Profile) => {
  		  this.data.getMyProfile().then((userProfile: Profile) => {

	      	  //let userProfile = user;
	      	  //let userProfile = user;

	      	  //console.log(userProfile);

	      	  this.updateProfile = {
		      	  	id: userProfile.id,
		      	  	phone_country: userProfile.phone_country,
		      	  	state_id: userProfile.state_id,
		      	  	city_id: userProfile.city_id,
		      	  	constituency_id: userProfile.constituency_id,
		      	  	ward_id: userProfile.ward_id
	      	  };

		      this.countriesSubscription = authService.getCountries().subscribe(countries => {

		        this.countries = countries.data;

		        if (this.updateProfile.phone_country) {
			        //load states
			        this.loadStates(this.updateProfile.phone_country);
			    } else {
			    	this.loader.dismissAll();
			    }

		      }, (err) => {

		          this.loader.dismissAll();

		          let alert = this.alertCtrl.create({
		            cssClass:'alert-danger',
		            title:'Error',
		            subTitle:"Could not load country data. Please reload.",
		            buttons: ['OK']
		          });

		          alert.present();

		      });

	      });

	  }

	  onEditLocation() {

	      //console.log(this.updateProfile);

	      //basic error check
	      if (this.updateProfile.phone_country==='' || this.updateProfile.state_id==='' ) {
		        let alert = this.alertCtrl.create({
			          cssClass:'alert-danger',
			          title:'Error',
			          subTitle:'Country and State fields are required',
			          buttons:['OK']
		        });
		        alert.present();
		        return;
	      }

	      //show loader
	      this.loadereditprofile = this.loadingCtrl.create({
	        content: "Saving..."
	      });
	      this.loadereditprofile.present();

	      this.authService.PutAuthData(this.updateProfile, "users/location/"
	      					+ this.updateProfile.id).then((result: any) => {

	            this.loadereditprofile.dismissAll();
	            this.updateProfile = result.data;
	            //store user object in storage
	            this.myUserData.setUser(this.updateProfile);
	            //redirect to profile
	            this.editlocationStatus.emit(this.updateProfile);

	      }, (err) => {

		        this.loadereditprofile.dismissAll();
		        let errormsg =  JSON.parse(err._body);
		        var error = new Array();
	            error['error'] = errormsg;
	            //send result back to calling page
	            this.editlocationStatus.emit(error);

	      });

	  }

	  loadStates(country_code) {

	      this.states = [];

	      //load country states
      this.statesSubscription = this.authService.getStates(country_code).subscribe(states => {

		      this.states = states.data;

		      if (this.updateProfile.state_id) {
			      //load cities
			      this.loadCities(this.updateProfile.state_id);
			      //load constituencies
			      this.loadConstituencies(this.updateProfile.state_id);
			  } else {
			  	  this.loader.dismissAll();
			  }

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load states data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });

	  }

	  loadStatesSingle(country_code) {

	      this.states = [];
	      this.cities = [];
	      this.constituencies = [];
	      this.wards = [];

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //load country states
      this.stateSubscription = this.authService.getStates(country_code).subscribe(states => {

		      this.loader.dismissAll();

		      this.states = states.data;

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load states data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });

	  }

	  loadCities(state_id) {

	      this.cities = [];
	      this.constituencies = [];
	      this.wards = [];

	      //load cities
      this.citiesSubscription = this.authService.getCities(state_id).subscribe(cities => {

	        this.cities = cities.data;

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load cities data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  loadCitiesSingle(state_id) {

	  	  this.cities = [];
	      this.constituencies = [];
	      this.wards = [];

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //load cities
      this.citySubscription = this.authService.getCities(state_id).subscribe(cities => {

	        this.loader.dismissAll();

	        this.cities = cities.data;

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load cities data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  loadConstituencies(state_id) {

	      this.constituencies = [];
	      this.wards = [];

	      //load constituencies
      this.constituenciesSubscription = this.authService.getConstituencies(state_id).subscribe(constituencies => {

	        this.constituencies = constituencies.data;

			//if constituency exists, load wards
	        if (this.updateProfile.constituency_id) {
		        //load states
		        this.loadWards(this.updateProfile.constituency_id);
		    } else {
		    	this.loader.dismissAll();
		    }

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load constituencies data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  //load constituencies
	  loadConstituenciesSingle(state_id) {

	      this.constituencies = [];
	      this.wards = [];

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //load constituencies
      this.constituencySubscription = this.authService.getConstituencies(state_id).subscribe(constituencies => {

	        this.loader.dismissAll();

	        this.constituencies = constituencies.data;

			//if constituency exists, load wards
	        if (this.updateProfile.constituency_id) {
		        //load states
		        this.loadWards(this.updateProfile.constituency_id);
		    } else {
		    	this.loader.dismissAll();
		    }

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load constituencies data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  loadWards(constituency_id) {

	      this.wards = [];

	      //load constituencies
      this.wardsSubscription = this.authService.getWards(constituency_id).subscribe(wards => {

	        this.wards = wards.data;

		    this.loader.dismissAll();

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load wards data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  //load wards
	  loadWardsSingle(constituency_id) {

	      this.wards = [];

	      //load countries on page load
	      this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	      });
	      this.loader.present();

	      //load ward
      this.wardSubscription = this.authService.getWards(constituency_id).subscribe(wards => {

	        this.wards = wards.data;

		    this.loader.dismissAll();

	      }, (err) => {

	          this.loader.dismissAll();

	          let alert = this.alertCtrl.create({
	            cssClass:'alert-danger',
	            title:'Error',
	            subTitle:"Could not load wards data. Please reload.",
	            buttons: ['OK']
	          });
	          alert.present();

	      });
	  }

	  onProfile() {
	    this.navCtrl.setRoot('ProfilePage');
	  }

	  ngOnDestroy() {
      this.countriesSubscription.unsubscribe();
      this.citiesSubscription.unsubscribe();
      this.citySubscription.unsubscribe();
      this.statesSubscription.unsubscribe();
      this.stateSubscription.unsubscribe();
      this.constituenciesSubscription.unsubscribe();
      this.constituencySubscription.unsubscribe();
      this.wardsSubscription.unsubscribe();
      this.wardSubscription.unsubscribe();

      if (this.loader != null) {
        this.loader.dismissAll();
      }
      if (this.loadereditprofile != null) {
        this.loadereditprofile.dismissAll();
      }
      if (this.loaderstates != null) {
        this.loaderstates.dismissAll();
      }

    }

}
