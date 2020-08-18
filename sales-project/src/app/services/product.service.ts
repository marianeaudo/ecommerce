import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(id: number): Observable<Product[]> {

    // need to build  URL based on category Id
    const searchUrl = this.baseUrl + '/search/findByCategoryId?id=' + +id;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
      );
  }

}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
