import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService,
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage =
        'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.logger.info('RegisterComponent', 'User registered successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 409) {
            this.errorMessage =
              'Un compte avec cet email ou ce nom existe déjà.';
          } else if (error.status === 400) {
            this.errorMessage = error?.error?.message || 'Données invalides.';
          } else if (error.status === 0) {
            this.errorMessage =
              'Impossible de contacter le serveur. Veuillez réessayer.';
          } else {
            this.errorMessage =
              error?.error?.message ||
              'Une erreur est survenue. Veuillez réessayer.';
          }
        },
      });
  }
}
