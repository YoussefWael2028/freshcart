import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) { }

getAllProducts(brandId?: string): Observable<any> {
  let url = 'https://ecommerce.routemisr.com/api/v1/products';
  if (brandId) {
    url += `?brand=${brandId}`;
  }
  return this._httpClient.get(url);
}
  getProduct(id:string): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}
