import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { API_URL } from '../env';
import { AiReport } from './ai-report.model';
import { catchError } from 'rxjs/operators';

// generate the ai report info page
@Injectable()
export class AiReportApiService {
  constructor(public http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(
      () => err.message || 'Error: Unable to complete request.'
    );
  }

  // get the ai report from the backend
  getAiReport(): Observable<AiReport[]> {
    return this.http
      .get<AiReport[]>(`${API_URL}/ai-report`)
      .pipe(catchError(AiReportApiService._handleError));
  }
}
