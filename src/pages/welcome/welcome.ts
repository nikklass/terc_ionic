import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onLogin() {
  	this.navCtrl.push('LoginPage');
  }

  onSignup() {
  	this.navCtrl.push('SignupPage');
  }

}
