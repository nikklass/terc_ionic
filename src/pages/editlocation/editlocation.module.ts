import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditlocationPage } from './editlocation';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditlocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditlocationPage),
    ComponentsModule
  ],
})
export class EditlocationPageModule {}
