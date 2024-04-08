import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';
import {API_URL} from '../env';
import {AiReport} from './ai-report.model';
import { catchError } from 'rxjs/operators';
import * as Auth0 from 'auth0-web';

@Injectable()
export class AiReportApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => (err.message || 'Error: Unable to complete request.'));
    
  }

  // GET list of public, future events
  getAiReport(): Observable<AiReport[]> {
    return this.http
      .get<AiReport[]>(`${API_URL}/exams`)
      .pipe(catchError(AiReportApiService._handleError));
  }
}