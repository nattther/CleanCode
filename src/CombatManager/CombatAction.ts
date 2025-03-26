import { Personnage } from "../Personnage/personnage";
import { CombatManager } from "./CombatManager";
import { DamageCalculator } from "./DamageCalculator";
import { AttackAction } from "./AttackAction";
import { Monstre } from "../Monstre/Monstre";

export class CombatAction {

  execute(player: Personnage): string {
    const monster = this.createMonster();
    const damageCalculator = new DamageCalculator();
    const combatManager = new CombatManager(player, monster, damageCalculator);
    let combatLog = "";

    while (!combatManager.isCombatOver()) {
      const roundMessage = new AttackAction().execute(combatManager);
      combatLog += roundMessage + "\n";
    }
    if (combatManager.getWinner() === "joueur") {
      combatLog += "Vous avez vaincu le monstre !";
    } else {
      combatLog += "Vous avez été vaincu par le monstre !";
    }
    return combatLog;
  }
  
  private createMonster(): Personnage {
    return new Monstre("Monstre");
  }
  
  }

