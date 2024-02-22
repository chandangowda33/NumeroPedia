import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReportServiceService } from '../report-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  formData: {
    fullName: '';
    dob: '';
    gender: '';
  };

  constructor(
    private reportService: ReportServiceService,
    private router: Router
  ) {
    this.formData = { fullName: '', dob: '', gender: '' };
  }
  formSubmit(formDetails: NgForm) {
    if (!formDetails.valid) {
      alert('Please enter your details');
      return; // Stop execution if the form is not valid
    }

    console.log(
      this.reportService.setInfo(
        this.formData.fullName,
        this.formData.dob,
        this.formData.gender
      )
    );

    this.router.navigate(['/report']);
  }
}
