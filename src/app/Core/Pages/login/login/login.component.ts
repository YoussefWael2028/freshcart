import { AuthService } from '../../../../Shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  LoginForm: FormGroup;
  apiErrorMessage: string = '';
  callingAPI: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService, 
    private router: Router
  ) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    let token!:string;
    if (this.LoginForm.valid) {
      this.apiErrorMessage = '';
      this.callingAPI = true;
      this._authService.signIn(this.LoginForm.value).subscribe(
        (res) => {
          console.log(res);
          this.callingAPI = false;
          this.router.navigate(['/home']);
          token=res.token
          localStorage.setItem('token', token);
        },
        (err) => {
          console.error(err);
          this.apiErrorMessage = 'An error occurred. Please try again.';
          this.callingAPI = false;
        }
      );
    }
  }
}
