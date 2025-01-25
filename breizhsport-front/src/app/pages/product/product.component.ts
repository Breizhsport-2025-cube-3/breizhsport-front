import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');

      // Exclure les IDs invalides ou les fichiers `.map`
      if (!rawId || isNaN(Number(rawId)) || rawId.includes('.map')) {
        this.errorMessage = 'ID du produit invalide.';
        this.isLoading = false;
        return;
      }

      const productId = Number(rawId);
      this.loadProduct(productId);
    });
  }

  private loadProduct(productId: number) {
    this.apiService.getProduct(productId).subscribe(
      (product) => {
        this.product = product;
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'Erreur lors du chargement du produit.';
        this.isLoading = false;
      }
    );
  }

  addToCart() {
    if (this.product) {
      console.log('Ajout au panier du produit :', this.product); // Log le produit brut
  
      // Formater les données pour correspondre aux attentes de l'API
      const cartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: parseFloat(this.product.price), // S'assure que le prix est bien un nombre
        quantity: 1, // Quantité par défaut
      };
  
      console.log('Données formatées pour l\'API :', cartItem); // Log les données formatées
  
      this.cartService.addToCart(cartItem).subscribe(
        (response) => {
          console.log('Réponse de l\'API après ajout au panier :', response); // Log de la réponse
          this.showConfirmation = true; // Affiche le message de confirmation
          setTimeout(() => {
            this.showConfirmation = false;
          }, 2000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout au panier :', error); // Log des erreurs
        }
      );
    } else {
      console.error('Produit invalide, impossible d\'ajouter au panier'); // Log si aucun produit
    }
  }
  
  

  goBack() {
    this.location.back(); // Revenir à la page précédente
  }
}
