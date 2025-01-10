import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity += 1;
    this.calculateTotalPrice(); // Recalcule le total après modification
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.calculateTotalPrice(); // Recalcule le total après modification
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotalPrice();
  }

  clearCart() {
    this.cartItems = [];
    this.cartService.clearCart();
    this.calculateTotalPrice();
  }
}
