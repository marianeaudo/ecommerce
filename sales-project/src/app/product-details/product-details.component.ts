import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../model/models';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  routeSubscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails(): void {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart(product: Product): void {
    console.log('name : ' + product.name + ', price : ' + product.unitPrice);
    const cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
