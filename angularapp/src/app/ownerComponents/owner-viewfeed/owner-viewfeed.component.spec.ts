import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OwnerViewfeedComponent } from './owner-viewfeed.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('OwnerViewfeedComponent', () => {
  let fixture: ComponentFixture<OwnerViewfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerViewfeedComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerViewfeedComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_owner_viewfeed_component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_available_feeds_exists_in_owner_viewfeed_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Available Feeds');
  });

  
  fit('Frontend_should_check_if_the_table_exists_owner_viewfeed_component', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });

});
