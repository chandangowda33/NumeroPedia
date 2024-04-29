import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  private baseUrl = 'https://numeropedia.onrender.com/api/v1/';
  // private baseUrl = '127.0.0.1:3000/api/v1/';

  dob = '1998-06-19';
  fullName = 'Chandan';
  gender = 'male';
  mulankNumber: Number | undefined;
  destinyNumber: Number | undefined;

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

  getCombination(): Observable<any> {
    const pattern = this.mulankNumber + '&' + this.destinyNumber;

    return this.http.get(`${this.baseUrl}numeroscope/combination/${pattern}`);
  }
}
