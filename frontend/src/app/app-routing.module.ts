import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'nav', component: NavBarComponent },
  { path: '', component: LandingComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
