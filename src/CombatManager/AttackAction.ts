import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";


export class AttackAction implements IPlayerAction {

  execute(combatManager: CombatManager): string {
    return combatManager.doAttack();
  }
}
