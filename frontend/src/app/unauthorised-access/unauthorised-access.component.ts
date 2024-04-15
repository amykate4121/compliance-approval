import { Component } from '@angular/core';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-unauthorised-access',
  templateUrl: './unauthorised-access.component.html',
  styleUrls: ['./unauthorised-access.component.scss']
})
export class UnauthorisedAccessComponent {
  authenticated = false;
  apprentice = false;
  constructor(){}
  // add auth0
  signIn = Auth0.signIn;
  getProfile = Auth0.getProfile;

  // redirect to login if not authenticated
  ngOnInit(): void {
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false) {
      this.signIn();
    }

    if (this.getProfile().name.includes('@qmul.ac.uk')) {
      this.apprentice = true;
    }
  }

}
