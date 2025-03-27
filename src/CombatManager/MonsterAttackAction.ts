import { CombatManager } from "./CombatManager";
import { IPlayerAction } from "./IPlayerAction";

/**
 * Classe représentant l'action d'attaque du monstre.
 */
export class MonsterAttackAction implements IPlayerAction {
  /**
   * Exécute l'attaque du monstre en appliquant un modificateur de dégâts.
   *
   * @param combatManager Le gestionnaire de combat en cours.
   * @param modifier Modificateur des dégâts (1 par défaut, 0.5 si le joueur se défend).
   * @return Une chaîne de caractères décrivant l'attaque du monstre.
   */
  execute(combatManager: CombatManager, modifier: number = 1): string {
    const player = combatManager.getPlayer();
    const monster = combatManager.getMonster();
    const damage = combatManager.applyDamage(monster.stats.force, player.stats.defense, player, modifier);
    return `Le monstre attaque et inflige ${damage} points de dégâts. Le joueur a ${player.stats.sante} PV restants.`;
  }
}
