import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit{
  signIn = Auth0.signIn;

  constructor(public auth: AuthService) { }
  // when the loading page loads, the user is automatically redirected to the auth0 log in page
  ngOnInit(): void {
    this.signIn();
  }
}
