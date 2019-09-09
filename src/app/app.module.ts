import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserFinderComponent } from './user-finder/user-finder.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { MessagingComponent } from './messaging/messaging.component';
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoginComponent,
    MyProfileComponent,
    UserFinderComponent,
    UserDetailsComponent,
    FriendshipComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    MatDatepickerModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
