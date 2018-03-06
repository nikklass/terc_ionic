import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ChatService } from '../../providers/chat-service/chat-service';

import { Channel } from '../../models/chats/channel.interface';
import { Chatthread } from '../../models/chats/chatthread.interface';
import { ChatthreadResultList } from '../../models/chats/chatthreadresultlist.interface';
import { Pagination } from '../../models/pagination/pagination.interface';
import { PaginationData } from '../../models/pagination/paginationdata.interface';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-chatthreads',
  templateUrl: 'chatthreads.html',
})

export class ChatthreadsPage {

  @ViewChild('content') content:any;

  private loader: any;

  channel: Channel;

  chatthread: Chatthread;

  private chatthreadList: Chatthread[];

  private resultList: ChatthreadResultList;

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


  constructor(
  			  public navCtrl: NavController, 
  			  public chat: ChatService, 
  			  public alertCtrl: AlertController, 
  			  public navParams: NavParams, 
          private nativePageTransitions: NativePageTransitions,
	        private loadingCtrl:LoadingController) {
  }

  //add page animations
  selectChatThread(chatthread: Chatthread) {
  	let options: NativeTransitionOptions = {
      "direction"        : "left", 
      "duration"         :  500, 
      "slowdownfactor"   :    3
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.push('ChannelchatPage', { chatthread });
  }

  showAddChatThread() {
  	
    this.alertCtrl.create({
  		
      title: 'Add New Topic',
  		inputs: [{
  			name: 'threadName'
  		}],

  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel'
  			},
  			{
  				
          text: 'Save',

  				handler: data => {

            if (data.threadName) {

                this.loader = this.loadingCtrl.create({
                    content: "Saving ..."
                });
                this.loader.present();
      					this.chat.addChannelThread(this.channel.id, data.threadName).then((result: any) => {

                    if(this.loader){ this.loader.dismiss(); }
                    //get channel chat messages
                    this.getChatthreads(this.channel.id);

    				    }, (err) => {

    				        if(this.loader){ this.loader.dismiss(); }
                    let error =  JSON.parse(err._body);
  			            let alert = this.alertCtrl.create({
  			            	cssClass:'alert-danger',
  			            	title:'Error', 
  			            	subTitle: error.message,
  			            	buttons: ['OK']
  			          	});
  			          	alert.present();

    				    });

              } else {

                //

              }

  				}

  			}
  		]
  	}).present();
  }


  getChatthreads(channel_id) {
    
      this.loader = this.loadingCtrl.create({
          content: "Loading ..."
      });

      this.loader.present();

      this.chat.getChannelThreads(channel_id).then((result) => {

          if(this.loader){ this.loader.dismiss(); }
          //get whole result
          this.resultList =  <ChatthreadResultList>result;
          //get data portion
          this.chatthreadList = <Chatthread[]>this.resultList.data;
          //get meta portion
          this.pagination = <Pagination>this.resultList.meta;
          this.paginationData = <PaginationData>this.pagination.pagination;
          this.page = this.paginationData.current_page;
          this.perPage = this.paginationData.per_page;
          this.total = this.paginationData.total;
          this.totalPage = this.paginationData.total_pages;
          //this.prevUrl = this.paginationData.links.previous;
          //this.nextUrl = this.paginationData.links.next;

          this.scrollToTop();

          /*console.log(this.page);
          console.log(this.totalPage);
          console.log(this.resultList);
          console.log(this.chatthreadList);
          console.log(this.pagination);*/

        }, (err) => {

            if(this.loader){ this.loader.dismiss(); }

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
          this.chat.getChannelThreads(this.channel.id, this.page).then((result) => {

            //get whore result
            this.resultList =  <ChatthreadResultList>result;

            //load more data
            for(let i=0; i<this.resultList.data.length; i++) {
               this.chatthreadList.push(<Chatthread>this.resultList.data[i]);
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

            /*console.log(this.page);
            console.log(this.totalPage);
            console.log(this.resultList);
            console.log(this.chatthreadList);
            console.log(this.pagination);*/

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


  scrollToTop() {

    if (this.content != null) {
      setTimeout(() => {
        this.content.scrollToTop(500);//500ms animation speed
      }, 500);
    }

  }


  refresh() {
    //get channel chat messages
    this.getChatthreads(this.channel.id);
  }


  ionViewWillLoad() {
    //get channel object
    this.channel = this.navParams.get('channel');
    //get channel chat messages
    this.getChatthreads(this.channel.id);
  }

}
