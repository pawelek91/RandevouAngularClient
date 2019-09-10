import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserFinderComponent } from './user-finder/user-finder.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { MessagingComponent } from './messaging/messaging.component';

const appRoutes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'myProfile',
    component: MyProfileComponent,
  },
  {
    path: 'find',
    component: UserFinderComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  },
  {
    path: 'friends',
    component: FriendshipComponent
  },
  {
    path: 'messages/:id',
    component: MessagingComponent
  },
  {
    path: 'messages',
    component: MessagingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
