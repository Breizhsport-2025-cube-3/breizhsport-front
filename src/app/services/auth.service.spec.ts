import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for isAuthenticated when no token exists', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return null for getCurrentUser when not logged in', () => {
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should return null for getToken when no token stored', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should store auth data on successful login', () => {
    const mockResponse = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjo5OTk5OTk5OTk5fQ.test',
      refreshToken: 'refresh-token-123',
      user: { id: 1, email: 'test@test.com', firstName: 'Test', lastName: 'User', role: 'user' },
    };

    service.login('test@test.com', 'password123').subscribe((response) => {
      expect(response.user.email).toBe('test@test.com');
      expect(service.getToken()).toBe(mockResponse.token);
      expect(service.getCurrentUser()?.email).toBe('test@test.com');
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: 'password123' });
    req.flush(mockResponse);
  });

  it('should clear auth data on logout', () => {
    localStorage.setItem('breizhsport_token', 'some-token');
    localStorage.setItem('breizhsport_user', '{"id":1}');

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should handle login error', () => {
    service.login('wrong@test.com', 'wrong').subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
      },
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/auth/login');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('should check role correctly', () => {
    expect(service.hasRole('admin')).toBeFalse();
  });

  it('should send register request with correct data', () => {
    const userData = {
      email: 'new@test.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
    };

    const mockResponse = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjo5OTk5OTk5OTk5fQ.test',
      refreshToken: 'refresh-token-456',
      user: { id: 2, email: 'new@test.com', firstName: 'New', lastName: 'User', role: 'user' },
    };

    service.register(userData).subscribe((response) => {
      expect(response.user.email).toBe('new@test.com');
    });

    const req = httpMock.expectOne('http://127.0.0.1:3000/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
