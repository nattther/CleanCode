import { Personnage } from "./personnage";
import { Stats } from "./Stats";
export class Voleur extends Personnage {
  protected getDefaultStats(): Stats {
    return {
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
