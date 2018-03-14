import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpassPage } from './forgotpass';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgotpassPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpassPage),
    ComponentsModule
  ],
  exports: [
    ForgotpassPage
  ]
})

export class ForgotpassPageModule {}
