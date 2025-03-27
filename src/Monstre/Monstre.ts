import { Personnage } from "../Personnage/personnage";
import { Stats } from "../Personnage/Stats";

export class Monstre extends Personnage {
  protected getDefaultStats(): Stats {
    return {
      force: 15,
      intelligence: 5,
      defense: 3,
      resistanceMagique: 2,
      vitesse: 6,
      chance: 4,
      endurance: 7,
      esprit: 3,
      sante: 20,
      mana: 0,
    };
  }
}
