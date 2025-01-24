import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { products } from '../../mock-data';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Import du service Location
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: any;
  showConfirmation = false; // Indique si le message doit être affiché
  isLoading = true; // Indique si le chargement est en cours
  errorMessage: string | null = null; // Message d'erreur si l'API échoue

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private location: Location // Injection du service Location
  ) {}

  ngOnInit() {
    this.fetchProduct();
  }

  fetchProduct() {
    const productId = +this.route.snapshot.params['id'];
    this.apiService.getProduct(productId).subscribe(
      (product) => {
        this.product = product;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement du produit.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product).subscribe(
        () => {
          this.showConfirmation = true; // Affiche le message
          setTimeout(() => {
            this.showConfirmation = false;
          }, 2000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout au panier :', error);
        }
      );
    }
  }
  


  goBack() {
    this.location.back(); // Revenir à la page précédente
  }
}
