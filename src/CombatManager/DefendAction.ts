// DefendAction.ts
import { CombatManager } from "./CombatManager";
import { ICombatAction } from "./ICombatAction";

/**
 * Action de défense lors du combat.
 */
export class DefendAction implements ICombatAction {
  /**
   * Exécute l'action de défense.
   * @param combatManager L'instance de CombatManager.
   * @return string Résultat de la défense.
   */
  public execute(combatManager: CombatManager): string {
    // Implémentez ici votre logique de défense (ex. réduction des dégâts pour le prochain tour)
    return "Vous vous défendez contre l'attaque du monstre.";
  }
}
