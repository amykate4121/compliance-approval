import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AiReportApiService } from './ai-report-api.service';
import { AiReport } from './ai-report.model';
import { of } from 'rxjs';

// check interaction with ai backend
describe('AiReportApi', () => {
  let api: AiReportApiService;
  let http: jasmine.SpyObj<HttpClient>;;


  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    api = new AiReportApiService(http);
  });

  // check api is created
  it('should create', () => {
    expect(api).toBeTruthy();
  });

  // ensure that report is got from backend
  it('should send a POST request to the server', () => {
    const report: AiReport[] = [
      { sentence: 'Sentence 1', description: 'Description 1', fullBody: 'Full Body 1' },
      { sentence: 'Sentence 2', description: 'Description 2', fullBody: 'Full Body 2' },
    ];

    http.get.and.returnValue(of(report));

    api.getAiReport().subscribe((reports: AiReport[]) => {
      expect(reports.length).toBe(2);
      expect(reports).toEqual(report);
    });

    expect(http.get).toHaveBeenCalled();
  });
});

