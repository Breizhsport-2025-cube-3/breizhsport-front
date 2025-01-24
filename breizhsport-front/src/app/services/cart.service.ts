import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart'; // URL de l'API Gateway pour le panier

  constructor(private http: HttpClient) {}

  // Retourne les articles du panier depuis l'API
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajoute un produit au panier via l'API
  addToCart(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Met à jour la quantité d'un produit dans le panier via l'API
  updateCartItem(updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedProduct.id}`, updatedProduct);
  }

  // Supprime un produit spécifique du panier via l'API
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }

  // Vide complètement le panier via l'API
  clearCart(): Observable<any> {
    return this.http.delete<any>(this.apiUrl);
  }

  // Retourne le nombre total d'articles dans le panier
  getTotalItems(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalItems`);
  }

  // Retourne le montant total du panier
  getTotalPrice(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalPrice`);
  }
}
