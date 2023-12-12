import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './auth/auth-guard.service';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'nav', component: NavBarComponent },
  { path: '', component: LandingComponent},
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
