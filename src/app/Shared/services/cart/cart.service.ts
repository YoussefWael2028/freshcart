import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount$ = new BehaviorSubject<number>(0);

  constructor(private _httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': typeof window !== 'undefined' ? (localStorage.getItem('token') ?? '') : ''
    });
  }

  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers: this.getHeaders() })
      .pipe(
        tap((res: any) => this.cartCount$.next(res.numOfCartItems)),
        catchError((error) => {
          console.error('Error adding product to cart:', error);
          return throwError(error);
        })
      );
  }
updateProductCount(id: string, count: number): Observable<any> {
  return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers: this.getHeaders() })
    .pipe(
      tap((res: any) => this.cartCount$.next(res.numOfCartItems)),
      catchError((error) => {
        console.error('Error updating product count:', error);
        return throwError(error);
      })
    );
}
  getCartInfo(): Observable<any> {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: this.getHeaders() })
      .pipe(
        tap((res: any) => this.cartCount$.next(res.numOfCartItems)),
        catchError((error) => {
          console.error('Error fetching cart info:', error);
          return throwError(error);
        })
      );
  }

  DeleteProduct(id: string): Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap((res: any) => this.cartCount$.next(res.numOfCartItems)),
        catchError((error) => {
          console.error('Error deleting product from cart:', error);
          return throwError(error);
        })
      );
  }
}
