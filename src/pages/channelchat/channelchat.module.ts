import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelchatPage } from './channelchat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChannelchatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelchatPage),
    ComponentsModule
  ],
})
export class ChannelchatPageModule {}
