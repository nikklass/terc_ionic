import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { MyUserData } from '../../providers/my-user-data/my-user-data';
import { Profile } from '../../models/profiles/profile.interface';

@IonicPage()
@Component({
  template: `
    <ion-list class="popover-page">
      <button ion-item (click)="onEditBasicProfile()">Edit Basic Profile</button>
      <button ion-item (click)="onEditLocation()">Edit Location</button>
      <button ion-item (click)="onEditPhone()">Edit Phone Number</button>
      <button ion-item (click)="onEditEmail()">Edit Email Address</button>
      <button ion-item (click)="onEditDob()" *ngIf="profile.dob_updated == 0">
        Edit D.O.B. 
      </button>
      <button ion-item (click)="onChangePassword()">Change Password</button>
    </ion-list>
  `
})

export class PopoverPage {
  
  profile = {} as Profile;

  ngOnInit() {
      //get user stored in storage
      this.myUserData.getUser()
      .then((user) => {
          this.profile = JSON.parse(user);
          //console.log(this.profile);
      });
  }

  constructor(public viewCtrl: ViewController, 
              private navCtrl: NavController,
              private myUserData: MyUserData) {

  }

  onEditBasicProfile() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditprofilePage');
  }

  onEditLocation() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditlocationPage');
  }

  onEditDob() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditdobPage');
  }

  onEditEmail() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditprofilePage');
  }

  onEditPhone() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditprofilePage');
  }

  onChangePassword() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('EditprofilePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
