import { Component, OnInit } from '@angular/core';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
// when user first opens page they are shown a loading page
export class LoadingPageComponent implements OnInit {
  signIn = Auth0.signIn;

  // redirect user to log in page
  constructor() {}
  ngOnInit(): void {
    this.signIn();
  }
}