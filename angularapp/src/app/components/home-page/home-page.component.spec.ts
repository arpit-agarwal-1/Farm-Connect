import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_home_page_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_display_title_Farm_Connect_in_home_page_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('FarmConnect');
  });

  fit('Frontend_should_display_content_paragraph_in_home_page_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Success');
  });

  fit('Frontend_should_display_contact_us_section_in_home_page_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Contact Us');
  });
});
