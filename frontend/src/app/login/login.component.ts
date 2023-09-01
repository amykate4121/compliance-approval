// import * as Auth0 from 'auth0-web';
// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Subscription} from 'rxjs';
// import {LoginApiService} from './login-api.service';

// @Component({
//   selector: 'login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })


// export class LoginComponent implements OnInit, OnDestroy {
//   examsListSubs: Subscription = new Subscription;
//   examsList: any;
//   authenticated = false;

//   constructor(private loginApi: LoginApiService) { }

//   signIn = Auth0.signIn;
//   signOut = Auth0.signOut;
//   getProfile = Auth0.getProfile;

//   ngOnInit() {
//     this.examsListSubs = this.loginApi
//       .getExams()
//       .subscribe(res => {
//           this.examsList = res;
//         },
//         console.error
//       );
//     const self = this;
//     Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
//   }

//   ngOnDestroy() {
//     this.examsListSubs.unsubscribe();
//   }
// }

import { Component } from '@angular/core';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // examsListSubs: Subscription = new Subscription;
  examsList: any;
  authenticated = false;

  constructor() { }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }
}