import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'breizhsport_token';
  private refreshTokenKey = 'breizhsport_refresh_token';
  private userKey = 'breizhsport_user';

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private logger: LoggingService
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser && this.getToken()) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.logger.info('AuthService', 'User session restored', { userId: user.id });
      } catch {
        this.clearAuth();
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    this.logger.info('AuthService', 'Login attempt', { email });

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.storeAuth(response);
        this.logger.info('AuthService', 'Login successful', { userId: response.user.id });
      }),
      catchError((error) => {
        this.logger.error('AuthService', 'Login failed', { email, status: error.status });
        return throwError(() => error);
      })
    );
  }

  register(userData: { email: string; password: string; firstName: string; lastName: string }): Observable<AuthResponse> {
    this.logger.info('AuthService', 'Registration attempt', { email: userData.email });

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        this.storeAuth(response);
        this.logger.info('AuthService', 'Registration successful', { userId: response.user.id });
      }),
      catchError((error) => {
        this.logger.error('AuthService', 'Registration failed', { email: userData.email, status: error.status });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    const user = this.currentUserSubject.value;
    this.logger.info('AuthService', 'User logged out', { userId: user?.id });
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => {
        this.storeAuth(response);
        this.logger.info('AuthService', 'Token refreshed successfully');
      }),
      catchError((error) => {
        this.logger.error('AuthService', 'Token refresh failed');
        this.clearAuth();
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private storeAuth(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.refreshTokenKey, response.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
}
