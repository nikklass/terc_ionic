import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, LoadingController  } from 'ionic-angular';

import { MyUserData } from '../../providers/my-user-data/my-user-data';
import { Profile } from '../../models/profiles/profile.interface';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
  logsOut?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  profile = {} as Profile;

  private rootPage = 'TabsPage'; 

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Home', pageName: 'TabsPage',  tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'My Accounts', pageName: 'TabsPage',  tabComponent: 'MycompaniesPage', index: 1, icon: 'people' },
    { title: 'My Profile', pageName: 'TabsPage',  tabComponent: 'ProfilePage', index: 2, icon: 'person' },
    { title: 'Members', pageName: 'AccountPage', icon: 'card' },
    { title: 'Chat', pageName: 'InboxPage', icon: 'chatbubbles' },
    { title: 'Contact Us', pageName: 'ContactPage', icon: 'contacts' }
  ];

  userPages: PageInterface[] = [
    { title: 'Logout', pageName: 'TabsPage', icon: 'log-out', logsOut: true }
  ]; 

  //user: UserProfileData[] = [];

  constructor(private myUserData: MyUserData,
              private loadingCtrl: LoadingController) {

        //get user stored in storage
        this.myUserData.getUser().then((user) => {
          
            this.profile = <Profile>JSON.parse(user);
            
        });
      
  }


  openPage(page: PageInterface) {

    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
      //console.log("Click page: "  + page.index);
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
       this.nav.getActiveChildNavs()[0].select(page.index);
    	// Set the root of the nav with params if it's a tab index
  	} else {
      this.nav.setRoot(page.pageName, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
    
    //logout user
    if (page.logsOut === true) {

        // Give the menu time to close before changing to logged out
        let loader = this.loadingCtrl.create({
          content: 'Logging out...'
        });

        loader.present();

        setTimeout(() => {
          
          this.myUserData.logout();
          loader.dismiss();

        }, 2000);

    }

  }


  isActive(page: PageInterface) {
    
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'white';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'white';
    }
    return;

  }


  ionViewWillEnter() {
    
    //check if user is logged in
    this.myUserData.hasLoggedIn()
    .then((hasLoggedIn) => {
      
      if (!hasLoggedIn) {
        this.rootPage = 'WelcomePage';
        this.nav.setRoot(this.rootPage);
      }

    });

  }


  //if user leaves before loaders finish, quit them
  onViewWillLeave() {
    /*if (loader != null) {
      loader.dismissAll();
    }*/
  }


}
