import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { Profile } from '../../models/profiles/profile.interface';

@Injectable()
export class DataService {

  constructor(private auth: AuthServiceProvider) {
      
  }

  getMyProfile() {
    
    return new Promise((resolve, reject) => {
      
        //get my user object
        this.auth.getAuthData('user').subscribe(user => {

            let result= user.json(); 
            //return my user object
            resolve(result.data);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  searchUser(query: string) {

    //console.log(query);
    
    return new Promise((resolve, reject) => {
      
        //get results array
        this.auth.getAuthData('users/search?querydata=' + query).subscribe(users => {

            let result= users.json(); 
            //return result
            resolve(result.data);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  getUserProfile(profile: Profile) {
    
    return new Promise((resolve, reject) => {
      
        //get user object
        this.auth.getData('users/' + profile.id).subscribe(user => {

            let result= user.json(); 
            //return user object
            resolve(result.data);

        }, (err) => {
            
            reject(err);

        });

    });

  }

}
