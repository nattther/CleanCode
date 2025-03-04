import { Personnage, Stats } from "../Personnage/personnage";

/**
 * Classe fake représentant un Guerrier pour les tests, avec des statistiques attendues.
 * Elle étend Personnage pour respecter les types attendus (notamment pour la propriété nom).
 */
export class FakeGuerrier extends Personnage {
  /**
   * Crée une instance de FakeGuerrier avec des statistiques prédéfinies pour les tests.
   * @param nom Le nom du guerrier.
   */
  constructor(nom: string) {
    super(nom); // Appelle le constructeur de Personnage qui convertit le string en Nom.
    this.stats = {
      force: 15,
      intelligence: 5,
      defense: 12,
      resistanceMagique: 6,
      vitesse: 8,
      chance: 5,
      endurance: 10,
      esprit: 4,
      sante: 150,
      mana: 50,
    };
    // L'inventaire est initialisé par le constructeur de Personnage.
  }
  
  /**
   * (Optionnel) Affiche les informations du personnage.
   */
  public afficherInfos(): string {
    return super.afficherInfos();
  }
}
