import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  totalPriceSubscription: Subscription;
  totalQuantitySubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(): void {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart total price
    this.totalPriceSubscription = this.cartService.totalPrice.subscribe(
      (tempTotalPrice: number) => {
        this.totalPrice = tempTotalPrice;
      }
    );

    // subscribe to the cart total quantity
    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe(
      (tempTotalQuantity: number) => {
        this.totalQuantity = tempTotalQuantity;
      }
    );
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem): void {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem): void {
    this.cartService.remove(cartItem);
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
    this.totalQuantitySubscription.unsubscribe();
  }

}
