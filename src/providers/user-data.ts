import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    private events: Events,
    private storage: Storage
  ) {}

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

  login(userid: string, username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserId(userid);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('userid');
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setUserId(userid: string): void {
    this.storage.set('userid', userid);
  };

  setAccessToken(accessToken: string): void {
    this.storage.set('accessToken', accessToken);
  };

  setRefreshToken(refreshToken: string): void {
    this.storage.set('refreshToken', refreshToken);
  };

  getAccessToken(): Promise<string> {
    return this.storage.get('accessToken').then((value) => {
      return value;
    });
  };

  getRefreshToken(): Promise<string> {
    return this.storage.get('refreshToken').then((value) => {
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
