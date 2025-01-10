import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = []; // Stocke les articles du panier

  // Retourne les articles du panier
  getCartItems() {
    return this.cart;
  }

  // Ajoute un produit au panier
  addToCart(product: any) {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }
  

  // Supprime un produit du panier
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  // Vide le panier
  clearCart() {
    this.cart = [];
  }

  // Retourne le nombre total d'articles dans le panier (quantité totale)
  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  // Retourne le montant total du panier
  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }
}
