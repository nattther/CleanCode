import { Personnage } from "./personnage";

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
