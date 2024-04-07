// import { Component, OnInit } from '@angular/core';
// import * as Auth0 from 'auth0-web';
// import {Router} from "@angular/router";

// @Component({
//   selector: 'home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit{
//   authenticated = false;
//   constructor(private router: Router) { }

//   signIn = Auth0.signIn;
//   signOut = Auth0.signOut;
//   getProfile = Auth0.getProfile;
  

//   ngOnInit(): void {
//     Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
//   }

//   navigate(): void{
//     this.router.navigate(['/text-editor']);
//   }
// }
