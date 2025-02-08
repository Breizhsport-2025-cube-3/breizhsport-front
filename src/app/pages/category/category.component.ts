import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  categoryId!: number;
  maxPrice: number = 0;
  searchQuery: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 6;
  isLoading: boolean = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private filterService: FilterService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.apiService.getProductsByCategory(this.categoryId).subscribe({
      next: (data) => {
        // Filtrer les produits côté client
        this.products = data.filter((product: any) => product.categoryId === this.categoryId);
        this.filteredProducts = this.products;
        this.paginateProducts();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.filterService.filterProducts(
      this.products,
      this.maxPrice,
      this.searchQuery
    );
    this.paginateProducts();
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  sortProducts(order: 'asc' | 'desc'): void {
    this.filteredProducts.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price; // Tri croissant
      } else {
        return b.price - a.price; // Tri décroissant
      }
    });
    this.paginateProducts(); // Met à jour les produits paginés après le tri
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(
      () => {
        console.log('Produit ajouté au panier');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout au panier :', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}