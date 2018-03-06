import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchuserPage } from './searchuser';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SearchuserPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchuserPage),
    ComponentsModule
  ],
})
export class SearchuserPageModule {}
