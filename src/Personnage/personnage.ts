import { Nom } from "./Nom";
import { Stats } from "./Stats";

export abstract class Personnage {
  public nom: Nom;
  public inventaire: string[];
  public stats: Stats;

  constructor(nom: string) {
    this.nom = new Nom(nom);
    this.inventaire = [];
    this.stats = this.getDefaultStats();
  }

  protected abstract getDefaultStats(): Stats;

  public afficherInfos(): string {
    return `Nom: ${this.nom.toString()}\nStats: Force=${this.stats.force}, Intelligence=${this.stats.intelligence}, Défense=${this.stats.defense}, Résistance Magique=${this.stats.resistanceMagique}, Agilité=${this.stats.vitesse}, Chance=${this.stats.chance}, Endurance=${this.stats.endurance}, Esprit=${this.stats.esprit}, Santé=${this.stats.sante}, Mana=${this.stats.mana}\nInventaire: ${this.inventaire.join(", ") || "Vide"}`;
  }
  
}
export interface PersonnageConstructor {
    new (nom: string): Personnage;
}