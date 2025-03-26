import { Nom } from './Nom';

export interface Stats {
    force: number;             // Dégâts des attaques physiques.
    intelligence: number;      // Efficacité des sorts magiques.
    defense: number;           // Réduction des dégâts physiques reçus.
    resistanceMagique: number; // Réduction des dégâts magiques reçus.
    vitesse: number;           // Agilité : Vitesse d'action et capacité d'esquive.
    chance: number;            // Chances de coups critiques et trouvailles rares.
    endurance: number;         // Résistance aux effets.
    esprit: number;            // Régénération de mana et résistance mentale.
    sante: number;             // Points de Vie (PV) : Santé du personnage.
    mana: number;              // Points de Mana (PM) : Utilisés pour les sorts et compétences spéciales.
}

export abstract class Personnage {
    public nom: Nom;
    public inventaire: string[];
    public stats: Stats;

    constructor(nom: string) {
        this.nom = new Nom(nom);
        this.inventaire = [];
        this.stats = {
            force: 0,
            intelligence: 0,
            defense: 0,
            resistanceMagique: 0,
            vitesse: 0,
            chance: 0,
            endurance: 0,
            esprit: 0,
            sante: 0,
            mana: 0,
        };
    }

    public afficherInfos(): string {
        return `Nom: ${this.nom.toString()}\nStats: Force=${this.stats.force}, Intelligence=${this.stats.intelligence}, Défense=${this.stats.defense}, Résistance Magique=${this.stats.resistanceMagique}, Agilité=${this.stats.vitesse}, Chance=${this.stats.chance}, Endurance=${this.stats.endurance}, Esprit=${this.stats.esprit}, Santé=${this.stats.sante}, Mana=${this.stats.mana}\nInventaire: ${this.inventaire.join(", ") || "Vide"}`;
    }
}

export interface PersonnageConstructor {
    new (nom: string): Personnage;
}