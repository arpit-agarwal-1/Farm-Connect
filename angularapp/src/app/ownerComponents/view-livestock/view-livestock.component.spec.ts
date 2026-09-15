import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewLivestockComponent } from './view-livestock.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ViewLivestockComponent', () => {
  let fixture: ComponentFixture<ViewLivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLivestockComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLivestockComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_livestock_component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_livestocks_exists_in_view_livestock_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Livestocks');
  });

  fit('Frontend_should_check_if_the_table_exists_in_view_livestock_component', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });

});
