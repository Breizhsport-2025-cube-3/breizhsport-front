import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cart items', () => {
    const mockItems = [{ id: 1, name: 'Test', price: 10, quantity: 1 }];

    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/cart');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should add item to cart', () => {
    const product = { name: 'Test', price: 10 };

    service.addToCart(product).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/cart/add');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should remove item from cart', () => {
    service.removeFromCart(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/cart/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should clear cart', () => {
    service.clearCart().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/cart');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
