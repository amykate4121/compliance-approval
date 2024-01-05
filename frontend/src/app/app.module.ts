import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import {AppComponent} from './app.component';
import {ExamsApiService} from './landing/landing-api.service';
// import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
// import { RegisterComponent } from './register/register.component';


import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
// import {ExamsComponent} from './exams/exams.component';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import * as Auth0 from 'auth0-web';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'text-editor', component: TextEditorComponent, canLoad:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavBarComponent,
    HomeComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    AuthModule.forRoot({
      domain: 'dev-na28whcishipj6up.us.auth0.com',
      clientId: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/home',
      },
    }),
    RichTextEditorModule
  ],
  providers: [ExamsApiService, ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor() {
  //   Auth0.configure({
  //     domain: 'dev-na28whcishipj6up.us.auth0.com',
  //     audience: 'https://approval-portal/',
  //     clientID: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
  //     redirectUri: 'http://localhost:4200/home',
  //     scope: 'openid profile manage:exams'
  //   });
  // }
}