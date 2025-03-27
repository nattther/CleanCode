import { CombatManager } from "../CombatManager/CombatManager";
import { AttackAction } from "../CombatManager/AttackAction";
import { DefendAction } from "../CombatManager/DefendAction";
import { MonsterAttackAction } from "../CombatManager/MonsterAttackAction";
import { Joueur } from "../Joueur/Joueur";
import { ICombatAction } from "./ICombatAction";
import { IMonsterAction } from "./IMonsterAction";

export class CombatCommandProcessor {
  private player: Joueur;
  private combatActions: { [key: string]: ICombatAction };
  private monsterActions: IMonsterAction[];

  constructor(player: Joueur) {
    this.player = player;
    this.combatActions = {
      "P": new AttackAction(),
      "M": new DefendAction(),
    };
    this.monsterActions = [
      new MonsterAttackAction(),
    ];
  }

  public processCommand(command: string): string {
    const combatManager: CombatManager | null = this.player.getCombatManager();
    if (!combatManager) return "Aucun combat en cours.";
    
    const actionKey = command.toUpperCase();
    const action = this.combatActions[actionKey];
    if (!action)
      return "Commande de combat invalide. Choisissez [P] pour attaquer, [M] pour défendre";
    
    let result = action.execute(combatManager);
    const endAfterPlayer = this.handleCombatEnd(combatManager, result);
    if (endAfterPlayer) return endAfterPlayer;
    
    const modifier = actionKey === "M" ? 0.5 : 1;
    for (const monsterAction of this.monsterActions) {
      result += "\n" + monsterAction.execute(combatManager, modifier);
      const endAfterMonster = this.handleCombatEnd(combatManager, result);
      if (endAfterMonster) return endAfterMonster;
    }
    
    return result;
  }

  private handleCombatEnd(combatManager: CombatManager, currentResult: string): string | null {
    if (combatManager.isCombatOver()) {
      const winner = combatManager.getWinner();
      this.player.endCombat();
      return currentResult + ` Combat terminé. Vainqueur : ${winner}.`;
    }
    return null;
  }
}
