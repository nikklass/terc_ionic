import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public user = {
  	id: "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.user.id = navParams.data.user.id;
    this.user.first_name = navParams.data.user.first_name;
    this.user.last_name = navParams.data.user.last_name;
    this.user.email = navParams.data.user.email;
    this.user.country = navParams.data.user.country;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailPage');
  }

}
