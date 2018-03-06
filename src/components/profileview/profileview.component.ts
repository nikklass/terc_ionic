import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';
import { Profile } from '../../models/profiles/profile.interface';

@Component({
  selector: 'app-profile-view',
  templateUrl: 'profileview.component.html'
})

export class ProfileviewComponent implements OnInit {

  profile = {} as Profile;
  private loader : any;
  @Output() existingProfile: EventEmitter<Profile>;

  ngOnInit(): void {

      this.loader.present();

      /*this.myUserData.getUser().then((user) => {
          this.loader.dismiss();
          this.profile = <Profile>JSON.parse(user);
      });

      //get user stored in db
      this.data.getUserProfile().then((userProfile: Profile) => {

          this.loader.dismiss();

      });*/

  }

  constructor(private navCtrl: NavController, 
  			  private navParams: NavParams,
  			  private data: DataService,
          private myUserData: MyUserData,
          private loadingCtrl: LoadingController) {
      
      /*this.existingProfile = new EventEmitter<Profile>();

      //get user stored in db
      this.loader = this.loadingCtrl.create({
        content: "Loading ..."
      });*/

  }

  //

}
