import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-changephone',
  templateUrl: 'changephone.html',
})
export class ChangephonePage {

    private countries = new Array();
  	private usererror;
    private loader : any;
    private loaderconfirm : any;

    responseData : any;
    userData = {"phone":"", "password":"", "phone_country":"", "email":""};

    constructor(private navCtrl: NavController,
                private authService: AuthServiceProvider, 
                private alertCtrl: AlertController, 
                private loadingCtrl:LoadingController) {

    		  //load countries on page load
		      this.loader = this.loadingCtrl.create({
		        content: "Loading ..."
		      });
		      this.loader.present();

		      authService.getCountries().subscribe(countries => {
		        
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

    onChangePhone() {

        //basic error check
        if(this.userData.phone === '' || this.userData.password === '' || this.userData.email === '' || this.userData.phone_country === '') {
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Login Error', 
            subTitle:'All fields are required',
            buttons:['OK']
          });
          alert.present();
          return;
        } 

        /*return;

        this.loaderconfirm = this.loadingCtrl.create({
          content: "Changing phone..."
        });
        this.loaderconfirm.present();

        //post confirm data
        this.authService.postData(this.userData, "users/changephone").then((result) => {

          this.loaderconfirm.dismissAll();

          //start successful login
          let alert = this.alertCtrl.create({
            cssClass:'alert-success',
            title:'Success', 
            subTitle:"Account Successfully Confirmed. Please login.",
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
          //end successful login

        }, (err) => {

          this.loaderconfirm.dismissAll();

          this.usererror = this.authService.formatError(err);

          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Error', 
            subTitle: this.usererror,
            buttons:['OK']
          });
          alert.present();

        });*/

    }

    onLogin() {
      this.navCtrl.push('LoginPage');
    }

    onAccountConfirm() {
      this.navCtrl.push('AccountconfirmPage');
    }

    onViewWillLeave() {
      if (this.loader != null) {
        this.loader.dismissAll();
      }
      if (this.loaderconfirm != null) {
        this.loaderconfirm.dismissAll();
      }
    }

}


