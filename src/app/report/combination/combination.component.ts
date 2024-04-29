import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../report-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [],
  templateUrl: './combination.component.html',
  styleUrl: './combination.component.css',
})
export class CombinationComponent implements OnInit {
  private subscription!: Subscription;
  report: any;

  constructor(private reportService: ReportServiceService) {}

  ngOnInit() {
    this.subscription = this.reportService
      .getCombination()
      .subscribe((data: any) => {
        this.report = data;
      });
  }
}
