import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.fetchCartItems();
  }

  // Récupère les articles du panier depuis l'API
  fetchCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles du panier :', error);
      }
    );
  }

  // Calcule le total du panier
  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }

  // Confirme la commande
  confirmOrder() {
    const order = {
      items: this.cartItems,
      total: this.total,
    };

    this.cartService.clearCart().subscribe(
      () => {
        alert('Commande validée ! Merci pour votre achat.');
        this.router.navigate(['/']); // Redirige vers la page d'accueil
      },
      (error) => {
        console.error('Erreur lors de la validation de la commande :', error);
      }
    );
  }
}
