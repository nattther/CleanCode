// ICombatAction.ts
import { CombatManager } from "./CombatManager";

/**
 * Interface pour les actions de combat.
 */
export interface ICombatAction {
  /**
   * Exécute l'action de combat.
   * @param combatManager L'instance de CombatManager gérant le combat.
   * @return string Résultat de l'action.
   */
  execute(combatManager: CombatManager): string;
}
