import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': typeof window !== 'undefined' ? (localStorage.getItem('token') ?? '') : ''
    });
  }

  placeCashOrder(cartId: string, shippingAddress: ShippingAddress): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, { headers: this.getHeaders() });
  }
}
