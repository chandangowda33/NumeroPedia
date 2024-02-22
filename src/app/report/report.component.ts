import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportServiceService } from '../report-service.service';
import { CommonModule } from '@angular/common';
import { NumeroScopeReportComponent } from './numero-scope-report/numero-scope-report.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  imports: [CommonModule, NumeroScopeReportComponent, LoadingSpinnerComponent],
})
export class ReportComponent implements OnInit {
  report: any;
  userInfo: any;
  fullname: any;
  dob: any;
  gender: any;
  pros: any;
  cons: any;
  neutral: any;
  key: any;
  remedies: any;
  private subscription!: Subscription;

  constructor(private reportService: ReportServiceService) {}

  ngOnInit(): void {
    this.fullname = this.reportService.fullName;
    let dateString = this.reportService.dob.split('-');
    this.dob = dateString.reverse().join('-');
    this.gender = this.reportService.gender.toUpperCase();

    this.subscription = this.reportService.getReport().subscribe(
      (data: any) => {
        this.report = data;
        this.pros = this.report.mulankQualities.pros;
        this.cons = this.report.mulankQualities.cons;
        this.neutral = this.report.mulankQualities.neutral;

        this.reportService.mulankNumber = this.report.mulankNumber;
        this.reportService.destinyNumber = this.report.destinyNumber;
        // console.log(this.pros);
      },
      (error: any) => {
        console.error('Error fetching API data:', error);
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
