import { CombatManager } from "../CombatManager/CombatManager";
import { AttackAction } from "../CombatManager/AttackAction";
import { DefendAction } from "../CombatManager/DefendAction";
import { MonsterAttackAction } from "../CombatManager/MonsterAttackAction";
import { Joueur } from "../Joueur/Joueur";
import { ICombatAction } from "./ICombatAction";

/**
 * Classe de traitement des commandes de combat.
 */
export class CombatCommandProcessor {
  private player: Joueur;
  private combatActions: { [key: string]: ICombatAction };

  constructor(player: Joueur) {
    this.player = player;
    // Association des commandes aux actions (attaque ou défense).
    this.combatActions = {
      "P": new AttackAction(),
      "M": new DefendAction(),
    };
  }

  /**
   * Traite la commande de combat et gère tour à tour l'action du joueur puis celle du monstre.
   *
   * @param command La commande du joueur (ex: "P" pour attaquer, "M" pour défendre).
   * @return Le résultat de l'action de combat, incluant la riposte du monstre.
   */
  public processCommand(command: string): string {
    const combatManager: CombatManager | null = this.player.getCombatManager();
    if (!combatManager) {
      return "Aucun combat en cours.";
    }

    const action = this.combatActions[command.toUpperCase()];
    if (!action) {
      return "Commande de combat invalide. Choisissez [P] pour attaquer, [M] pour défendre";
    }

    // Action du joueur
    let result = action.execute(combatManager);

    // Vérifie si le combat est terminé après l'action du joueur.
    if (combatManager.isCombatOver()) {
      const winner = combatManager.getWinner();
      this.player.endCombat();
      return result + ` Combat terminé. Vainqueur : ${winner}.`;
    }

    // Si le joueur s'est défendu, on applique un modificateur de 0.5 pour réduire les dégâts du monstre.
    let modifier = command.toUpperCase() === "M" ? 0.5 : 1;

    // Tour de l'attaque du monstre avec le modificateur approprié.
    const monsterAction = new MonsterAttackAction();
    const monsterResult = monsterAction.execute(combatManager, modifier);
    result += "\n" + monsterResult;

    // Vérifie si le combat est terminé après l'attaque du monstre.
    if (combatManager.isCombatOver()) {
      const winner = combatManager.getWinner();
      this.player.endCombat();
      return result + ` Combat terminé. Vainqueur : ${winner}.`;
    }

    return result;
  }
}
