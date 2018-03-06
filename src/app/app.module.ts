import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { OneSignal } from '@ionic-native/onesignal';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyUserData } from '../providers/my-user-data/my-user-data';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DataService } from '../providers/data-service/data-service';
import { ChatService } from '../providers/chat-service/chat-service';
import { CompanyService } from '../providers/company-service/company-service';

import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyUserData,
    AuthServiceProvider,
    DataService,
    ChatService,
    CompanyService,
    NativePageTransitions,
    OneSignal
  ]
})

export class AppModule {}
