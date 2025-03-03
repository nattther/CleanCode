/**
 * Interface définissant les statistiques globales d'un personnage.
 */
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

/**
 * Interface pour le constructeur de Personnage.
 */
export interface PersonnageConstructor {
    new (nom: string): Personnage;
}

/**
 * Classe abstraite représentant un personnage.
 */
export abstract class Personnage {
    public nom: string;
    public inventaire: string[];
    public stats: Stats;

    constructor(nom: string) {
        if (!Personnage.isNomValide(nom)) {
            throw new Error("Nom invalide : doit contenir entre 3 et 20 caractères.");
        }
        this.nom = nom;
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

    /**
     * Vérifie si le nom du personnage est valide.
     * @param nom Nom du personnage.
     * @returns true si le nom est valide, sinon false.
     */
    private static isNomValide(nom: string): boolean {
        return nom.length >= 3 && nom.length <= 20;
    }

    /**
     * Affiche les informations du personnage.
     * @returns Une chaîne contenant le nom, les statistiques et l'inventaire du personnage.
     */
    public afficherInfos(): string {
        return `Nom: ${this.nom}\nStats: Force=${this.stats.force}, Intelligence=${this.stats.intelligence}, Défense=${this.stats.defense}, Résistance Magique=${this.stats.resistanceMagique}, Agilité=${this.stats.vitesse}, Chance=${this.stats.chance}, Endurance=${this.stats.endurance}, Esprit=${this.stats.esprit}, Santé=${this.stats.sante}, Mana=${this.stats.mana}\nInventaire: ${this.inventaire.join(", ") || "Vide"}`;
    }
}

/**
 * Classe représentant un Guerrier avec ses statistiques initiales.
 */
export class Guerrier extends Personnage {
    constructor(nom: string) {
        super(nom);
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
    }
}

/**
 * Classe représentant un Mage avec ses statistiques initiales.
 */
export class Mage extends Personnage {
    constructor(nom: string) {
        super(nom);
        this.stats = {
            force: 4,
            intelligence: 15,
            defense: 5,
            resistanceMagique: 12,
            vitesse: 7,
            chance: 6,
            endurance: 5,
            esprit: 10,
            sante: 90,
            mana: 150,
        };
    }
}

/**
 * Classe représentant un Voleur avec ses statistiques initiales.
 */
export class Voleur extends Personnage {
    constructor(nom: string) {
        super(nom);
        this.stats = {
            force: 10,
            intelligence: 7,
            defense: 8,
            resistanceMagique: 7,
            vitesse: 15,
            chance: 12,
            endurance: 7,
            esprit: 6,
            sante: 110,
            mana: 70,
        };
    }
}
