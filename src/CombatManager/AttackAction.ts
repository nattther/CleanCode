import { CombatManager } from "./CombatManager";
import { ICombatAction } from "./ICombatAction";

export class AttackAction implements ICombatAction {

  public execute(combatManager: CombatManager): string {
    const playerForce = combatManager.getPlayer().stats.force;
    const monsterDefense = combatManager.getMonster().stats.defense;
    const damage = combatManager.applyDamage(playerForce, monsterDefense, combatManager.getMonster());
    return `Vous attaquez le monstre et lui infligez ${damage} points de dégâts.`;
  }
}
