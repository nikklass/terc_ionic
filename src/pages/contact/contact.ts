import { Component } from '@angular/core';

import { IonicPage, AlertController, NavController, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

import { UserProfileData } from '../../interfaces/user-profile-data';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	responseData : any;
    loader : any;
    messageData = {"subject":"", "message":""};

  constructor( private navCtrl: NavController, 
                private authService: AuthServiceProvider, 
                private myUserData: MyUserData, 
                private alertCtrl: AlertController, 
                private loadingCtrl:LoadingController) {
    }

  onSendMessage() {

        //basic error check
        if(this.messageData.subject === '' || this.messageData.message === '') {
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
          content: "Sending message..."
        });
        this.loader.present();

        this.authService.postAuthData(this.messageData, 'messages').then((result) => {

            //message sent
            this.loader.dismissAll();

            //show success message
            let alert = this.alertCtrl.create({
              cssClass:'alert-success',
              title:'Success', 
              subTitle:"Message sent successfully.",
              buttons: [
              {
                  text: 'OK',
                  handler: () => {
                    //navigate to home page
                    //this.navCtrl.setRoot('HomePage');
                    //clear fields
                    this.messageData.subject = '';
                    this.messageData.message = '';
                  }
                }
              ]
            });
            alert.present();

        }, (err) => {
            
            this.loader.dismissAll();

            let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle:"Error sending message. Please try again.",
              buttons: ['OK']
            });
            alert.present();

        });

    }

}
