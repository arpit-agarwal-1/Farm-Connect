import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  fit('Frontend_should_create_error_page_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_exists_in_error_page_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Oops! Something Went Wrong');
  });

  fit('Frontend_should_check_if_the_paragraph_exists_in_error_page_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Please try again later.');
  });
});
