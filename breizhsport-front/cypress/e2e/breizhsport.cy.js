describe('Test end-to-end Breizhsport - Catégorie Cyclisme', () => {
  it('Naviguer vers la catégorie Cyclisme, afficher les détails d\'un produit et l\'ajouter au panier', () => {
    // 1. Accéder à la page d'accueil
    cy.visit('http://localhost:4200');
    cy.contains('Bienvenue sur Breizhsport').should('be.visible');
    cy.wait(1000); // Pause de 1 seconde

    // 2. Naviguer vers la catégorie Cyclisme
    cy.get('a').contains('Cyclisme').click();
    cy.url().should('include', '/category/2');
    cy.wait(2000); // Pause de 1 seconde

    // 3. Vérifier les produits dans la catégorie
    cy.contains('Casque de vélo').should('be.visible');
    cy.wait(2000); // Pause de 1 seconde

    // 4. Cliquer sur "Voir" pour "Casque de vélo"
    cy.get('.product-card').contains('Casque de vélo').parent().within(() => {
      cy.get('button').contains('Voir').click();
    });
    cy.url().should('include', '/product/4'); // Vérifie l'URL du produit
    cy.wait(2000); // Pause de 1 seconde

    // 5. Vérifier les détails du produit
    cy.contains('Casque de vélo').should('be.visible');
    cy.contains('50€').should('be.visible');
    cy.wait(2000); // Pause de 1 seconde

    // 6. Ajouter au panier
    cy.get('button').contains('Ajouter au panier').click();
    cy.get('.confirmation').should('contain', 'Produit ajouté au panier');
    cy.wait(2000); // Pause de 1 seconde

    // 7. Accéder à "Mon Panier"
    cy.get('a.nav-link[routerLink="/cart"]').should('be.visible').click(); // Cible le lien "Mon Panier"
    cy.url().should('include', '/cart');
    cy.wait(2000); // Pause de 1 seconde

    // 8. Vérifier dans le panier
    cy.contains('Casque de vélo').should('be.visible');
    cy.contains('50€').should('be.visible');
  });
});