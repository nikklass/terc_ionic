import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';
import { MyUserData } from '../../providers/my-user-data/my-user-data';
import { UserProfileData} from '../../interfaces/user-profile-data';
import { Profile } from '../../models/profiles/profile.interface';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: UserProfileData[] = [];
  profile = {} as Profile;

  private loader : any;

  ngOnInit(): void {

      //get user stored in db
      this.loader = this.loadingCtrl.create({
        content: "Loading ..."
      });
      this.loader.present();

      this.myUserData.getUser().then((user) => {
          
          this.loader.dismiss();
          this.profile = <Profile>JSON.parse(user);
          //console.log(this.profile);
          
      });

  }

  constructor(private navCtrl: NavController, 
  			      private navParams: NavParams,
  			      private data: DataService,
              private myUserData: MyUserData,
              private loadingCtrl: LoadingController) {
  		
  }

  onLogout() {

    this.loader = this.loadingCtrl.create({
      content: 'Logging out...'
    });

    this.loader.present();

    setTimeout(() => {
      
      this.myUserData.logout();
      this.loader.dismiss();

    }, 2000);

  }

  //if user leaves before loaders finish, quit them
  /*ngOnDestroy() { 
      if (this.loader != null) {
        this.loader.dismissAll();
      }
  }*/

}