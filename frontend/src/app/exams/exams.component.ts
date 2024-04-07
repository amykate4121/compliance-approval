import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'exams',
  templateUrl: './exam.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs: Subscription;
  examsList: Exam[];
  empty = false;

  constructor(private examsApi: ExamsApiService) { }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
        },
        console.error
      );
    
    if(this.examsList.length == 0){
      this.empty = true
    }
    // save empty is examlist length = 0
  }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }
}