import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatthreadsPage } from './chatthreads';

@NgModule({
  declarations: [
    ChatthreadsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatthreadsPage),
  ],
})
export class ChatthreadsPageModule {}
