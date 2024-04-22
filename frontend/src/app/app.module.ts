import { BrowserModule } from '@angular/platform-browser';
import { NgModule, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DocumentEditorModule, DocumentEditorContainerModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AiReportComponent } from './ai-report/ai-report.component';
import * as Auth0 from 'auth0-web';
import { TextEditorApi } from './text-editor/text-editor.api';
import { AiReportApiService } from './ai-report/ai-report-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallbackComponent } from './callback/callback.component';
import { UnauthorisedAccessComponent } from './unauthorised-access/unauthorised-access.component';
import { ApprovalPageApi } from './approval-page/approval-page.api';

// set the router paths
const appRoutes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'exam', component: AiReportComponent },
  { path: 'text-editor', component: TextEditorComponent },
  { path: 'approval-page', component: ApprovalPageComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'unauthorised-access', component: UnauthorisedAccessComponent },
];

// all necessary imports and declarations
// including information for 0Auth (login)
@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    NavBarComponent,
    TextEditorComponent,
    AiReportComponent,
    ApprovalPageComponent,
    RequestApprovalComponent,
    CallbackComponent,
    UnauthorisedAccessComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    RouterModule.forRoot(appRoutes),
    AuthModule.forRoot({
      domain: 'dev-na28whcishipj6up.us.auth0.com',
      clientId: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/text-editor',
        // redirect_uri: 'http://compliance-approval-portal.s3-website.eu-north-1.amazonaws.com/text-editor',   // url used to generate dist which is uploaded to generate dist file which is uploaded to s3 bucket
      },
    }),
  ],
  providers: [
    AiReportApiService,
    TextEditorApi,
    ApprovalPageApi,
    ToolbarService,
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'dev-na28whcishipj6up.us.auth0.com',
      audience: 'https://approval-portal/',
      clientID: 'pFKG6ErjOE4crtGf0aXxmSt1aWONQTgp',
      redirectUri: 'http://localhost:4200/callback',
      // redirectUri: 'http://compliance-approval-portal.s3-website.eu-north-1.amazonaws.com/callback',    // url used to generate dist which is uploaded to generate dist file which is uploaded to s3 bucket
      scope: 'openid profile manage:report',
    });
  }
}