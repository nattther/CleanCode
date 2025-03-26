import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction } from "../Movement/Direction";
import { PlayerMovement } from "../Movement/PlayerMovement";
import { PlayerCommandProcessor } from "./PlayerCommandProcessor";

import { CombatManager } from "../CombatManager/CombatManager";
import { DefaultDamageCalculator } from "../CombatManager/DefaultDamageCalculator";
import { CombatCommandProcessor } from "../CombatManager/CombatCommandProcessor";

export class Joueur {
  public personnage: Personnage;
  private terrain: Terrain;
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
    this.terrain = terrain;
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

  public startCombat(monster: Personnage): string {
    const damageCalculator = new DefaultDamageCalculator();
    this.combatManager = new CombatManager(this.personnage, monster, damageCalculator);
    this.inCombat = true;
    return "Un monstre se dresse devant vous ! Choisissez votre action de combat : [A]ttaquer, [D]éfendre, [F]uir.";
  }

  public getCombatManager(): CombatManager | null {
    return this.combatManager;
  }

  public endCombat(): void {
    this.terrain.clearCell(this._x, this._y);
    this.inCombat = false;
    this.combatManager = null;
  }

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
