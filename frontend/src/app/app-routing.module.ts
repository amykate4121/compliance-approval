import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
// import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './auth/auth-guard.service';
import { AuthGuard } from '@auth0/auth0-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
// import { EmailFormComponent } from './email-form/email-form.component';
import { ApprovalPageComponent } from './approval-page/approval-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AiReportComponent } from './ai-report/ai-report.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnauthorisedAccessComponent } from './unauthorised-access/unauthorised-access.component';

const routes: Routes = [
  // { path: 'nav', component: NavBarComponent },
  { path: '', component: LoadingPageComponent},
  // { path: 'email', component: EmailFormComponent},
  { path: 'ai-report', component: AiReportComponent},
  // { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'text-editor', component: TextEditorComponent, canLoad:[AuthGuard]},
  { path: 'approval-page', component: ApprovalPageComponent, canLoad:[AuthGuard]},
  { path: 'unauthorised-access', component: UnauthorisedAccessComponent, canLoad:[AuthGuard]},
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes), MatDialogModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
