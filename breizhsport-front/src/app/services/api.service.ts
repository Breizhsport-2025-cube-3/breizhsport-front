import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL de l'API Gateway

  constructor(private http: HttpClient) {}

  // Endpoint pour les catégories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // Endpoint pour les produits
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products?categoryId=${categoryId}`);
  }

  // Endpoint pour un produit spécifique
  getProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  // Endpoint pour le panier
  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, product);
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart`);
  }

  // Endpoint pour les commandes
  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }
}
