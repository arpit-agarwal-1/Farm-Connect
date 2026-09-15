import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LivestockFormComponent } from './livestock-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LivestockFormComponent', () => {
  let component: LivestockFormComponent;
  let fixture: ComponentFixture<LivestockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivestockFormComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_livestock_form_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_add_new_livestock_exists_in_livestock_form_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Add New Livestock');
  });

});
