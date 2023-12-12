import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(public auth: AuthService) { }

  login(): void{
    this.auth.loginWithRedirect();
  }

  // signIn = Auth0.signIn;
  // signOut = Auth0.signOut;
  // getProfile = Auth0.getProfile;
  authenticated = Auth0.isAuthenticated
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }
}