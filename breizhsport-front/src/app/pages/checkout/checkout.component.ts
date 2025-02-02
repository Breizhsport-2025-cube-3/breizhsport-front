import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // ✅ Utilise ApiService
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

  constructor(private apiService: ApiService, private router: Router) {} // ✅ Utilise ApiService

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.apiService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    );
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  finalizeCheckout() {
    this.apiService.clearCart().subscribe( // ✅ Correction ici
      () => {
        alert('Commande validée ! Merci pour votre achat.');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erreur lors du checkout :', error);
      }
    );
  }
}
