import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { By } from '@angular/platform-browser';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [ FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_forgot_password_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Forgot_Password_word_exists_in_forgot_password_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Forgot Password');
  });

  fit('Frontend_should_check_if_the_Email_input_field_exists_in_forgot_password_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Mobile_Number_input_field_exists_in_forgot_password_component', () => {
    const mobileInput = fixture.debugElement.query(By.css('input[placeholder="Mobile Number"]')).nativeElement;
    expect(mobileInput).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_New_Password_input_field_exists_in_forgot_password_component', () => {
    const newPasswordInput = fixture.debugElement.query(By.css('input[placeholder="New Password"]')).nativeElement;
    expect(newPasswordInput).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Confirm_Password_input_field_exists_in_forgot_password_component', () => {
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[placeholder="Confirm Password"]')).nativeElement;
    expect(confirmPasswordInput).toBeTruthy();
  });
});