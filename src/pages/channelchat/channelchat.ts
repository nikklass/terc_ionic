import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ChatService } from '../../providers/chat-service/chat-service';
import { Chatthread } from '../../models/chats/chatthread.interface';
import { Chatmessage } from '../../models/chats/chatmessage.interface';
import { Profile } from '../../models/profiles/profile.interface';

import { ChatthreadMessageList } from '../../models/chats/chatthreadmessagelist.interface';
import { Pagination } from '../../models/pagination/pagination.interface';
import { PaginationData } from '../../models/pagination/paginationdata.interface';

import { MyUserData } from '../../providers/my-user-data/my-user-data';

//import { OneSignal } from '@ionic-native/onesignal';



@IonicPage()
@Component({
  selector: 'page-channelchat',
  templateUrl: 'channelchat.html',
})

export class ChannelchatPage {

  @ViewChild('content') content:any;

  private footerEl;
  private contentBox;
  private footerHeight;

  private loader : any;

  sending : boolean = false;

  userProfile: Profile;
  
  chatthread: Chatthread;

  chatmessageList: Chatmessage[];

  private resultList: ChatthreadMessageList;

  private pagination: Pagination;

  private paginationData: PaginationData;

  //define infinite scroll variables
  page = 1;
  currentpage: number = 1;
  perPage: number;
  total: number;
  totalPage: number;
  prevUrl: string;
  nextUrl: string;
  //end define infinite scroll variables


  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
              public alertCtrl: AlertController, 
  			      public chat: ChatService,
              public myUserData: MyUserData,
	            private loadingCtrl:LoadingController) {

  		this.loader = this.loadingCtrl.create({
	        content: "Loading ..."
	    });

  }

  /*initOneSignal() {
    const ONE_SIGNAL_APP_ID = "b0aa4b55-a86b-4458-bf6f-608ce0b65a95";
    const GOOGLE_PROJECT_NUMBER = "539411150267";
    this.oneSignal.startInit(ONE_SIGNAL_APP_ID, GOOGLE_PROJECT_NUMBER);

    //this.oneSignal.inFocusDisplaying();
  }*/


  getThreadMessages(id) {
    
      this.loader = this.loadingCtrl.create({
          content: "Loading ..."
      });

      this.loader.present();

      this.chat.getThreadMessages(id).then((result) => {

          this.loader.dismiss();

          //get whole result
          this.resultList =  <ChatthreadMessageList>result;

          //get data portion
          this.chatmessageList = <Chatmessage[]>this.resultList.data;

          //get meta portion
          this.pagination = <Pagination>this.resultList.meta;

          this.paginationData = <PaginationData>this.pagination.pagination;

          this.page = this.paginationData.current_page;
          this.perPage = this.paginationData.per_page;
          this.total = this.paginationData.total;
          this.totalPage = this.paginationData.total_pages;
          
          this.scrollToBottom();

        }, (err) => {

            this.loader.dismiss();

            let errormsg =  JSON.parse(err._body);
            let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle: errormsg.message,
              buttons: ['OK']
            });
            alert.present();

        });
    
  }


  doInfinite(): Promise<any> {

    this.currentpage = this.page;

    this.page = this.page + 1;

    return new Promise((resolve) => {
      setTimeout(() => {
        
          //this.chat.getChannels(this.page).then((result) => {
          this.chat.getThreadMessages(this.chatthread.id, this.page).then((result) => {

            //get whole result
            this.resultList =  <ChatthreadMessageList>result;

            //load more data
            for(let i=0; i<this.resultList.data.length; i++) {
               this.chatmessageList.push(<Chatmessage>this.resultList.data[i]);
            }

            //get meta portion
            this.pagination = <Pagination>this.resultList.meta;

            this.paginationData = <PaginationData>this.pagination.pagination;

            //pagination data
            this.perPage = this.paginationData.per_page;
            this.total = this.paginationData.total;
            this.totalPage = this.paginationData.total_pages;
            //this.prevUrl = this.paginationData.links.previous;
            //this.nextUrl = this.paginationData.links.next;

            resolve();

        }, (err) => {
            
            let errormsg =  JSON.parse(err._body);
            let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle: errormsg.message,
              buttons: ['OK']
            });
            alert.present();

            resolve();

        });
        
      }, 500);
    })

  }


  sendMessage(content: string) {

    let full_name = this.userProfile.first_name;
    if (this.userProfile.last_name != null) {
      full_name = full_name + " " + this.userProfile.last_name;
    }

    let chatMessageObj: Chatmessage = {
      creator_id: this.userProfile.user_id,
      chat_text: content,
      created_by: full_name,
      created_at: new Date().toISOString()
    }

    this.sending = true;

    this.chat.addThreadMessage(this.chatthread.id, content).then((result: any) => {

        this.sending = false;

        this.chatmessageList.unshift(chatMessageObj);

        this.scrollToBottom();

    }, (err) => {

        let error =  JSON.parse(err._body);
          
        let alert = this.alertCtrl.create({
          cssClass:'alert-danger',
          title:'Error', 
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();

    });

  }

  ionViewWillLoad() {
    
      this.loader = this.loadingCtrl.create({
          content: "Loading ..."
      });

      this.loader.present();

      //get chatthread object
      this.chatthread = this.navParams.get('chatthread');
      
      //get user stored in db
      this.myUserData.getUser().then((user) => {

          this.loader.dismiss();

          this.userProfile = <Profile>JSON.parse(user);

          //get chatthread chat messages
          setTimeout(() => {

            this.getThreadMessages(this.chatthread.id);

            //set thread_id as read by user
            this.chat.setThreadReadMessages(this.chatthread.id).then((result) => {});

          }, 1000);

      });

  }


  ionViewDidEnter() {

    if (this.chatmessageList) {
      this.scrollToBottom();
    }

    //get content height
    this.contentBox = document.querySelector(".scroll-content")['style'];
    this.footerEl = document.querySelector(".footer");
    this.footerHeight = this.footerEl.offsetHeight;
          
  }


  scrollToBottom() {

    if (this.content != null) {
      setTimeout(() => {
        this.content.scrollToBottom(500); //500ms animation speed
      }, 500);
    }

  }


  refresh() {
    
    //get thread messages
    this.getThreadMessages(this.chatthread.id);

  }


  scrollingContent(e) {
    /*console.log('scrolling');
    if (e.scrollTop < this.content.getContentDimensions().contentHeight) {
      document.querySelector(".footer")['style'].display = 'none';
      this.content.marginBottom = 0;
    } else {
      document.querySelector(".footer")['style'].display = 'flex';
      this.content.marginBottom = this.footerHeight;
    }*/
  }


}
