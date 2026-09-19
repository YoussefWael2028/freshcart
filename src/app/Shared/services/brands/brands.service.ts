import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private _httpClient: HttpClient) {}

  getAllBrands(){
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  getBrand(id:string){
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)

}
}
