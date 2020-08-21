import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, ProductCategory, GetResponseProduct, GetResponseProductCategory } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = 'http://localhost:8080/api/product-category';
    return this.httpClient.get<GetResponseProductCategory>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
      );
  }

  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyword: string
  ): Observable<GetResponseProduct> {
    const searchUrl =
      'http://localhost:8080/api/products/search/findByNameContaining?name=' +
      keyword +
      '&page=' +
      page +
      '&size=' +
      pageSize;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
      );
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = 'http://localhost:8080/api/products/' + theProductId;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(page: number, pageSize: number, id: number): Observable<GetResponseProduct> {

    // need to build  URL based on category Id, page and page size
    const searchUrl = 'http://localhost:8080/api/products/search/findByCategoryId?id=' + +id
                      + '&page=' + page + '&size=' + pageSize;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

}
