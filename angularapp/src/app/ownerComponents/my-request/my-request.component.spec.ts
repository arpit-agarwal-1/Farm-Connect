import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyRequestComponent } from './my-request.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MyRequestComponent', () => {
  let fixture: ComponentFixture<MyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyRequestComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_my_request_component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_my_requests_exists_in_my_request_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My Requests');
  });

});
