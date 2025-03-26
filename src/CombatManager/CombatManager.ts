import { Personnage } from "../Personnage/personnage";
import { IDamageCalculator } from "./IDamageCalculator";


export class CombatManager {
  private player: Personnage;
  private monster: Personnage;
  private isPlayerDefending: boolean = false;
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


  public executeAction(action: { execute(combatManager: CombatManager): string }): string {
    return action.execute(this);
  }


  public doAttack(): string {
    const damage = this.damageCalculator.calculateDamage(
      this.player.stats.force,
      this.monster.stats.defense
    );
    this.monster.stats.sante = Math.max(this.monster.stats.sante - damage, 0);
    let message = `Le joueur attaque et inflige ${damage} points de dégâts. Le monstre a ${this.monster.stats.sante} PV restants.`;


    message += this.monster.stats.sante > 0 ? "\n" + this.monsterTurn() : "\nLe monstre est vaincu !";
    return message;
  }


  public doDefend(): string {
    this.isPlayerDefending = true;
    let message = "Le joueur se prépare à défendre. ";
    message += this.monsterTurn();
    return message;
  }


  private monsterTurn(): string {
    if (this.isCombatOver()) {
      return "";
    }
    let damage = this.damageCalculator.calculateDamage(
      this.monster.stats.force,
      this.player.stats.defense
    );
    if (this.isPlayerDefending) {
      damage = Math.floor(damage / 2);
      this.isPlayerDefending = false;
    }
    this.player.stats.sante = Math.max(this.player.stats.sante - damage, 0);
    return `Le monstre attaque et inflige ${damage} points de dégâts. Le joueur a ${this.player.stats.sante} PV restants.`;
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
}
