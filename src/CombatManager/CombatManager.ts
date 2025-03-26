import { Personnage } from "../Personnage/personnage";
import { IDamageCalculator } from "./IDamageCalculator";

export class CombatManager {
  private player: Personnage;
  private monster: Personnage;
  private damageCalculator: IDamageCalculator;

  constructor(
    player: Personnage,
    monster: Personnage,
    damageCalculator: IDamageCalculator
  ) {
    this.player = player;
    this.monster = monster;
    this.damageCalculator = damageCalculator;
  }

  public applyDamage(
    attackerForce: number,
    defenderDefense: number,
    target: Personnage,
    modifier: number = 1
  ): number {
    const rawDamage = this.damageCalculator.calculateDamage(attackerForce, defenderDefense);
    const damage = Math.floor(rawDamage * modifier);
    target.stats.sante = Math.max(target.stats.sante - damage, 0);
    return damage;
  }

  public isCombatOver(): boolean {
    return this.player.stats.sante <= 0 || this.monster.stats.sante <= 0;
  }

  public getWinner(): "joueur" | "monstre" | null {
    if (this.player.stats.sante <= 0) {
      return "monstre";
    } else if (this.monster.stats.sante <= 0) {
      return "joueur";
    }
    return null;
  }

  public getPlayer(): Personnage {
    return this.player;
  }

  public getMonster(): Personnage {
    return this.monster;
  }
}
