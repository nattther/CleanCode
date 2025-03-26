
import { CombatManager } from "../CombatManager/CombatManager";
import { AttackAction } from "../CombatManager/AttackAction";
import { DefendAction } from "../CombatManager/DefendAction";
import { Joueur } from "../Joueur/Joueur";
import { ICombatAction } from "./ICombatAction";


/**
 * Processeur dédié aux commandes de combat.
 */
export class CombatCommandProcessor {
  private player: Joueur;
  private combatActions: { [key: string]: ICombatAction };

  constructor(player: Joueur) {
    this.player = player;
    // Mapping des commandes de combat
    this.combatActions = {
      "A": new AttackAction(),
      "D": new DefendAction(),
    };
  }

  /**
   * Traite la commande de combat.
   * @param command La commande saisie.
   * @return string Résultat de l'action de combat.
   */
  public processCommand(command: string): string {
    const action = this.combatActions[command.toUpperCase()];
    if (!action) {
      return "Commande de combat invalide. Choisissez [A] pour attaquer, [D] pour défendre, ou [F] pour fuir.";
    }
    const combatManager: CombatManager | null = this.player.getCombatManager();
    if (!combatManager) {
      return "Aucun combat en cours.";
    }
    const result = action.execute(combatManager);
    // Si le combat est terminé après l'action, on récupère le vainqueur et on termine le combat
    if (combatManager.isCombatOver()) {
      const winner = combatManager.getWinner();
      this.player.endCombat();
      return result + ` Combat terminé. Vainqueur : ${winner}.`;
    }
    return result;
  }
}
