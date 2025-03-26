import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";


export class DefendAction implements IPlayerAction {

  execute(combatManager: CombatManager): string {
    return combatManager.doDefend();
  }
}
