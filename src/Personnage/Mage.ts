import { Personnage } from "./personnage";

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
