// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { AuthServiceService } from './auth.service';
// import { Observable } from 'rxjs';
// import * as Auth0 from 'auth0-web';

// @Injectable({
//   providedIn: 'root'
// })

// // export class AuthGuard2 implements CanActivateFn {
// //   constructor(private auth:AuthServiceService, private router:Router){}
// //   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
// //     if (this.auth.IsLoggedIn()){
// //       return true;
// //     }
// //     this.router.navigate(['/']);
// //     return false;
// //   }
// // };

// export class AuthGuard {

//   constructor(private auth:AuthServiceService, private router:Router) { }
  
//   canActivate(
//    route: ActivatedRouteSnapshot,
//    state: RouterStateSnapshot): 
//    Observable<boolean | UrlTree> 
//    | Promise<boolean | UrlTree> 
//    | boolean 
//    | UrlTree {
//     if (Auth0.isAuthenticated()){
//       return true;
//     }
//     this.router.navigate(['/']);
//     return false;
//   }
  
//    }
