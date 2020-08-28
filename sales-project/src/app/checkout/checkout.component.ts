import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Luv2ShopFormService } from '../services/luv2-shop-form.service';
import { Subscription } from 'rxjs';
import { Country, State } from '../model/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkOutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  totalPriceSubscription: Subscription;
  totalQuantitySubscription: Subscription;
  creditCardYears: number[] = [];
  creditCardYearsSubscription: Subscription;
  creditCardMonths: number[] = [];
  creditCardMonthSubscription: Subscription;
  countries: Country[] = [];
  countrySubscription: Subscription;
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private luv2ShopFormService: Luv2ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    this.totalPriceSubscription = this.cartService.totalPrice.subscribe((tempTotalPrice: number) => {
        this.totalPrice = tempTotalPrice;
      }
    );

    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe((tempTotalQuantity: number) => {
      this.totalQuantity = tempTotalQuantity;
    });

    this.cartService.computeCartTotals();

    const startMonth: number = new Date().getMonth() + 1;

    this.creditCardMonthSubscription = this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe((months: number[]) => {
      this.creditCardMonths = months;
    });

    this.creditCardYearsSubscription = this.luv2ShopFormService.getCreditCardYears().subscribe((years: number[]) => {
      this.creditCardYears = years;
    });

    this.countrySubscription = this.luv2ShopFormService.getCountries().subscribe((tempCountries: Country[]) => {
      this.countries = tempCountries;
    });

  }

  onSubmit(): void {
    console.log('Handling the submit button');
    console.log(this.checkOutFormGroup.get('customer').value);
  }

  copyShippingAddressToBillingAddress(event): void {
    if (event.target.checked) {
      this.checkOutFormGroup.controls.billingAddress.setValue(
        this.checkOutFormGroup.controls.shippingAddress.value
      );
      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkOutFormGroup.controls.billingAddress.reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }

  handleMonthsandYears(): void {
    const creditCardFormGroup = this.checkOutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe((months: number[]) => {
      this.creditCardMonths = months;
    });
  }

  getStates(formGroupName: string): void {
    const formGroup = this.checkOutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).subscribe((states: State[]) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = states;
      } else {
        this.billingAddressStates = states;
      }

      // select first item by default
      formGroup.get('state').setValue(states[0]);
    });

  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
    this.totalQuantitySubscription.unsubscribe();
    this.countrySubscription.unsubscribe();
  }

}
