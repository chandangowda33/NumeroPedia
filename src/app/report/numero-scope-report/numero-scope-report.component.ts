import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../report-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numero-scope-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numero-scope-report.component.html',
  styleUrls: ['./numero-scope-report.component.css', './mediaQueries.css'],
})
export class NumeroScopeReportComponent implements OnInit {
  [x: string]: any;
  IS492there: string[] = [];
  IS357there: string[] = [];
  IS816there: string[] = [];
  IS438there: string[] = [];
  IS951there: string[] = [];
  IS276there: string[] = [];
  numeroTraits: any[] = [];
  DOB: any;
  DOBArray: any;
  traitNo = 0;
  rajyogTraitNo = 0;
  rajyogTraits: any[] = [];
  IS456there: string[] = [];
  IS852there: string[] = [];

  birthYear: any;
  birthYearTotal: any;
  private subscription!: Subscription;
  dobSet: any;

  KuaNumber = function (DOB: string, gender: any) {
    let KuaNumber;
    const DOBArray = DOB.split('-');

    const birthYear = DOBArray[0].split('').map(Number);

    const birthYearTotal = birthYear
      .reduce((acc: any, currentValue: any) => acc + currentValue, 0)
      .toString()
      .split('')
      .map(Number)
      .reduce((acc: any, currentValue: any) => acc + currentValue, 0);
    if (gender == 'male') {
      KuaNumber = (11 - birthYearTotal)
        .toString()
        .split('')
        .map(Number)
        .reduce((acc: any, currentValue: any) => acc + currentValue, 0);
    } else {
      KuaNumber = (4 + birthYearTotal)
        .toString()
        .split('')
        .map(Number)
        .reduce((acc: any, currentValue: any) => acc + currentValue, 0);
    }
    return KuaNumber;
  };

  setPattern = (dobArray: any) => {
    if (dobArray.includes(1)) {
      this.IS816there.push('1');
      this.IS951there.push('1');
    }
    if (dobArray.includes(2)) {
      this.IS276there.push('2');
      this.IS492there.push('2');
      this.IS852there.push('2');
    }
    if (dobArray.includes(3)) {
      this.IS357there.push('3');
      this.IS438there.push('3');
    }
    if (dobArray.includes(4)) {
      this.IS438there.push('4');
      this.IS492there.push('4');
      this.IS456there.push('4');
    }
    if (dobArray.includes(5)) {
      this.IS357there.push('5');
      this.IS951there.push('5');
      this.IS456there.push('5');
      this.IS852there.push('5');
      // this.IS951there.push('5');
    }
    if (dobArray.includes(6)) {
      this.IS276there.push('6');
      this.IS816there.push('6');
      this.IS456there.push('6');
    }
    if (dobArray.includes(7)) {
      this.IS276there.push('7');
      this.IS357there.push('7');
    }
    if (dobArray.includes(8)) {
      this.IS816there.push('8');
      this.IS438there.push('8');
      this.IS852there.push('8');
    }
    if (dobArray.includes(9)) {
      this.IS951there.push('9');
      this.IS492there.push('9');
    }
    // console.log(this.IS276there);
    // console.log(this.IS357there);
    // console.log(this.IS438there);
    // console.log(this.IS492there);
    // console.log(this.IS816there);
    // console.log(this.IS951there);
  };

  increaseTraitNo = (trait: string) => {
    if (trait == 'numerotrait') {
      if (this.traitNo < this.numeroTraits.length - 1) this['traitNo']++;
    }
    if (trait == 'rajyog') {
      if (this.rajyogTraitNo < this.rajyogTraits.length - 1)
        this['rajyogTraitNo']++;
    }
  };

  decreaseTraitNo = (trait: string) => {
    if (trait == 'numerotrait') {
      if (this.traitNo > 0) this['traitNo']--;
    }
    if (trait == 'rajyog') {
      if (this.rajyogTraitNo > 0) this['rajyogTraitNo']--;
    }
  };

  setNumeroPattern = (pattern: string, trait: string) => {
    if (trait == 'numeroTrait') {
      this.subscription = this.reportService.getNumeroTraits(pattern).subscribe(
        (data: any) => {
          this.numeroTraits.push(...data.result.qualities);
        },
        (error: any) => {
          console.error('Error fetching API data:', error);
        }
      );
    }
    if (trait == 'rajyogTrait') {
      this.subscription = this.reportService.getRajyog(pattern).subscribe(
        (data: any) => {
          this.rajyogTraits.push(data.result.quality);
        },
        (error: any) => {
          console.error('Error fetching API data:', error);
        }
      );
    }
  };

  checkpattern = () => {
    if (this.IS276there.length > 0) {
      this.setNumeroPattern(this.IS276there.join(), 'numeroTrait');
    }
    if (this.IS492there.length > 0) {
      this.setNumeroPattern(this.IS492there.join(), 'numeroTrait');
    }
    if (this.IS816there.length > 0) {
      this.setNumeroPattern(this.IS816there.join(), 'numeroTrait');
    }
    if (this.IS951there.length > 0) {
      this.setNumeroPattern(this.IS951there.join(), 'numeroTrait');
    }
    if (this.IS357there.length > 0) {
      this.setNumeroPattern(this.IS357there.join(), 'numeroTrait');
    }
    if (this.IS438there.length > 0) {
      this.setNumeroPattern(this.IS438there.join(), 'numeroTrait');
    }
  };

  checkRajyog = () => {
    // console.log(this.IS951there);
    if (this.IS816there.length === 3) {
      this.setNumeroPattern(this.IS816there.join(), 'rajyogTrait');
    }
    if (this.IS951there.length === 3) {
      this.setNumeroPattern(this.IS951there.join(), 'rajyogTrait');
    }
    if (this.IS456there.length === 3) {
      this.setNumeroPattern(this.IS456there.join(), 'rajyogTrait');
    }
    if (this.IS852there.length === 3) {
      this.setNumeroPattern(this.IS852there.join(), 'rajyogTrait');
    }
  };

  constructor(private reportService: ReportServiceService) {}

  ngOnInit(): void {
    const KuaNumber = this.KuaNumber(
      this.reportService.dob,
      this.reportService.gender
    );
    this.DOB = this.reportService.dob.replaceAll('-', '').split('').map(Number);
    this.DOB.push(KuaNumber);
    this.DOB.push(this.reportService.mulankNumber);
    this.DOB.push(this.reportService.destinyNumber);
    this.dobSet = new Set([...this.DOB]);
    this.DOBArray = Array.from(this.dobSet);
    // console.log(this.DOBArray);
    this.setPattern(this.DOBArray);
    this.checkpattern();
    this.checkRajyog();
  }
}
