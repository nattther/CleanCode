import { CombatManager } from "./CombatManager";
import { ICombatAction } from "./ICombatAction";
export class DefendAction implements ICombatAction {

  public execute(combatManager: CombatManager): string {
    return "Vous vous défendez contre l'attaque du monstre.";
  }
}
