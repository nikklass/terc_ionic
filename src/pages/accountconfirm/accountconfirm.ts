import {Component, OnDestroy, OnInit} from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Subscription} from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-accountconfirm',
  templateUrl: 'accountconfirm.html',
})
export class AccountconfirmPage implements OnInit ,OnDestroy {

    private countriesSubscription : Subscription;
    private countries = new Array();
  	private usererror;
    private loader : any;
    private loaderconfirm : any;

    responseData : any;
    userData = {"phone":"", "confirm_code":"", "phone_country":""};

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private authService: AuthServiceProvider,
                private alertCtrl: AlertController,
                private loadingCtrl:LoadingController) {}

    ngOnInit() {

      //get passed params
      this.userData.phone = this.navParams.get('phone');
      this.userData.phone_country = this.navParams.get('phone_country');

      //load countries on page load
      this.loader = this.loadingCtrl.create({
        content: "Loading ..."
      });
      this.loader.present();

      this.countriesSubscription = this.authService.getCountries().subscribe(countries => {

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

    onAccountConfirm() {

        //basic error check
        if(this.userData.phone === '' || this.userData.confirm_code === ''
          || this.userData.phone_country === '') {
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Login Error',
            subTitle:'All fields are required',
            buttons:['OK']
          });
          alert.present();
          return;
        }

        this.loaderconfirm = this.loadingCtrl.create({
          content: "Confirming account..."
        });
        this.loaderconfirm.present();

        //post confirm data
        this.authService.postData(this.userData, "users/confirm").then((result) => {

          console.log(result);
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

        });

    }

    onLogin() {
      this.navCtrl.push('LoginPage');
    }

    onChangePhone() {
      this.navCtrl.push('ChangephonePage');
    }

    ngOnDestroy() {

      this.countriesSubscription.unsubscribe();

      if (this.loader != null) {
        this.loader.dismissAll();
      }
      if (this.loaderconfirm != null) {
        this.loaderconfirm.dismissAll();
      }

    }

}

