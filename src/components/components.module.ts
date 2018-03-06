import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EditdobComponent } from './editdob/editdob.component';
import { EditlocationComponent } from './editlocation/editlocation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { EditavatarComponent } from './editavatar/editavatar.component';
import { ProfileviewComponent } from './profileview/profileview.component';
import { SendmessageboxComponent } from './sendmessagebox/sendmessagebox.component';
import { ChatmessageComponent } from './chatmessage/chatmessage.component';
import { OnlineusersComponent } from './onlineusers/onlineusers.component';
@NgModule({
	declarations: [
		EditprofileComponent,
    EditdobComponent,
    EditlocationComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProfilesearchComponent,
    EditavatarComponent,
    ProfileviewComponent,
    SendmessageboxComponent,
    ChatmessageComponent,
    OnlineusersComponent
	],
	imports: [IonicModule],
	exports: [
		EditprofileComponent,
    EditdobComponent,
    EditlocationComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProfilesearchComponent,
    EditavatarComponent,
    ProfileviewComponent,
    SendmessageboxComponent,
    ChatmessageComponent,
    OnlineusersComponent
	]
})
export class ComponentsModule {}
