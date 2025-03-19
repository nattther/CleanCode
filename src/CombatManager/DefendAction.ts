import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";

/**
 * Action de défense du joueur.
 */
export class DefendAction implements IPlayerAction {
  /**
   * Exécute l'action de défense.
   *
   * @param combatManager L'instance du CombatManager.
   * @returns Le message résultant de la défense.
   */
  execute(combatManager: CombatManager): string {
    return combatManager.doDefend();
  }
}
