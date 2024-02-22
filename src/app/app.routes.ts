import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { NumeroScopeReportComponent } from './report/numero-scope-report/numero-scope-report.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'report', component: ReportComponent },
  { path: 'numoReport', component: NumeroScopeReportComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
