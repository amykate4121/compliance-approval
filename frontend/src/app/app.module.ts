import {BrowserModule} from '@angular/platform-browser';
import {NgModule, importProvidersFrom} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import {LoadingPageComponent} from './loading-page/loading-page.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DocumentEditorModule, DocumentEditorContainerModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { EmailFormComponent } from './email-form/email-form.component';
import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExamsComponent } from './exams/exams.component';
import { CallbackComponent } from './callback.component';
import * as Auth0 from 'auth0-web';
import { TextEditorApi } from './text-editor/text-editor.api';
import { ExamFormComponent } from './exams/exam-form.component';
import { ExamsApiService } from './exams/exams-api.service';

const appRoutes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'email', component: EmailFormComponent },
  { path: 'exam', component: ExamsComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'text-editor', component: TextEditorComponent, canLoad:[AuthGuard]},
  { path: 'approval-page', component: ApprovalPageComponent, canLoad:[AuthGuard]},
  { path: 'callback', component: CallbackComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    NavBarComponent,
    HomeComponent,
    TextEditorComponent,
    EmailFormComponent,
    ExamsComponent,
    ExamFormComponent,
    ApprovalPageComponent,
    RequestApprovalComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    AuthModule.forRoot({
      domain: 'dev-na28whcishipj6up.us.auth0.com',
      clientId: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/text-editor',
      },
    }),
    DocumentEditorModule, 
    DocumentEditorContainerModule
  ],
  providers: [ExamsApiService, TextEditorApi, ToolbarService, importProvidersFrom(HttpClientModule)],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'dev-na28whcishipj6up.us.auth0.com',
      audience: 'https://approval-portal/',
      clientID: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'
    });
  }
}