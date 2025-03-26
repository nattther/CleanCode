// Joueur.ts
import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction } from "../Movement/Direction";
import { PlayerMovement } from "../Movement/PlayerMovement";
import { PlayerCommandProcessor } from "./PlayerCommandProcessor";
import { CombatCommandProcessor } from "../CombatManager/CombatCommandProcessor";
import { CombatManager } from "../CombatManager/CombatManager";
import { DefaultDamageCalculator } from "../CombatManager/DefaultDamageCalculator";


/**
 * Classe représentant le joueur.
 */
export class Joueur {
  public personnage: Personnage;
  private movement: PlayerMovement;
  private commandProcessor: PlayerCommandProcessor;
  private combatProcessor: CombatCommandProcessor;
  private _x: number;
  private _y: number;
  private _orientation: Direction;
  private inCombat: boolean = false;
  private combatManager: CombatManager | null = null;

  constructor(personnage: Personnage, terrain: Terrain, startX: number = 0, startY: number = 0) {
    this.personnage = personnage;
    this._x = startX;
    this._y = startY;
    this._orientation = Direction.Nord;
    this.movement = new PlayerMovement(this, personnage, terrain);
    this.commandProcessor = new PlayerCommandProcessor(this);
    this.combatProcessor = new CombatCommandProcessor(this);
  }

  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get orientation(): Direction { return this._orientation; }

  public setOrientation(direction: Direction): void {
    this._orientation = direction;
  }

  public updatePosition(newX: number, newY: number): void {
    this._x = newX;
    this._y = newY;
  }

  /**
   * Démarre le mode combat en instanciant un CombatManager.
   * @param monster Le monstre rencontré.
   * @return string Message invitant l'utilisateur à choisir une action de combat.
   */
  public startCombat(monster: Personnage): string {
    const damageCalculator = new DefaultDamageCalculator();
    this.combatManager = new CombatManager(this.personnage, monster, damageCalculator);
    this.inCombat = true;
    return "Un monstre se dresse devant vous ! Choisissez votre action de combat : [A]ttaquer, [D]éfendre, [F]uir.";
  }

  /**
   * Retourne l'instance actuelle du CombatManager.
   * @return CombatManager | null
   */
  public getCombatManager(): CombatManager | null {
    return this.combatManager;
  }

  /**
   * Termine le mode combat.
   */
  public endCombat(): void {
    this.inCombat = false;
    this.combatManager = null;
  }

  /**
   * Traite la commande saisie par l'utilisateur.
   * En mode combat, délègue au processeur de combat.
   * @param command La commande saisie.
   * @return string Résultat de l'action.
   */
  public processCommand(command: string): string {
    if (this.inCombat) {
      return this.combatProcessor.processCommand(command);
    }
    return this.commandProcessor.processCommand(command);
  }

  public moveForward(): string {
    return this.movement.moveForward();
  }

  public turnLeftAction(): string {
    return this.movement.turnLeft();
  }

  public turnRightAction(): string {
    return this.movement.turnRight();
  }
}
