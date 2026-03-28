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
  });

  describe('Parcours catégorie et produit', () => {
    it('Naviguer vers la catégorie Cyclisme et afficher les produits', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Bienvenue sur Breizhsport').should('be.visible');

      // Naviguer vers Cyclisme
      cy.get('a').contains('Cyclisme').click();
      cy.url().should('include', '/category/2');
      cy.wait(3000);

      // Vérifier les produits
      cy.contains('Casque de vélo').should('be.visible');
    });

    it('Afficher les détails d\'un produit et l\'ajouter au panier', () => {
      cy.visit('http://localhost:4200');
      cy.get('a').contains('Cyclisme').click();
      cy.url().should('include', '/category/2');
      cy.wait(3000);

      // Cliquer sur "Voir" pour "Casque de vélo"
      cy.get('.product-card').contains('Casque de vélo').parent().within(() => {
        cy.get('button').contains('Voir').click();
      });
      cy.url().should('include', '/product/4');
      cy.wait(3000);

      // Vérifier les détails du produit
      cy.contains('Casque de vélo').should('be.visible');
      cy.contains('50.00€').should('be.visible');

      // Ajouter au panier
      cy.get('button').contains('Ajouter au panier').click();
      cy.get('.confirmation').should('contain', 'Produit ajouté au panier');
    });
  });

  describe('Panier', () => {
    it('Accéder au panier et vérifier le contenu', () => {
      // D'abord ajouter un produit
      cy.visit('http://localhost:4200');
      cy.get('a').contains('Cyclisme').click();
      cy.wait(3000);
      cy.get('.product-card').contains('Casque de vélo').parent().within(() => {
        cy.get('button').contains('Voir').click();
      });
      cy.wait(3000);
      cy.get('button').contains('Ajouter au panier').click();
      cy.wait(2000);

      // Accéder au panier
      cy.get('a.nav-link[routerLink="/cart"]').should('be.visible').click();
      cy.url().should('include', '/cart');

      // Vérifier le contenu
      cy.contains('Casque de vélo').should('be.visible');
      cy.contains('50€').should('be.visible');
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
