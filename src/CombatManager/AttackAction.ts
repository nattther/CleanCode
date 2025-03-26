import { IPlayerAction } from "./IPlayerAction";
import { CombatManager } from "./CombatManager";
import { MonsterAttackAction } from "./MonsterAttackAction";

export class AttackAction implements IPlayerAction {
  execute(combatManager: CombatManager): string {
    const player = combatManager.getPlayer();
    const monster = combatManager.getMonster();
    const damage = combatManager.applyDamage(player.stats.force, monster.stats.defense, monster);
    let message = `Le joueur attaque et inflige ${damage} points de dégâts. Le monstre a ${monster.stats.sante} PV restants.`;
    if (!combatManager.isCombatOver()) {
      message += "\n" + new MonsterAttackAction().execute(combatManager);
    } else {
      message += "\nLe monstre est vaincu !";
    }
    return message;
  }
}





