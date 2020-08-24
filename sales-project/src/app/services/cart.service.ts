import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
    this.cartItems =
      JSON.parse(sessionStorage.getItem('cartItems')) != null
        ? JSON.parse(sessionStorage.getItem('cartItems'))
        : [];
  }

  addToCart(cartItem: CartItem): void {
    // check if we already have the item in our cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === cartItem.id
      );

      // check if we found it
      alreadyExistsInCart = existingCartItem !== undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals(): void {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach((cartItem: CartItem) => {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    });

    // publish the new values

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();
  }

  persistCartItems(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  resetStorage(): void {
    sessionStorage.clear();
  }
}
