import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should deny access when not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    const route = { data: {} } as any;
    const state = { url: '/cart' } as any;

    expect(guard.canActivate(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/cart' } });
  });

  it('should allow access when authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const route = { data: {} } as any;
    const state = { url: '/cart' } as any;

    expect(guard.canActivate(route, state)).toBeTrue();
  });

  it('should deny access when role is insufficient', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    spyOn(authService, 'hasRole').and.returnValue(false);
    spyOn(router, 'navigate');

    const route = { data: { role: 'admin' } } as any;
    const state = { url: '/admin' } as any;

    expect(guard.canActivate(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
