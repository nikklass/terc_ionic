import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/*import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { UserProfileData } from '../../interfaces/user-profile-data';*/

import { Loginresponse } from '../../models/login/loginresponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  	@Output() loginStatus: EventEmitter<Loginresponse>;

  	responseData : any;
    loader : any;
    userData = {"username":"", "password":""};

    constructor(private navCtrl: NavController, 
                private authService: AuthServiceProvider, 
                private alertCtrl: AlertController, 
                private loadingCtrl:LoadingController) {
    		this.loginStatus = new EventEmitter<Loginresponse>();
    }

    login() {

        //basic error check
        if(this.userData.username === '' || this.userData.password === '') {
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

        this.authService.userLogin(this.userData.username, this.userData.password).then((result) => {

            //start successful login
            this.loader.dismissAll();

            //send result back to calling page
            this.loginStatus.emit(result);

        }, (err) => {
            
            this.loader.dismissAll();

            const error: Loginresponse = {
            	error: JSON.parse(err._body)
            }
            
            //send result back to calling page
            this.loginStatus.emit(error);

        });

    }

    onSignup() {
        this.navCtrl.push('SignupPage');
    }

    onForgotPassword() {
        this.navCtrl.push('ForgotpassPage');
    }

    onConfirmAccount() {
        this.navCtrl.push('AccountconfirmPage');
    }

}
