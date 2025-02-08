import { Injectable } from '@angular/core';
import { Product } from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterProducts(
    products: Product[],
    maxPrice: number,
    searchQuery: string
  ): Product[] {
    return products.filter((product) => {
      const matchesPrice = maxPrice ? product.price <= maxPrice : true;
      const matchesQuery = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesPrice && matchesQuery;
    });
  }

  sortProducts(products: Product[], order: 'asc' | 'desc'): Product[] {
    return [...products].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }
}
