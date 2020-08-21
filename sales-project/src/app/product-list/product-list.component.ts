import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, GetResponseProduct } from '../model/models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean = false;
  subscriptions: Subscription[] = [];
  previsouKeyword: string = null;

  // new properties for pagination

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeSubscription: Subscription = this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      }
    );
    this.subscriptions.push(routeSubscription);
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts(): void {
    // Check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string, convert string to number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      // not category "id" available ...default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Check if we have a different category than previous

    // if we have a different category id than previous
    // then set pageNumber to 1
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    const productsSubscription: Subscription = this.productService
      .getProductListPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe((data: GetResponseProduct) => {
        this.products = data._embedded.products;
        this.pageSize = data.page.size;
        this.pageNumber = data.page.number + 1;
        this.totalElements = data.page.totalElements;
      });
    this.subscriptions.push(productsSubscription);
  }

  handleSearchProducts(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // the set the pageNumber to 1

    if (keyword !== this.previsouKeyword) {
      this.pageNumber = 1;
    }

    this.previsouKeyword = keyword;

    // now search for the products using keyword

    const productSearchSubscription: Subscription = this.productService
      .searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
      .subscribe((data) => {
          this.products = data._embedded.products;
          this.pageSize = data.page.size;
          this.pageNumber = data.page.number + 1;
          this.totalElements = data.page.totalElements;
      });
    this.subscriptions.push(productSearchSubscription);
  }

  updatePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
