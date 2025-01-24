import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { products, Product } from '../../mock-data';
import { FilterService } from '../../services/filter.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
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

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private filterService: FilterService
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
        this.products = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
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

  sortProducts(order: 'asc' | 'desc'): void {
    this.filteredProducts.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    this.paginateProducts();
  }

  goBack(): void {
    this.location.back();
  }
}
