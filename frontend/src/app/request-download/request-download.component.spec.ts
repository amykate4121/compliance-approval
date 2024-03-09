import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDownloadComponent } from './request-download.component';

describe('RequestApprovalComponent', () => {
  let component: RequestDownloadComponent;
  let fixture: ComponentFixture<RequestDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDownloadComponent]
    });
    fixture = TestBed.createComponent(RequestDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
