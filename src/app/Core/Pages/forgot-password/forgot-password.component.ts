import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  ForgotPassword: FormGroup;
  apiErrorMessage: string = '';
  callingAPI: boolean = false;
  step = 1
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService, 
    private router: Router
  ) {
    this.ForgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  verifyResetCode: FormGroup = this.fb.group({
    resetCode: [null, Validators.required]
  })
  
  resetPassword: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, Validators.required]
  })
  

  submitStep1 = () => {
    this.callingAPI = true;
    if (this.ForgotPassword.valid) {
      this._authService.forgotPasswords(this.ForgotPassword.value).subscribe({
        next: (res) => {
          this.step = 2;
          this.callingAPI = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.apiErrorMessage = err.error.message;
          this.callingAPI = false;
        }
      });
    }
  }
 
  submitStep2 = () => {
    this.callingAPI = true;
    if (this.verifyResetCode.valid) {
      this._authService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.step = 2;
          this.callingAPI = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.apiErrorMessage = err.error.message;
          this.callingAPI = false;
        }
      });
    }
  }

  submitStep3 = () => {
    this.callingAPI = true;
    if (this.resetPassword.valid) {
      this._authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.step = 3;
          localStorage.setItem('token', res.token);
          this._authService.saveUserData();
          this.router.navigate(['/home']);

          this.callingAPI = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.apiErrorMessage = err.error.message;
          this.callingAPI = false;
        }
      });
    }
  }
}