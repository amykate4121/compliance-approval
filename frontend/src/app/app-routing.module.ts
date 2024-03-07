import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './auth/auth-guard.service';
import { AuthGuard } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { ApprovalPageComponent } from './approval-page/approval-page.component';

const routes: Routes = [
  { path: 'nav', component: NavBarComponent },
  { path: '', component: LoadingPageComponent},
  { path: 'email', component: EmailFormComponent},
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'text-editor', component: TextEditorComponent, canLoad:[AuthGuard]},
  { path: 'approval-page', component: ApprovalPageComponent, canLoad:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
