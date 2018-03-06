import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profiles/profile.interface';

@IonicPage()
@Component({
  selector: 'page-searchuser',
  templateUrl: 'searchuser.html',
})
export class SearchuserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openChat(profile: Profile) {
  	this.navCtrl.push('MessagePage', { profile });
  }

}
