import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AiReport} from './ai-report.model';
import {AiReportApiService} from './ai-report-api.service';
import * as Auth0 from 'auth0-web';
import Chart from 'chart.js/auto';

@Component({
  selector: 'ai-report',
  templateUrl: './ai-report.component.html',
  styleUrls: ['./ai-report.component.scss'],
})
export class AiReportComponent implements OnInit, OnDestroy {
  aiReportListSubs: Subscription;
  aiReportList: AiReport[];
  empty = false;
  numSentences = 0;
  bearish = 0;
  bullish = 0;
  other = 0;
  chart: any;

  constructor(private aiReportApi: AiReportApiService) { }

  ngOnInit() {
    this.aiReportListSubs = this.aiReportApi
      .getAiReport()
      .subscribe(res => {
          this.aiReportList = res;
          this.createGraph(this.aiReportList);
        },
        console.error
      );
  }

  ngOnDestroy() {
    if(this.chart != null){
      this.chart.destroy();
    }
    this.aiReportListSubs.unsubscribe();
  }

  createGraph(aiReportList){
    this.resetInformation();
    aiReportList.forEach(report => {
      if(report.description == 'bearish') {
        this.bearish = this.bearish + 1;
      } else if(report.description == 'bullish') {
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