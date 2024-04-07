import * as Auth0 from 'auth0-web';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  name = '';
  constructor(private router: Router) { }
  getProfile = Auth0.getProfile

  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback((err) => {
      if (err){
        alert(err);
      }
      let name = this.getProfile().name;
      if (name.includes('@qmul.ac.uk')){
        self.router.navigate(['/text-editor']);
      } else {
        self.router.navigate(['/approval-page']);
      }
    });
  }
}