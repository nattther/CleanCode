import { Personnage } from "./personnage";
import { Stats } from "./Stats";
export class Mage extends Personnage {
  protected getDefaultStats(): Stats {
    return {
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
