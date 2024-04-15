import { AiReportComponent } from './ai-report.component';
import { AiReportApiService } from './ai-report-api.service';
import { Subscription } from 'rxjs';
import { AiReport } from './ai-report.model';

// check side panel opens and behaves as expected
describe('AiReportComponent', () => {
  let component: AiReportComponent;
  let api: AiReportApiService;

  beforeEach(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    api = new AiReportApiService(httpClient);
    component = new AiReportComponent(api);
    component.createChart = () => {};
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check side panel closes
  it('should destroy side panel', () => {
    component.aiReportListSubs = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]) as unknown as Subscription;
    component.ngOnDestroy();
    expect(component.aiReportListSubs.unsubscribe).toHaveBeenCalled();
  });

  // check the graph is generated successfully
  it('should create a graph showing the findings of the AI report', () => {
    let fullReport = 'sentence1. sentence2. sentence3. sentence4. sentence5.';
    component.countNumSentences(fullReport);
    expect(component.numSentences).toEqual(5);

    let aiReport: AiReport[] = [
      {
        sentence: 'sentence1',
        description: 'bullish',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence2',
        description: 'bearish',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence3',
        description: 'organization',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence4',
        description: 'name',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
    ];
    component.createGraph(aiReport);

    expect(component.bearish).toEqual(1);
    expect(component.bullish).toEqual(1);
    expect(component.other).toEqual(2);
    expect(component.fineSentences).toEqual(1);
    expect(component.chart).not.toBeNull();
  });

  // test the information resets
  it('should reset the information', () => {
    // FIRST POPULATE THE VALUES TO ENSURE IT ACTUALLY RESETS
    let fullReport = 'sentence1. sentence2. sentence3. sentence4. sentence5.';
    component.countNumSentences(fullReport);

    let aiReport: AiReport[] = [
      {
        sentence: 'sentence1',
        description: 'bullish',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence2',
        description: 'bearish',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence3',
        description: 'organization',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
      {
        sentence: 'sentence4',
        description: 'name',
        fullBody: 'sentence1. sentence2. sentence3. sentence4. sentence5.',
      },
    ];
    component.createGraph(aiReport);

    expect(component.bearish).toEqual(1);
    expect(component.bullish).toEqual(1);
    expect(component.other).toEqual(2);
    expect(component.fineSentences).toEqual(1);

    // reset the information
    component.resetInformation();
    expect(component.bearish).toEqual(0);
    expect(component.bullish).toEqual(0);
    expect(component.other).toEqual(0);
    expect(component.fineSentences).toEqual(0);
  });
});
