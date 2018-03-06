import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public platform: Platform,
  			  public alertCtrl: AlertController) {
  	//this.onNotification();
  }

  /*async onNotification() {
  	try {
  		await this.platform.ready();

  		FCMPlugin.onNotification((data) => {
  			
  			//console.log(data);
  			this.alertCtrl.create({
  				message: data.message
  			}).present();

  		}, (error) => console.error(error));

  	} catch (e) {
  		console.error(e);
  	}
  }*/

}
