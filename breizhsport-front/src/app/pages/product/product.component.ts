import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { products } from '../../mock-data';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Import du service Location

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: any;
  showConfirmation = false; // Indique si le message doit être affiché

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location // Injection du service Location
  ) {
    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      this.product = products.find((product) => product.id === productId);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.showConfirmation = true; // Affiche le message

    // Cache le message après 2 secondes
    setTimeout(() => {
      this.showConfirmation = false;
    }, 2000);
  }

  goBack() {
    this.location.back(); // Revenir à la page précédente
  }
}
