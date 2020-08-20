import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductList(id: number): Observable<Product[]> {

    // need to build  URL based on category Id
    const searchUrl = 'http://localhost:8080/api/products/search/findByCategoryId?id=' + +id;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = 'http://localhost:8080/api/product-category';
    return this.httpClient.get<GetResponseProductCategory>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
      );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = 'http://localhost:8080/api/products/search/findByNameContaining?name=' + keyword;
    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
      );
  }

}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
