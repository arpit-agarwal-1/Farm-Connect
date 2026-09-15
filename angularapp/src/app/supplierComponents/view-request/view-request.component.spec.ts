import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewRequestComponent } from './view-request.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ViewRequestComponent', () => {
  let fixture: ComponentFixture<ViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRequestComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_request_component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_requests_exists_in_view_request_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Requests');
  });

  fit('Frontend_should_check_if_the_table_exists_in_view_request_component', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });
});
