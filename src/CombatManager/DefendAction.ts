import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";

export class DefendAction implements IPlayerAction {

  execute(combatManager: CombatManager): string {
    const player = combatManager.getPlayer();
    const monster = combatManager.getMonster();
    const damage = combatManager.applyDamage(monster.stats.force, player.stats.defense, player, 0.5);
    return `Le joueur se défend. Le monstre attaque et inflige ${damage} points de dégâts réduits. Le joueur a ${player.stats.sante} PV restants.`;
  }
}
