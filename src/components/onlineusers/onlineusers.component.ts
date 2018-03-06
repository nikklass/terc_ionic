import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../providers/data-service/data-service';
import { Profile } from '../../models/profiles/profile.interface';

@Component({
  selector: 'app-online-users',
  templateUrl: 'onlineusers.component.html'
})
export class OnlineusersComponent implements OnInit {

  private profileList: Profile[];

  private loader : any; 

  @Output() selectedProfile: EventEmitter<Profile>

  ngOnInit(): void {

  }

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(private navCtrl: NavController, 
  			      private navParams: NavParams,
  			      private data: DataService) {

        this.selectedProfile = new EventEmitter<Profile>();
  		
  }

  selectProfile(profile: Profile) {
    this.selectedProfile.emit(profile);
  }

  searchUser(query) {
    
    const trimmedQuery = query.trim();

    // if the value is an empty string don't filter the items
    if (trimmedQuery === query) {

      //get user profiles
      this.data.searchUser(query).then((result) => {
          console.log(result);
          this.profileList = <Profile[]>result;
      });

    }
    
  }

}