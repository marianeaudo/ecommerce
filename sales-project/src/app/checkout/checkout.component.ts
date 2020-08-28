import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  checkOutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  totalPriceSubscription: Subscription;
  totalQuantitySubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private cartService: CartService) { }

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAdress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAdress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
    this.totalPriceSubscription = this.cartService.totalPrice.subscribe(
      (tempPrice: number) => {
        this.totalPrice = tempPrice;
      }
    );
    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe(
      (tempQuantity: number) => {
        this.totalQuantity = tempQuantity;
      }
    );
    console.log(this.totalQuantity);
  }

  onSubmit(): void {
    console.log('Handling the submit button');
    console.log(this.checkOutFormGroup.get('customer').value);
  }

  copyShippingAddressToBillingAddress(event): void {
    if (event.target.checked) {
      this.checkOutFormGroup.controls.billingAdress.setValue(this.checkOutFormGroup.controls.shippingAdress.value);
    } else {
      this.checkOutFormGroup.controls.billingAdress.reset();
    }
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
    this.totalQuantitySubscription.unsubscribe();
  }

}
