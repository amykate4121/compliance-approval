import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
// import {ExamsApiService} from './loading-page/landing-api.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import {LoadingPageComponent} from './loading-page/loading-page.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DocumentEditorModule, DocumentEditorContainerModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';


const appRoutes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'text-editor', component: TextEditorComponent, canLoad:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
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
  providers: [ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}