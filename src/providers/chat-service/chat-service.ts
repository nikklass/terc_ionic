import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { Channel } from '../../models/chats/channel.interface';
import { Chatmessage } from '../../models/chats/chatmessage.interface';
import { Chatthread } from '../../models/chats/chatthread.interface';
import { Chatthreadmessageread } from '../../models/chats/Chatthreadmessageread.interface';

@Injectable()
export class ChatService {

  channel = {} as Channel;
  chatmessage = {} as Chatmessage;
  chatthread = {} as Chatthread;
  chatthreadmessageread = {} as Chatthreadmessageread;

  constructor(private auth: AuthServiceProvider) {
  }

  /*add thread message*/
  addThreadMessage(chat_thread_id: number, content: string) {
    
    return new Promise((resolve, reject) => {
      
        this.chatmessage.chat_text = content;
        this.chatmessage.chat_thread_id = chat_thread_id;

        //post data
        this.auth.postAuthData(this.chatmessage, 'chatmessages').then(result => {

            resolve(result);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  /*fetch thread messages*/
  getThreadMessages(thread_id, page=1) {
  	
  	return new Promise((resolve, reject) => {
      
        //get data
        this.auth.getAuthData('chatmessages?chat_thread_id=' + thread_id + '&page=' + page).subscribe(result => {

            let res= result.json(); 

            resolve(res);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  //set thread mesages as read
  setThreadReadMessages(threadId: number) {

      return new Promise((resolve, reject) => {
      
        this.chatthreadmessageread.chat_thread_id = threadId;

        //get data
        this.auth.postAuthData(this.chatthreadmessageread, 'chatmessagereadstates').then(result => {

            resolve(result);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  //add new thread
  addChannelThread(channelId: number, chatthreadName: string) {
    
    return new Promise((resolve, reject) => {
      
        this.chatthread.chat_channel_id = channelId;
        this.chatthread.title = chatthreadName;

        //get data
        this.auth.postAuthData(this.chatthread, 'chatthreads').then(result => {

            resolve(result);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  /*fetch channel threads/ topics*/
  getChannelThreads(channel_id, page=1) {
  	
  	return new Promise((resolve, reject) => {
      
        //get data
        this.auth.getAuthData('chatthreads?chat_channel_id=' + channel_id + '&page=' + page).subscribe(result => {

            let res= result.json(); 

            resolve(res);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  /*fetch channels*/
  getChannels(page=1) {
  	
  	return new Promise((resolve, reject) => {
      
        //get data
        this.auth.getAuthData('chatchannels?page=' + page).subscribe(result => {

            let res= result.json(); 

            resolve(res);

        }, (err) => {
            
            reject(err);

        });

    });

  }

  addChannel(channelName: string) {
    
    return new Promise((resolve, reject) => {
      
        this.channel.name = channelName;

        //get data
        this.auth.postAuthData(this.channel, 'chatchannels').then(result => {

            resolve(result);

        }, (err) => {
            
            reject(err);

        });

    });

  }


}
