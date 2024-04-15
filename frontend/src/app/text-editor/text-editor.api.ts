import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { API_URL } from '../env';
import * as Auth0 from 'auth0-web';
import { AiReport } from '../ai-report/ai-report.model';

@Injectable()
// links to the backend
export class TextEditorApi {
  constructor(public http: HttpClient) {}
  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(
      () => err.message || 'Error: Unable to complete request.'
    );
  }

  // save the full content to the backend, to then run the ai model, ensure user is authorised to post
  saveBodyForAiReport(aiReport: AiReport): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`,
      }),
    };
    return this.http.post(`${API_URL}/ai-report`, aiReport, httpOptions);
  }
}
