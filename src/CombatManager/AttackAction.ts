// AttackAction.ts
import { CombatManager } from "./CombatManager";
import { ICombatAction } from "./ICombatAction";

/**
 * Action d'attaque lors du combat.
 */
export class AttackAction implements ICombatAction {
  /**
   * Exécute l'action d'attaque.
   * @param combatManager L'instance de CombatManager.
   * @return string Résultat de l'attaque.
   */
  public execute(combatManager: CombatManager): string {
    const playerForce = combatManager.getPlayer().stats.force;
    const monsterDefense = combatManager.getMonster().stats.defense;
    const damage = combatManager.applyDamage(playerForce, monsterDefense, combatManager.getMonster());
    return `Vous attaquez le monstre et lui infligez ${damage} points de dégâts.`;
  }
}
