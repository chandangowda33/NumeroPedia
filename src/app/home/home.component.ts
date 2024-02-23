import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReportServiceService } from '../report-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  formData: {
    fullName: '';
    dob: '';
    gender: '';
  };
  title: string = 'home';
  imageLoaded = false;

  constructor(
    private reportService: ReportServiceService,
    private router: Router,
    private titleService: Title
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
  ngOnInit() {
    this.titleService.setTitle('NumeroPedia| Home');
  }
  onImageLoad() {
    this.imageLoaded = true;
  }
}
