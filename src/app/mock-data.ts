export const categories = [
    { id: 1, name: 'Course à pied' },
    { id: 2, name: 'Cyclisme' },
    { id: 3, name: 'Fitness' },
    { id: 4, name: 'Natation' },
    { id: 5, name: 'Randonnée' },
    { id: 6, name: 'Yoga' },
    { id: 7, name: 'Boxe' },
  ];
  
  
  
  export interface Product {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export const products: Product[] = [
    // Course à pied
    { id: 1, categoryId: 1, name: 'Chaussures de running', price: 100, description: 'Chaussures de course de haute qualité, parfaites pour les longues distances.', image: 'assets/images/chaussures_running_1.jpg' },
    { id: 2, categoryId: 1, name: 'Short de running', price: 30, description: 'Short léger et confortable pour vos entraînements.', image: 'assets/images/short_running.jpg ' },
    { id: 3, categoryId: 1, name: 'Casquette de running', price: 20, description: 'Casquette légère pour se protéger du soleil pendant la course.', image: 'assets/images/casquette_running.jpg' },
  
    // Cyclisme
    { id: 4, categoryId: 2, name: 'Casque de vélo', price: 50, description: 'Casque léger et robuste pour protéger votre tête.', image: 'assets/images/casque_velo.jpg' },
    { id: 5, categoryId: 2, name: 'Gants de cyclisme', price: 25, description: 'Gants confortables pour une meilleure prise.', image: 'assets/images/gant_cyclisme.jpg' },
    { id: 6, categoryId: 2, name: 'Maillot de cyclisme', price: 60, description: 'Maillot respirant idéal pour les longues balades à vélo.', image: 'assets/images/maillot_cyclisme.jpg' },
  
    // Fitness
    { id: 7, categoryId: 3, name: 'Haltères', price: 20, description: 'Haltères idéales pour vos exercices à domicile.', image: 'assets/images/halteres.jpg' },
    { id: 8, categoryId: 3, name: 'Kettlebell', price: 35, description: 'Kettlebell polyvalente pour un entraînement complet.', image: 'assets/images/kettlebell.jpg' },
    { id: 9, categoryId: 3, name: 'Corde à sauter', price: 10, description: 'Corde à sauter rapide pour un entraînement cardio.', image: 'assets/images/corde_a_sauter.jpg' },
  
    // Natation
    { id: 10, categoryId: 4, name: 'Lunettes de natation', price: 15, description: 'Lunettes anti-buée et résistantes aux UV.', image: 'assets/images/lunettes_natation.jpg' },
    { id: 11, categoryId: 4, name: 'Bonnet de bain', price: 10, description: 'Bonnet de bain imperméable et confortable.', image: 'assets/images/bonnet_de_bain.jpg' },
    { id: 12, categoryId: 4, name: 'Maillot de bain', price: 40, description: 'Maillot de bain durable et élégant.', image: 'assets/images/maillot_de_bain.jpg' },
  
    // Randonnée
    { id: 13, categoryId: 5, name: 'Chaussures de randonnée', price: 120, description: 'Chaussures imperméables et robustes pour tous les terrains.', image: 'assets/images/chaussures_randonnees.jpg' },
    { id: 14, categoryId: 5, name: 'Sac à dos de randonnée', price: 80, description: 'Sac à dos spacieux et léger pour vos excursions.', image: 'assets/images/sac_rando.jpg' },
    { id: 15, categoryId: 5, name: 'Bâtons de randonnée', price: 50, description: 'Bâtons ajustables pour un soutien optimal.', image: 'assets/images/baton_rando.jpg' },
  
    // Yoga
    { id: 16, categoryId: 6, name: 'Tapis de yoga', price: 25, description: 'Tapis antidérapant pour une pratique sécurisée.', image: 'assets/images/tapis_yoga.jpg' },
    { id: 17, categoryId: 6, name: 'Bloc de yoga', price: 15, description: 'Bloc de soutien pour vos postures.', image: 'assets/images/bloc_yoga.jpg' },
    { id: 18, categoryId: 6, name: 'Sangle de yoga', price: 12, description: 'Sangle ajustable pour améliorer votre souplesse.', image: 'assets/images/sangle_yoga.jpg' },
  
    // Boxe
    { id: 19, categoryId: 7, name: 'Gants de boxe', price: 45, description: 'Gants résistants pour vos entraînements.', image: 'assets/images/gant_boxe.jpg' },
    { id: 20, categoryId: 7, name: 'Sac de frappe', price: 150, description: 'Sac de frappe robuste pour améliorer votre technique.', image: 'assets/images/sac_de_frappe.jpg' },
    { id: 21, categoryId: 7, name: 'Bandages de boxe', price: 10, description: 'Bandages pour protéger vos mains.', image: 'assets/images/bandage.jpg' },
  ];
  
  
  