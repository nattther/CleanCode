import { CombatManager } from "./CombatManager";
import { IPlayerAction } from "./IPlayerAction";


export class MonsterAttackAction implements IPlayerAction {
  execute(combatManager: CombatManager): string {
    const player = combatManager.getPlayer();
    const monster = combatManager.getMonster();
    const damage = combatManager.applyDamage(monster.stats.force, player.stats.defense, player);
    return `Le monstre attaque et inflige ${damage} points de dégâts. Le joueur a ${player.stats.sante} PV restants.`;
  }
}
