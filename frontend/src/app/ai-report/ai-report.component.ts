import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AiReport } from './ai-report.model';
import { AiReportApiService } from './ai-report-api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'ai-report',
  templateUrl: './ai-report.component.html',
  styleUrls: ['./ai-report.component.scss'],
})
// the ai report panel
export class AiReportComponent implements OnInit, OnDestroy {
  // subscribe to monitor the ai report backend
  aiReportListSubs: Subscription;
  aiReportList: AiReport[];

  // track the information to display in the graph
  numSentences = 0;
  bearish = 0;
  bullish = 0;
  other = 0;
  fineSentences = 0;
  chart: any;

  constructor(private aiReportApi: AiReportApiService) {}

  // get the ai report from the backend
  ngOnInit() {
    this.aiReportListSubs = this.aiReportApi.getAiReport().subscribe((res) => {
      this.aiReportList = res;
      this.createGraph(this.aiReportList);
    }, console.error);
  }

  // destroy the graph and unsubscribe on close
  ngOnDestroy() {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.aiReportListSubs.unsubscribe();
  }

  // graph the information from the ai report
  // track how many sentences fall into each category of the report
  createGraph(aiReportList) {
    this.resetInformation();
    aiReportList.forEach((report) => {
      if (report.description == 'bearish') {
        this.bearish = this.bearish + 1;
      } else if (report.description == 'bullish') {
        this.bullish = this.bullish + 1;
      } else {
        this.other = this.other + 1;
      }
    });

    this.fineSentences =this.numSentences - this.bullish - this.bearish - this.other;
    this.createChart();
  }


  // create a donut chart to visually highlight this information
  createChart() {
    this.chart = new Chart('AiReportChart', {
      type: 'doughnut', 
      data: {
        // values on X-Axis
        labels: ['Good', 'Bearish', 'Bullish', 'Other'],
        datasets: [
          {
            label: 'Report',
            data: [this.fineSentences, this.bearish, this.bullish, this.other],
            backgroundColor: ['green', 'red', 'orange', 'yellow'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: 3,
      },
    });
  }

  // reset the information when creating the new chart
  resetInformation() {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.bearish = 0;
    this.bullish = 0;
    this.other = 0;
    this.fineSentences = 0;
  }

  // find the number of sentences in the body
  countNumSentences(fullReportContent: string) {
    this.numSentences = fullReportContent.match(new RegExp('\\.', 'g')).length;
  }
}
