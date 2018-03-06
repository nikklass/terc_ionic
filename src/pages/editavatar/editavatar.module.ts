import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditavatarPage } from './editavatar';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditavatarPage,
  ],
  imports: [
    IonicPageModule.forChild(EditavatarPage),
    ComponentsModule
  ],
})
export class EditavatarPageModule {}
