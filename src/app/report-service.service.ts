import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  private baseUrl = 'https://numeropedia.onrender.com/api/v1/';
  dob = '';
  fullName = '';
  gender = '';
  mulankNumber = 4;
  destinyNumber = 8;
  constructor(private http: HttpClient) {}

  setInfo(fullName: string, dob: string, gender: string) {
    this.fullName = fullName;
    this.dob = dob;
    this.gender = gender;
    return `${this.fullName}, ${this.dob}, ${this.gender}`;
  }

  getReport(): Observable<any> {
    // console.log('In service');
    return this.http.get(`${this.baseUrl}numeroscope/DOB/${this.dob}`);
  }

  getNumeroTraits(pattern: any): Observable<any> {
    return this.http.get(`${this.baseUrl}numeroscope/${pattern}`);
  }

  getRajyog(pattern: any): Observable<any> {
    return this.http.get(`${this.baseUrl}numeroscope/rajyog/${pattern}`);
  }
}
