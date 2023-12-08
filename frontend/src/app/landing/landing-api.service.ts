import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { throwError } from 'rxjs';
import {API_URL} from '../env';

@Injectable()
export class ExamsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // // GET list of public, future events
  // getExams(): Observable<Object> {
  //   return this.http.get(`${API_URL}/exams`)
  //   // catchError(ExamsApiService._handleError);
  // }

}