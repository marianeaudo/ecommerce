import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductCategory} from '../model/models';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit, OnDestroy {

  productCategories: ProductCategory[];
  productCategoriesSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(): void {

    this.productCategoriesSubscription = this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );

  }

  ngOnDestroy(): void {
    this.productCategoriesSubscription.unsubscribe();
  }

}
