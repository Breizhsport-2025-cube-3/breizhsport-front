import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form fields initially', () => {
    expect(component.firstName).toBe('');
    expect(component.lastName).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should show error when submitting empty form', () => {
    component.onSubmit();
    expect(component.errorMessage).toBe('Veuillez remplir tous les champs.');
  });

  it('should validate password length', () => {
    component.firstName = 'Test';
    component.lastName = 'User';
    component.email = 'test@test.com';
    component.password = 'short';
    component.confirmPassword = 'short';
    component.onSubmit();
    expect(component.errorMessage).toBe('Le mot de passe doit contenir au moins 8 caractères.');
  });

  it('should validate password match', () => {
    component.firstName = 'Test';
    component.lastName = 'User';
    component.email = 'test@test.com';
    component.password = 'password123';
    component.confirmPassword = 'different123';
    component.onSubmit();
    expect(component.errorMessage).toBe('Les mots de passe ne correspondent pas.');
  });

  it('should validate email format', () => {
    component.firstName = 'Test';
    component.lastName = 'User';
    component.email = 'invalid-email';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.onSubmit();
    expect(component.errorMessage).toBe('Veuillez entrer une adresse email valide.');
  });

  it('should display register form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Créer un compte');
    expect(compiled.querySelector('input[name="firstName"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="lastName"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
  });
});
