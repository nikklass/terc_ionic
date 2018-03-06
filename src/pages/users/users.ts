import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
  providers: [AuthServiceProvider]
})
export class UsersPage {

  public users = new Array();
  private detailPage;
  private next_url = "";

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private authService: AuthServiceProvider, ) {
  	authService.getUsers().subscribe(users => {
  		this.users = users.data;
  	});
  	this.detailPage = 'DetailPage';
  }

  loadMoreUsers(infiniteScroll) {

    this.authService.getUsers().subscribe(users => {
      //console.log('users', users);
      //this.users.push(users.data);
      infiniteScroll.complete();
      //console.log('Async operation has ended');
    });

  }

  loadDetail(user) {
  	console.log(user);
  	this.navCtrl.push(this.detailPage, {user:user});
  }

}
