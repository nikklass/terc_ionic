import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  constructor(private navCtrl: NavController, 
  			  private popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({
      ev: myEvent
    });
  }

}
