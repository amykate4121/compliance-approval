import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit{
  constructor(public auth: AuthService) { }
  ngOnInit(): void {
    this.auth.loginWithRedirect();
  }



  // login(): void{
  //   this.auth.loginWithRedirect();
  // }

  // // signIn = Auth0.signIn;
  // // signOut = Auth0.signOut;
  // // getProfile = Auth0.getProfile;
  // authenticated = Auth0.isAuthenticated
  // // hero: Hero = {
  // //   id: 1,
  // //   name: 'Windstorm'
  // // }
}