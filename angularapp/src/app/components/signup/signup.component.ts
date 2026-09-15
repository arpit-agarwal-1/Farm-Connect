import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('successModal') successModal!: TemplateRef<any>;
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  error="";

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required,Validators.minLength(3), Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]*$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^\S+$/)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmControl = form.get('confirmPassword');
    if (!confirmControl) return null;

    if (password !== confirmControl.value) {
      confirmControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (confirmControl.hasError('mismatch')) confirmControl.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.error ='';
      this.authService.register(this.signupForm.value).subscribe({
        next: (response: any) => {
          const dialogRef = this.dialog.open(this.successModal, {
            width: '320px',
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetFormAndNavigate();
          });
        },
        error: (err: any) => { 
          console.error("Signup Failed:", err);
          this.error="Registration failed. Please try again later.";
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  private resetFormAndNavigate() {
    this.signupForm.reset(); 
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
    this.router.navigate(['/login']);
  }
}
