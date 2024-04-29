import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'report', component: ReportComponent },
  // { path: 'comReport', component: CombinationComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
