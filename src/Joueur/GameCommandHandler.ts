import { Joueur } from "./Joueur";
import { Terrain } from "../Terrain/terrain";
import { ExplorationCommandHandler } from "./ExplorationCommandHandler";
import { CombatCommandHandler } from "./CombatCommandHandler";
import { DefaultDamageCalculator } from "../CombatManager/DefaultDamageCalculator";
import { Personnage } from "../Personnage/personnage";

export class GameCommandHandler {
  private explorationHandler: ExplorationCommandHandler;
  private combatHandler: CombatCommandHandler | null = null;

  constructor(private joueur: Joueur, terrain: Terrain) {
    this.explorationHandler = new ExplorationCommandHandler(joueur, terrain, (monster, newX, newY) => {
      return this.startCombat(monster);
    });
  }

  public processCommand(command: string): string {
    if (this.combatHandler) {
      const result = this.combatHandler.processCommand(command);
      if (!this.combatHandler.getCombatManager()) {
        this.combatHandler = null;
      }
      return result;
    }
    return this.explorationHandler.processCommand(command);
  }

  public startCombat(monster: Personnage): string {
    this.combatHandler = new CombatCommandHandler(this.joueur);
    return this.combatHandler.startCombat(monster, new DefaultDamageCalculator());
  }
}
