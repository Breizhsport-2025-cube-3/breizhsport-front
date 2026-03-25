import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const mockCategories = [
      { id: 1, name: 'Course à pied' },
      { id: 2, name: 'Cyclisme' },
    ];

    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(2);
      expect(categories[0].name).toBe('Course à pied');
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch products by category', () => {
    const mockProducts = [
      { id: 1, categoryId: 1, name: 'Chaussures', price: 100 },
    ];

    service.getProductsByCategory(1).subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Chaussures');
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/products?categoryId=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch a single product', () => {
    const mockProduct = { id: 1, name: 'Casque de vélo', price: 50 };

    service.getProduct(1).subscribe((product) => {
      expect(product.name).toBe('Casque de vélo');
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should fetch cart items', () => {
    const mockCart = [{ productId: 1, name: 'Casque', price: 50, quantity: 2 }];

    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/cart');
    expect(req.request.method).toBe('GET');
    req.flush(mockCart);
  });

  it('should add item to cart', () => {
    const item = { productId: 1, name: 'Test', price: 10, quantity: 1 };

    service.addToCart(item).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/cart/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(item);
    req.flush({ success: true });
  });

  it('should remove item from cart', () => {
    service.removeFromCart(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/cart/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should clear cart', () => {
    service.clearCart().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/cart');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should place an order', () => {
    const order = { items: [{ productId: 1, quantity: 1 }] };

    service.placeOrder(order).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/orders');
    expect(req.request.method).toBe('POST');
    req.flush({ orderId: 1 });
  });

  it('should update cart item quantity', () => {
    const item = { productId: 1, quantity: 3 };

    service.updateCartItem(item).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/cart/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ productId: 1, quantity: 3 });
  });
});
