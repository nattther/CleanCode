
import { CombatManager } from "../CombatManager/CombatManager";
import { AttackAction } from "../CombatManager/AttackAction";
import { DefendAction } from "../CombatManager/DefendAction";
import { Joueur } from "../Joueur/Joueur";
import { ICombatAction } from "./ICombatAction";

export class CombatCommandProcessor {
  private player: Joueur;
  private combatActions: { [key: string]: ICombatAction };

  constructor(player: Joueur) {
    this.player = player;
    this.combatActions = {
      "P": new AttackAction(),
      "M": new DefendAction(),
    };
  }

  public processCommand(command: string): string {
    const action = this.combatActions[command.toUpperCase()];
    if (!action) {
      return "Commande de combat invalide. Choisissez [P] pour attaquer, [M] pour défendre";
    }
    const combatManager: CombatManager | null = this.player.getCombatManager();
    if (!combatManager) {
      return "Aucun combat en cours.";
    }
    const result = action.execute(combatManager);
    if (combatManager.isCombatOver()) {
      const winner = combatManager.getWinner();
      this.player.endCombat();
      return result + ` Combat terminé. Vainqueur : ${winner}.`;
    }
    return result;
  }
}
