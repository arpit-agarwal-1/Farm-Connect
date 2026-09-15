
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };

  error = '';
  submitting = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStorage: AuthStorageService
  ) { }


  onLogin(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }


    this.error = '';
    this.submitting = true;

    this.authService.login(this.formData).subscribe({
      next: (res: any) => {
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('role', res.role);
        // localStorage.setItem('userId', res.id);
        // localStorage.setItem('userName', res.username);
        // localStorage.setItem('email', res.email);

        this.authStorage.setItem('token', res.token);
        this.authStorage.setItem('role', res.role);
        this.authStorage.setItem('userId', res.id);
        this.authStorage.setItem('userName', res.username);
        this.authStorage.setItem('email', res.email);


        if (res.role === 'Owner') {
          this.router.navigate(['/view-livestock']);
        } else if (res.role === 'Supplier') {
          this.router.navigate(['/view-feed']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.submitting = false;
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login Error:', err);
      }
    });
  }
}



