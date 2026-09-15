import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  formData = {
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  };

  error = '';
  submitting = false;

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit(form: NgForm, dialogTemplate: any): void {
    if (form.invalid || this.formData.password !== this.formData.confirmPassword) {
      form.control.markAllAsTouched();
      return;
    }

    this.error = '';
    this.submitting = true;

    this.authService.forgotPassword({
      email:this.formData.email,
      mobile:this.formData.mobileNumber,
      newPassword:this.formData.password
    }).subscribe({
      next: (res: any) => {
        this.submitting = false;
        this.openSuccessPopUp(dialogTemplate);
      },
      error: (err) => {
        this.submitting = false;
        this.error = 'Update failed. Check your details.';
      }
    });
  }

  openSuccessPopUp(template: any): void {
    const dialogRef = this.dialog.open(template, {
      width: '320px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
