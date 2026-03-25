import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cart', () => {
    expect(component.cartItems).toEqual([]);
    expect(component.totalPrice).toBe(0);
  });

  it('should calculate total price correctly', () => {
    component.cartItems = [
      { productId: 1, name: 'Item 1', price: 50, quantity: 2 },
      { productId: 2, name: 'Item 2', price: 30, quantity: 1 },
    ];
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(130);
  });

  it('should display empty cart message when no items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Votre panier est vide');
  });
});
