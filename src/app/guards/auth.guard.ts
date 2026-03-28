import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggingService } from '../services/logging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data['role'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.logger.warn('AuthGuard', 'Access denied - insufficient role', {
          requiredRole,
          userRole: this.authService.getCurrentUser()?.role,
          url: state.url,
        });
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.logger.warn('AuthGuard', 'Access denied - not authenticated', { url: state.url });
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
