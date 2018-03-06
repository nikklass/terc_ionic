import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Rx';

import { Loginresponse } from '../../models/login/loginresponse.interface';
import { Account } from '../../models/account/account.interface';
import { MyUserData } from '../my-user-data/my-user-data';
import { AuthToken } from '../../models/authToken/authToken.interface';

//let mainUrl = "http://127.0.0.1:8000/";
let mainUrl = "http://41.215.126.10/snb/";
let apiUrl = mainUrl + "api/"; 

@Injectable()
export class AuthServiceProvider {

  private usererror;
  private tokenData = { "username":"", "password":"" };

  authToken = {} as AuthToken;

  constructor(private http: Http, private myUserData: MyUserData,) {
  }


  getUsers() {
    return this.http.get(apiUrl + 'users')
      .map(res => res.json())
      .map(res => res);
  }


  async signIn(account: Account) {

    try {

      //get user data
      this.tokenData.username = account.username;
      this.tokenData.password = account.password;

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });

      return <Loginresponse> {
        result: await this.http.post(mainUrl+'api/login', JSON.stringify(this.tokenData), options)
      }

    } catch(e) {

      return <Loginresponse> {
        error: e
      }

    }

  }


  //get countries
  getCountries() {
    return this.http.get(apiUrl + "countries?report=1")
      .map(res => res.json())
      .map(res => res);
  }


  //get states
  getStates(country){
    return this.http.get(apiUrl + "states?report=1&country=" + country)
      .map(res => res.json())
      .map(res => res);
  }


  //state cities
  getCities(state){
    return this.http.get(apiUrl + "cities?report=1&state_id=" + state)
      .map(res => res.json())
      .map(res => res);
  }


  //state constituencies
  getConstituencies(state){
    return this.http.get(apiUrl + "constituencies?report=1&state_id=" + state)
      .map(res => res.json())
      .map(res => res);
  }


  //constituency wards
  getWards(constituency){
    return this.http.get(apiUrl + "wards?report=1&constituency_id=" + constituency)
      .map(res => res.json())
      .map(res => res);
  }


  //get data
  getData(type){
    return this.http.get(apiUrl + type)
      .map(res => res.json())
      .map(res => res);
  }


  getAuthData(type) {

    return Observable
      .fromPromise(this.buildHeaders())
      .switchMap((headers) => this.http.get(apiUrl + type, { headers: headers }));

  }


  getOauthToken(username, password) {

    return new Promise((resolve, reject) => {

        //get user data
        this.tokenData.username = username;
        this.tokenData.password = password;

        //get user access token
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        this.http.post(mainUrl+'api/login', JSON.stringify(this.tokenData), options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }


  userLogin(username, password) {

    return new Promise((resolve, reject) => {

        //start login
        this.getOauthToken(username, password).then((result) => {

          this.authToken = result;

          //set tokens
          this.myUserData.setTokenData(this.authToken);

          setTimeout(() => {

              //get user data
              this.getAuthData('user').subscribe(user => {

                  //start successful login
                  let userResult= user.json();

                  //console.log(userResult);

                  //store user object in storage
                  this.myUserData.setUser(userResult.data);

                  //login user
                  this.myUserData.login();
                  //end successful login

                  //return user object
                  resolve(userResult.data);

              }, (err) => {

                  reject(err);

              });

          }, 2000);

        }, (err) => {

            reject(err);

        });
        //end login

    });

  }


  postAuthData(credentials, type) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      //check if token has expired
      return this.myUserData.getTokenData().then((authToken) => {
          let access_token = authToken.access_token;
          console.log(access_token);
          if(access_token){
            headers.append("Authorization", "Bearer " + access_token);
            let options = new RequestOptions({ headers: headers });
            this.http.post(apiUrl+type, JSON.stringify(credentials), options)
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {
              reject(err);
            });
          }
        }
      )

    });

  }


  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      this.http.post(apiUrl+type, JSON.stringify(credentials), options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }


  PutAuthData(credentials, type) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      return this.myUserData.getTokenData().then((authToken) => {
          let access_token = authToken.access_token;
          //console.log(access_token);
          if(access_token){
            headers.append("Authorization", "Bearer " + access_token);
            let options = new RequestOptions({ headers: headers });
            this.http.put(apiUrl+type, JSON.stringify(credentials), options)
            .subscribe(res => {
              resolve(res.json());
            }, (err) => {
              reject(err);
            });
          }
        }
      )

    });

  }


  postDataBaseUrl(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      this.http.post(mainUrl+type, JSON.stringify(credentials), options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }


  buildHeaders(){
      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      return this.myUserData.getTokenData().then((authToken) => {
          let access_token = authToken.access_token;
          if(access_token){
            //console.log(token);
            headers.append('Authorization', 'Bearer ' + access_token);
            return headers;
          }
        }
      )
  }


  formatError(err) {

    //clear error variable
    this.usererror = "";

    var messagearray = new Array();
    var messages= JSON.parse(err._body);
    var message= messages['message'];
    messagearray = JSON.parse(message);

    //loop thru returned object and store in this.usererror 
    for(var key in messagearray) {
      //if( messagearray.hasOwnProperty(key) ) {
        this.usererror = this.usererror + messagearray[key] + "<br>";
      //}
      //console.log(this.usererror);
    }

    return this.usererror

  }


  parseJSON(response) {
    return response.json().then(json => {
          return {
                   data: json,
                   status: response.status
                 }
    })
  }


}
