import { Component, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.fetchCartItems();
  }

  // Récupérer les articles du panier depuis l'API
  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles du panier :', error);
      }
    );
  }

  // Calculer le prix total du panier
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }

  // Augmenter la quantité d'un article
  increaseQuantity(index: number) {
    const item = this.cartItems[index];
    this.cartService.updateCartItem({ ...item, quantity: item.quantity + 1 }).subscribe(
      () => {
        this.cartItems[index].quantity += 1;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la quantité :', error);
      }
    );
  }

  // Réduire la quantité d'un article
  decreaseQuantity(index: number) {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.cartService.updateCartItem({ ...item, quantity: item.quantity - 1 }).subscribe(
        () => {
          this.cartItems[index].quantity -= 1;
          this.calculateTotalPrice();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la quantité :', error);
        }
      );
    }
  }

  // Supprimer un article du panier
  removeItem(index: number) {
    const item = this.cartItems[index];
    this.cartService.removeFromCart(item.id).subscribe(
      () => {
        this.cartItems.splice(index, 1);
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article :', error);
      }
    );
  }

  // Vider le panier
  clearCart() {
    this.cartService.clearCart().subscribe(
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