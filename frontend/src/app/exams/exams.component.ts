import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';
import * as Auth0 from 'auth0-web';
import Chart from 'chart.js/auto';

@Component({
  selector: 'exams',
  templateUrl: './exam.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs: Subscription;
  examsList: Exam[];
  empty = false;
  numSentences = 0;
  bearish = 0;
  bullish = 0;
  other = 0;
  chart: any;

  constructor(private examsApi: ExamsApiService) { }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
          this.createGraph(this.examsList);
        },
        console.error
      );
  }

  ngOnDestroy() {
    if(this.chart != null){
      this.chart.destroy();
    }
    this.examsListSubs.unsubscribe();
  }

  createGraph(examsList){
    this.resetInformation();
    examsList.forEach(exam => {
      if(exam.description == 'bearish') {
        this.bearish = this.bearish + 1;
      } else if(exam.description == 'bullish') {
        this.bullish = this.bullish + 1;
      } else {
        this.other = this.other + 1;
      }
  })

  const fineSentences = this.numSentences - this.bullish - this.bearish - this.other;
  this.createChart();
  }

  countNumSentences(fullReportContent: string){
    this.numSentences = fullReportContent.match(new RegExp("\\.", "g")).length;
  }

  createChart(){
    const fineSentences = this.numSentences - this.bullish - this.bearish - this.other;
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Good', 'Bearish','Bullish','Other'],
	       datasets: [{
    label: 'Report',
    data: [fineSentences, this.bearish, this.bullish, this.other],
    backgroundColor: [
      'green',
      'red',
      'orange',
			'yellow',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio:3
      }

    });
  }

  resetInformation(){
    if(this.chart != null){
      this.chart.destroy();
    }
    this.bearish = 0;
    this.bullish = 0;
    this.other = 0;
  }

}