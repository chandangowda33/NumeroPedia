import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportServiceService } from '../report-service.service';
import { CommonModule } from '@angular/common';
import { NumeroScopeReportComponent } from './numero-scope-report/numero-scope-report.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CombinationComponent } from './combination/combination.component';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', './mediaQueries.css'],
  imports: [
    CommonModule,
    NumeroScopeReportComponent,
    LoadingSpinnerComponent,
    CombinationComponent,
  ],
})
export class ReportComponent implements OnInit {
  title: string = 'Your Report';
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
  noDetailsErrorMsg: string = '';
  private subscription!: Subscription;
  imageLoaded = false;

  constructor(
    private reportService: ReportServiceService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('NumeroPedia| Home');
    if (
      this.reportService.dob == '' ||
      this.reportService.fullName == '' ||
      this.reportService.gender == ''
    ) {
      this.noDetailsErrorMsg = 'Please enter your details in home page';
    } else {
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
  }
  ngOnDestroy() {
    if (this.noDetailsErrorMsg === '') {
      // Unsubscribe to avoid memory leaks
      this.subscription.unsubscribe();
    }
  }

  navigateToHome() {
    console.log('clicked');
    this.router.navigate(['/home']);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
