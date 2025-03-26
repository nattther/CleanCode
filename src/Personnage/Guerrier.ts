import { Personnage } from "./personnage";
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
