import {Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements  OnInit, OnDestroy {

	  private subscription: Subscription;
    private countries = new Array();
	  private usererror;
	  private loader : any;
	  private loadersignup : any;
	  responseData : any;

	  userData = {
	               "first_name":"", "last_name":"", "email":"",
                 "phone":"", "password":"",
                 "password_confirmation":"", "phone_country":"KE"
	             };

	  constructor(private navCtrl: NavController,
	              private authService: AuthServiceProvider,
	              private alertCtrl: AlertController,
	              private loadingCtrl:LoadingController)
	  {}

	  ngOnInit() {

	    //load countries on page load
      this.loader = this.loadingCtrl.create({
        content: "Loading ..."
      });
      this.loader.present();

      this.subscription = this.authService.getCountries().subscribe(countries => {

        this.loader.dismissAll();
        this.countries = countries.data;

      }, (err) => {

        this.loader.dismissAll();

        let alert = this.alertCtrl.create({
          cssClass:'alert-danger',
          title:'Error',
          subTitle:"Could not load country data. Please reload.",
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.setRoot('LoginPage');
              }
            }
          ]
        });
        alert.present();
      });

    }

	  signup() {

	      //basic error check
	      if(this.userData.email === '' || this.userData.password === ''
	        || this.userData.first_name === ''|| this.userData.last_name === ''
	        || this.userData.phone === '' || this.userData.phone_country === ''
	        || this.userData.password_confirmation === '') {
	        let alert = this.alertCtrl.create({
	          cssClass:'alert-danger',
	          title:'Signup Error',
	          subTitle:'All fields marked * are required',
	          buttons:['OK']
	        });
	        alert.present();
	        return;
	      }

	      //insert new record
	      this.loadersignup = this.loadingCtrl.create({
	        content: "Signing up..."
	      });
	      this.loadersignup.present();

	      this.authService.postData(this.userData, "users").then((result) => {

					//console.log(result);
					this.loadersignup.dismissAll();

	        //signup successful, pass params to AccountconfirmPage
	        this.navCtrl.push('AccountconfirmPage', {
	            phone_country: this.userData.phone_country,
	            phone: this.userData.phone
	        });

	        //this.navCtrl.setRoot(AccountconfirmPage);

	      }, (err) => {

	        this.loadersignup.dismissAll();

	        this.usererror = this.authService.formatError(err);

	        let alert = this.alertCtrl.create({
	          cssClass:'alert-danger',
	          title:'Error',
	          subTitle:this.usererror,
	          buttons:['OK']
	        });
	        alert.present();

	      });

	  }

	  onLogin() {
	    this.navCtrl.push('LoginPage');
	  }

	  ngOnDestroy() {

	    this.subscription.unsubscribe();

      if (this.loader != null) {
        this.loader.dismissAll();
      }
      if (this.loadersignup != null) {
        this.loadersignup.dismissAll();
      }

    }

}
