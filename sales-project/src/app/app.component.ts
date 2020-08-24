import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sales-project';

  constructor(private cartService: CartService, private router: Router) {

  }

  refreshLocalStorage(): void {
    this.cartService.resetStorage();
    this.router.navigate([]);
  }
}
