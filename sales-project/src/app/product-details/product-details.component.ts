import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product = new Product();
  routeSubscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails(): void {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
