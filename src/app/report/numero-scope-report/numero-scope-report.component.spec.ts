import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroScopeReportComponent } from './numero-scope-report.component';

describe('NumeroScopeReportComponent', () => {
  let component: NumeroScopeReportComponent;
  let fixture: ComponentFixture<NumeroScopeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumeroScopeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumeroScopeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
