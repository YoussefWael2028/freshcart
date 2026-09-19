import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': typeof window !== 'undefined' ? (localStorage.getItem('token') ?? '') : ''
    });
  }

  getWishlist(): Observable<any> {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: this.getHeaders() })
      .pipe(catchError((error) => {
        console.error('Error fetching wishlist:', error);
        return throwError(error);
      }));
  }

  addToWishlist(productId: string): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers: this.getHeaders() })
      .pipe(catchError((error) => {
        console.error('Error adding to wishlist:', error);
        return throwError(error);
      }));
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: this.getHeaders() })
      .pipe(catchError((error) => {
        console.error('Error removing from wishlist:', error);
        return throwError(error);
      }));
  }
}
