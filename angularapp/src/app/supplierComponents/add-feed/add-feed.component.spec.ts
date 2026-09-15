import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddFeedComponent } from './add-feed.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddFeedComponent', () => {
  let component: AddFeedComponent;
  let fixture: ComponentFixture<AddFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFeedComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_add_feed_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_add_new_feed_exists_in_add_feed_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Add New Feed');
  });

});
