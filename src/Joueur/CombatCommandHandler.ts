import { Joueur } from "./Joueur";
import { CombatCommandProcessor } from "../CombatManager/CombatCommandProcessor";
import { CombatManager } from "../CombatManager/CombatManager";
import { Personnage } from "../Personnage/personnage";
import { IDamageCalculator } from "../CombatManager/IDamageCalculator";

export class CombatCommandHandler {
  private combatProcessor: CombatCommandProcessor;
  private combatManager: CombatManager | null = null;

  constructor(private joueur: Joueur) {
    this.combatProcessor = new CombatCommandProcessor(this);
  }

  public startCombat(monster: Personnage, damageCalculator: IDamageCalculator): string {
    this.combatManager = new CombatManager(this.joueur.personnage, monster, damageCalculator);
    return "Un monstre se dresse devant vous ! Choisissez votre action de combat : [P] Attaquer, [M] Défendre";
  }

  public processCommand(command: string): string {
    return this.combatProcessor.processCommand(command);
  }

  public endCombat(): void {
    this.combatManager = null;
  }

  public getCombatManager(): CombatManager | null {
    return this.combatManager;
  }
}
