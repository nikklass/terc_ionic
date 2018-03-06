import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycompaniesPage } from './mycompanies';

@NgModule({
  declarations: [
    MycompaniesPage,
  ],
  imports: [
    IonicPageModule.forChild(MycompaniesPage),
  ],
})
export class MycompaniesPageModule {}
