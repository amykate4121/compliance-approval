import { TestBed } from '@angular/core/testing';

import { RequestDownloadService } from './request-download.service';

describe('RequestDownloadApproval', () => {
  let service: RequestDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
