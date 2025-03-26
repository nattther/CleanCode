import { CombatManager } from "./CombatManager";

export interface IPlayerAction {
  execute(combatManager: CombatManager): string;
}