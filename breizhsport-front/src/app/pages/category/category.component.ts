import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { products, Product } from '../../mock-data';
import { FilterService } from '../../services/filter.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  categoryId!: number;
  maxPrice: number = 0;
  searchQuery: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.products = products.filter(
        (product) => product.categoryId === this.categoryId
      );
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.filterService.filterProducts(
      this.products,
      this.maxPrice,
      this.searchQuery
    );
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginateProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  // Méthode pour trier les produits
  sortProducts(order: 'asc' | 'desc') {
    this.filteredProducts.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    this.paginateProducts();
  }

  goBack() {
    this.location.back();
  }
}
