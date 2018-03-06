import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, Events, Nav, AlertController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

import { MyUserData } from '../providers/my-user-data/my-user-data';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(private platform: Platform, 
              private statusBar: StatusBar,
              private myUserData: MyUserData, 
              private events: Events,
              private oneSignal: OneSignal,
              private alertCtrl: AlertController,
              private splashScreen: SplashScreen) {

    this.initializeApp();

    this.listenToLogoutEvent();

    //check if user is already logged in
    this.myUserData.hasLoggedIn()
    .then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.rootPage = 'MenuPage';
        //this.rootPage = 'MycompaniesPage';
      } else {
        this.rootPage = 'WelcomePage';
      }

    });

  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      //this.initOneSignal();

    });

  }

  initOneSignal() {
    
    const ONE_SIGNAL_APP_ID = "b0aa4b55-a86b-4458-bf6f-608ce0b65a95";
    const GOOGLE_PROJECT_NUMBER = "539411150267";

    // to initialize push notifications
    /*var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };*/

    this.oneSignal.startInit(ONE_SIGNAL_APP_ID, GOOGLE_PROJECT_NUMBER);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived()
        .subscribe((data) => {
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'notification', 
            subTitle: JSON.stringify(data),
            buttons: ['OK']
          });
          alert.present();
        })

    this.oneSignal.handleNotificationOpened()
        .subscribe(() => {
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'notification', 
            subTitle: "notif opened",
            buttons: ['OK']
          });
          alert.present();
        })

    this.oneSignal.endInit(); 

    /*  .handleNotificationOpened(notificationOpenedCallback)
      .endInit();*/

  }

  listenToLogoutEvent() {
    this.events.subscribe('user:logout', () => {
      //set root page to welcome
      this.nav.setRoot('WelcomePage');
    });
  }


}
