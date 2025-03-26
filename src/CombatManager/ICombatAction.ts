import { CombatManager } from "./CombatManager";
export interface ICombatAction {
  execute(combatManager: CombatManager): string;
}
