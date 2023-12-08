import { Component } from '@angular/core';
import * as Auth0 from 'auth0-web';
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) { }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;
  authenticated = Auth0.isAuthenticated();
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }

  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback((err) => {
      if (err) alert(err);
      self.router.navigate(['/home']);
    });
  }
}
