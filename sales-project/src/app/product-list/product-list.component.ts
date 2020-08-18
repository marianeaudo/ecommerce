import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productsSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }


}
