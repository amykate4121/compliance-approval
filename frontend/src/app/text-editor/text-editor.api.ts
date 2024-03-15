import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';
import {API_URL} from '../env';
import { catchError } from 'rxjs/operators';
// import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import * as Auth0 from 'auth0-web';
import { TextEditor } from './text-editor.model';
// AMY EDIT HERE
@Injectable()
export class TextEditorApi {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => (err.message || 'Error: Unable to complete request.'));
    
  }

  // GET list of public, future events
  getExams(): Observable<TextEditor[]> {
    return this.http
      .get<TextEditor[]>(`${API_URL}/exams`)
      .pipe(catchError(TextEditorApi._handleError));
  }

  saveExam(exam: TextEditor): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .post(`${API_URL}/exams`, exam, httpOptions);
  }
}