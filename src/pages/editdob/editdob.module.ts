import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditdobPage } from './editdob';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditdobPage,
  ],
  imports: [
    IonicPageModule.forChild(EditdobPage),
    ComponentsModule
  ],
})
export class EditdobPageModule {}
