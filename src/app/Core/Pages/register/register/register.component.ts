import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; 
import { AuthService } from '../../../../Shared/services/auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiErrorMessage: string = '';
  callingAPI: boolean = false;
  constructor(private fb: FormBuilder ,
    private _authService: AuthService, 
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,20}$')]],
      rePassword: ['', Validators.required],
      phone: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  register() {
    if (this.registerForm.valid) {
      this.apiErrorMessage = '';
      this.callingAPI = true;
      this._authService.signUp(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);
          this.callingAPI = false;
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error(err);
          this.apiErrorMessage = 'An error occurred. Please try again.';
          this.callingAPI = false;
        }
      );
    }
  }
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('rePassword')!.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
