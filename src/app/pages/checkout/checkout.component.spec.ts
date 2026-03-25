import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cart items', () => {
    expect(component.cartItems).toEqual([]);
    expect(component.total).toBe(0);
  });

  it('should calculate total correctly', () => {
    component.cartItems = [
      { price: 50, quantity: 2 },
      { price: 30, quantity: 3 },
    ];
    component.calculateTotal();
    expect(component.total).toBe(190);
  });

  it('should display empty cart message when no items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Votre panier est vide');
  });
});
