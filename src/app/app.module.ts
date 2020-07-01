import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './entities/components/header/header.component';
import {UserComponent} from './entities/components/Users/users.component';
import {AppsItemComponent} from './entities/components/appsItem/appsItem.component';
import {mainPageComponent} from './entities/components/mainPage/mainPage.component'

import { SidenavComponent } from './entities/components/sidenav/sidenav.component';

import { SharedModule } from './entities/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
//import { HTTPInterceptorService } from './entities/services/http-interceptor.service';
import { FormsModule } from '@angular/forms';
import {ApiService} from './entities/services/api.service'
import {AppsItemService} from './entities/services/appsItem.service'
import {UserService} from './entities/services/users.service'
import {oneappComponent} from './entities/components/appsItem/oneApp/oneapp.component'
import {oneuserComponent} from './entities/components/Users/OneUser/oneuser.component'
import {AllUserComponent} from './entities/components/Users/AllUsers/allusers.component'
import {PaidUserComponent} from './entities/components/Users/PaidUsers/paidusers.component'
import {AuthComponent} from './entities/components/auth/auth.component'


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'Users', component: UserComponent,
    children : [{path :'all', component: AllUserComponent}, 
    {path: 'paid', component: PaidUserComponent}]
  },
  {
    path: 'AppsItems', component: AppsItemComponent,
    //children: [{path: '1', component: oneappComponent}]
  },
  {
    path: '', component: mainPageComponent,
  },
  {
    path: 'AppsItems/:id', component:oneappComponent,
  },

  {
    path: 'Users/:id', component: oneuserComponent,
  },
  {
    path:'auth', component: AuthComponent,
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    UserComponent,
    AppsItemComponent,
    mainPageComponent,
    oneappComponent,
    oneuserComponent,
    AllUserComponent,
    PaidUserComponent,
    AuthComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    //AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AppsItemService,
    HttpClient,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }