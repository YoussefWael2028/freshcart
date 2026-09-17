import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, signIn } from '../../../auth';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}
  private readonly _router = inject(Router);
 saveUserData = () => {
  let token = localStorage.getItem('token');
    if (token) {
      try {
        let decoded = jwtDecode(token);
        console.log(decoded);
      } catch (error) {
        this._router.navigate(['/signin'])
        localStorage.clear()
      }
    }
  }
  
  signUp(data: Auth): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }

  signIn(data: signIn): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }
  forgotPasswords = (email: any): Observable<any> => {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', email);
}

verifyResetCode = (code: any): Observable<any> => {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', code);
}

resetPassword = (newPass: any): Observable<any> => {
    return this._httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', newPass);
}
}


