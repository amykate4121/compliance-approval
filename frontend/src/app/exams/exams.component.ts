// import * as Auth0 from 'auth0-web';
// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Subscription} from 'rxjs';
// import {Exam} from './exam.model';
// import { TextEditorApi } from '../text-editor/text-editor.api';

// @Component({
//   selector: 'app-exams-component',
//   templateUrl: './exam.component.html',
//   styleUrls: ['./exams.component.scss'],
// })
// export class ExamsComponent implements OnInit, OnDestroy {
//     examsListSubs: Subscription;
//     examsList: Exam[];
//     authenticated = false;
  
//     constructor(private textEditorApi: TextEditorApi) { }
  
//     signIn = Auth0.signIn;
//     signOut = Auth0.signOut;
//     getProfile = Auth0.getProfile;
  
//     ngOnInit() {
//       this.examsListSubs = this.textEditorApi
//         .getExams()
//         .subscribe(res => {
//             this.examsList = res;
//           },
//           console.error
//         );
//       const self = this;
//       Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
//     }
  
//     ngOnDestroy() {
//       this.examsListSubs.unsubscribe();
//     }
//   }



import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'exams',
  templateUrl: './exam.component.html',
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs: Subscription;
  examsList: Exam[];
  authenticated = false;

  constructor(private examsApi: ExamsApiService) { }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
        },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }
}