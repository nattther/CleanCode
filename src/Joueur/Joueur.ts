import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction } from "../Movement/Direction";
import { PlayerMovement } from "../Movement/PlayerMovement";
import { PlayerCommandProcessor } from "./PlayerCommandProcessor";



export class Joueur {
  public personnage: Personnage;
  private movement: PlayerMovement;
  private commandProcessor: PlayerCommandProcessor;
  private _x: number;
  private _y: number;
  private _orientation: Direction;

  constructor(personnage: Personnage, terrain: Terrain, startX: number = 0, startY: number = 0) {
    this.personnage = personnage;
    this._x = startX;
    this._y = startY;
    this._orientation = Direction.Nord;
    this.movement = new PlayerMovement(this,personnage, terrain);
    this.commandProcessor = new PlayerCommandProcessor(this);
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


  public moveForward(): string {
    return this.movement.moveForward();
  }


  public turnLeftAction(): string {
    return this.movement.turnLeft();
  }

  public turnRightAction(): string {
    return this.movement.turnRight();
  }

  public processCommand(command: string): string {
    return this.commandProcessor.processCommand(command);
  }
}
