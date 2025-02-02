import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // ✅ Utilise ApiService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private apiService: ApiService) {} // ✅ Utilise ApiService

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.apiService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles du panier :', error);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }

  increaseQuantity(index: number) {
    const item = this.cartItems[index];
    this.apiService.updateCartItem({ productId: item.productId, quantity: item.quantity + 1 }).subscribe(
      (updatedItem) => {
        this.cartItems[index].quantity = updatedItem.quantity;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error("Erreur lors de l'augmentation de la quantité :", error);
      }
    );
  }

  decreaseQuantity(index: number) {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.apiService.updateCartItem({ productId: item.productId, quantity: item.quantity - 1 }).subscribe(
        (updatedItem) => {
          this.cartItems[index].quantity = updatedItem.quantity;
          this.calculateTotalPrice();
        },
        (error) => {
          console.error("Erreur lors de la réduction de la quantité :", error);
        }
      );
    }
  }

  removeItem(index: number) {
    const item = this.cartItems[index];
    this.apiService.removeFromCart(item.productId).subscribe( // ✅ Correction ici
      () => {
        this.cartItems.splice(index, 1);
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article :', error);
      }
    );
  }

  clearCart() {
    this.apiService.clearCart().subscribe(
      () => {
        this.cartItems = [];
        this.totalPrice = 0;
      },
      (error) => {
        console.error('Erreur lors du vidage du panier :', error);
      }
    );
  }
}
