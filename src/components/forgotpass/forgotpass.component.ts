import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Loginresponse } from '../../models/login/loginresponse.interface';

@Component({
  selector: 'app-forgotpass',
  templateUrl: 'forgotpass.component.html'
})
export class ForgotpassComponent {

  	@Output() forgotpassStatus: EventEmitter<Loginresponse>;

  	responseData : any;
    loader : any;
    userData = {"username":""};

    constructor(private navCtrl: NavController, 
                private authService: AuthServiceProvider, 
                private alertCtrl: AlertController, 
                private loadingCtrl:LoadingController) {
    		this.forgotpassStatus = new EventEmitter<Loginresponse>();
    }

    onForgotPassword() {

        //basic error check
        if(this.userData.username === '') {
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Error', 
            subTitle:'All fields are required',
            buttons:['OK']
          });
          alert.present();
          return;
        } 

        this.loader = this.loadingCtrl.create({
          content: "Logging in..."
        });
        this.loader.present();

        this.authService.userResetPassword(this.userData.username).then((result) => {

            //start successful login
            this.loader.dismissAll();

            //send result back to calling page
            this.forgotpassStatus.emit(result);

        }, (err) => {
            
            this.loader.dismissAll();

            const error: Loginresponse = {
            	error: JSON.parse(err._body)
            }
            
            //send result back to calling page
            this.forgotpassStatus.emit(error);

        });

    }

    onSignup() {
        this.navCtrl.push('SignupPage');
    }

    onLogin() {
        this.navCtrl.push('LoginPage');
    }

}
