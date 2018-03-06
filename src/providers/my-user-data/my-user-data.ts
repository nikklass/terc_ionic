import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthToken } from '../../models/authToken/authToken.interface';
import { Profile } from '../../models/profiles/profile.interface';

@Injectable()
export class MyUserData {

  profile = {} as Profile;

  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn2';

  constructor(
    private events: Events,
    private storage: Storage
  ) {}

  setUser(user) {
    this.storage.set('user', JSON.stringify(user));
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  };

  logout(): void {
    //this.storage.set(this.HAS_LOGGED_IN, false);
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setUserId(userid: string): void {
    this.storage.set('userid', userid);
  };

  setTokenData(authToken: AuthToken): void {
    this.storage.set('authToken', authToken);
  };

  setExpiresIn(expires_in: string): void {
    this.storage.set('expires_in', expires_in);
  };

  getUser(): Promise<string> {
    return this.storage.get('user').then((value) => {
      return value;
    });
  };

  getTokenData(): Promise<AuthToken> {
    return this.storage.get('authToken').then((value) => {
      return value;
    });
  };

  getExpiresIn(): Promise<string> {
    return this.storage.get('expires_in').then((value) => {
      return value;
    });
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getUserId(): Promise<string> {
    return this.storage.get('userid').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
}
