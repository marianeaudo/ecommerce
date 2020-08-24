import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit, OnDestroy {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  totalPriceSubscription: Subscription;
  totalQuantitySubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartService();
  }

  updateCartService(): void {
    this.totalPriceSubscription = this.cartService.totalPrice.subscribe(
      (tempTotalPrice: number) => {
        this.totalPrice = tempTotalPrice;
      }
    );

    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe(
      (tempTotalQuantiy: number) => {
        this.totalQuantity = tempTotalQuantiy;
      }
    );
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
    this.totalQuantitySubscription.unsubscribe();
  }

}
