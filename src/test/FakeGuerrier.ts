import { Personnage, Stats } from "../Personnage/personnage";


export class FakeGuerrier extends Personnage {

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
  
  public afficherInfos(): string {
    return super.afficherInfos();
  }
}
