import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ExamsApiService} from './landing/landing-api.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DocumentEditorModule, DocumentEditorContainerModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';


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
    DocumentEditorModule, 
    DocumentEditorContainerModule
  ],
  providers: [ExamsApiService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}