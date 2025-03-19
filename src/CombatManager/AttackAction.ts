import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";

/**
 * Action d'attaque du joueur.
 */
export class AttackAction implements IPlayerAction {
  /**
   * Exécute l'action d'attaque.
   *
   * @param combatManager L'instance du CombatManager.
   * @returns Le message résultant de l'attaque.
   */
  execute(combatManager: CombatManager): string {
    return combatManager.doAttack();
  }
}
