import { CombatManager } from "./CombatManager";

export interface IMonsterAction {
  execute(combatManager: CombatManager, modifier: number): string;
}
