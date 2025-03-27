import { Personnage } from "../Personnage/personnage";
import { createMonster } from "../Monstre/monsterFactory";

export class MonsterHandler implements CaseHandler {
  constructor(private onMonsterEncounter: (monster: Personnage, x: number, y: number) => string) {}
  handle(newX: number, newY: number): string {
    const monster = createMonster();
    return this.onMonsterEncounter(monster, newX, newY);
  }
}
