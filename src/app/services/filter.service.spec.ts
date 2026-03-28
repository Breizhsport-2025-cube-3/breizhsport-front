import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { Product } from '../mock-data';

describe('FilterService', () => {
  let service: FilterService;

  const mockProducts: Product[] = [
    { id: 1, categoryId: 1, name: 'Chaussures de running', price: 100, description: 'Test', image: 'test.jpg' },
    { id: 2, categoryId: 1, name: 'Short de running', price: 30, description: 'Test', image: 'test.jpg' },
    { id: 3, categoryId: 2, name: 'Casque de vélo', price: 50, description: 'Test', image: 'test.jpg' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products when no filters applied', () => {
    const result = service.filterProducts(mockProducts, 0, '');
    expect(result.length).toBe(3);
  });

  it('should filter products by max price', () => {
    const result = service.filterProducts(mockProducts, 50, '');
    expect(result.length).toBe(2);
    expect(result.every((p) => p.price <= 50)).toBeTrue();
  });

  it('should filter products by search query', () => {
    const result = service.filterProducts(mockProducts, 0, 'running');
    expect(result.length).toBe(2);
  });

  it('should filter by both price and search query', () => {
    const result = service.filterProducts(mockProducts, 50, 'running');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Short de running');
  });

  it('should sort products ascending', () => {
    const result = service.sortProducts(mockProducts, 'asc');
    expect(result[0].price).toBe(30);
    expect(result[result.length - 1].price).toBe(100);
  });

  it('should sort products descending', () => {
    const result = service.sortProducts(mockProducts, 'desc');
    expect(result[0].price).toBe(100);
    expect(result[result.length - 1].price).toBe(30);
  });

  it('should not modify original array when sorting', () => {
    const original = [...mockProducts];
    service.sortProducts(mockProducts, 'asc');
    expect(mockProducts).toEqual(original);
  });

  it('should be case insensitive for search', () => {
    const result = service.filterProducts(mockProducts, 0, 'RUNNING');
    expect(result.length).toBe(2);
  });
});
