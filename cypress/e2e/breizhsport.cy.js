describe('Breizhsport E2E Tests', () => {

  describe('Navigation et page d\'accueil', () => {
    it('Affiche la page d\'accueil avec le message de bienvenue', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Bienvenue sur Breizhsport').should('be.visible');
    });

    it('Affiche les catégories de produits', () => {
      cy.visit('http://localhost:4200');
      cy.get('ul li').should('have.length.greaterThan', 0);
    });

    it('Affiche le header avec les liens de navigation', () => {
      cy.visit('http://localhost:4200');
      cy.get('nav.navbar').should('be.visible');
      cy.contains('Breizhsport').should('be.visible');
      cy.contains('Accueil').should('be.visible');
      cy.contains('Mon Panier').should('be.visible');
    });

    it('Affiche les liens de connexion et inscription', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Connexion').should('be.visible');
      cy.contains('Inscription').should('be.visible');
    });
  });

  describe('Page de connexion', () => {
    it('Affiche le formulaire de connexion', () => {
      cy.visit('http://localhost:4200/login');
      cy.contains('Connexion').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('Affiche une erreur avec un formulaire vide', () => {
      cy.visit('http://localhost:4200/login');
      cy.get('button[type="submit"]').click();
      cy.contains('Veuillez remplir tous les champs').should('be.visible');
    });

    it('Contient un lien vers la page d\'inscription', () => {
      cy.visit('http://localhost:4200/login');
      cy.get('a[routerLink="/register"]').should('be.visible');
    });
  });

  describe('Page d\'inscription', () => {
    it('Affiche le formulaire d\'inscription', () => {
      cy.visit('http://localhost:4200/register');
      cy.contains('Créer un compte').should('be.visible');
      cy.get('input[name="firstName"]').should('be.visible');
      cy.get('input[name="lastName"]').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
    });

    it('Valide la longueur du mot de passe', () => {
      cy.visit('http://localhost:4200/register');
      cy.get('input[name="firstName"]').type('Test');
      cy.get('input[name="lastName"]').type('User');
      cy.get('input[type="email"]').type('test@test.com');
      cy.get('input[name="password"]').type('short');
      cy.get('input[name="confirmPassword"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.contains('au moins 8 caractères').should('be.visible');
    });
  });

  describe('Parcours catégorie et produit', () => {
    it('Naviguer vers une catégorie et voir les produits', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Bienvenue sur Breizhsport').should('be.visible');

      // Naviguer vers Cyclisme
      cy.get('a').contains('Cyclisme').click();
      cy.url().should('include', '/category/2');

      // Vérifier les produits
      cy.contains('Casque de vélo').should('be.visible');

      // Voir les détails d'un produit
      cy.get('.product-card').contains('Casque de vélo').parent().within(() => {
        cy.get('button').contains('Voir').click();
      });
      cy.url().should('include', '/product/4');

      // Vérifier les détails
      cy.contains('Casque de vélo').should('be.visible');
      cy.contains('50.00€').should('be.visible');
    });
  });

  describe('Sécurité - Protection des routes', () => {
    it('Redirige vers login quand on accède au panier sans être connecté', () => {
      cy.visit('http://localhost:4200/cart');
      cy.url().should('include', '/login');
    });

    it('Redirige vers login quand on accède au checkout sans être connecté', () => {
      cy.visit('http://localhost:4200/checkout');
      cy.url().should('include', '/login');
    });
  });

  describe('Footer', () => {
    it('Affiche le footer avec les informations', () => {
      cy.visit('http://localhost:4200');
      cy.get('footer').should('be.visible');
      cy.contains('Breizhsport').should('be.visible');
    });
  });
});
