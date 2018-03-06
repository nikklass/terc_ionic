import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profiles/profile.interface';

@IonicPage()
@Component({
  selector: 'page-profileview',
  templateUrl: 'profileview.html',
})
export class ProfileviewPage {

  existingProfile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getExistingProfile(profile: Profile) {
  	this.existingProfile = profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileviewPage');
  }

}
