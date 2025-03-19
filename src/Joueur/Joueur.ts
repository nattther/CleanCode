import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction } from "../Movement/Direction";
import { PlayerMovement } from "./PlayerMovement";
import { PlayerCommandProcessor } from "./PlayerCommandProcessor";


/**
 * Classe représentant un joueur dans le jeu.
 */
export class Joueur {
  public personnage: Personnage;
  private movement: PlayerMovement;
  private commandProcessor: PlayerCommandProcessor;
  private _x: number;
  private _y: number;
  private _orientation: Direction;

  /**
   * Crée une nouvelle instance de Joueur.
   *
   * @param personnage L'instance de Personnage du joueur.
   * @param terrain Le terrain sur lequel le joueur évolue.
   * @param startX Position initiale en X (par défaut 0).
   * @param startY Position initiale en Y (par défaut 0).
   */
  constructor(personnage: Personnage, terrain: Terrain, startX: number = 0, startY: number = 0) {
    this.personnage = personnage;
    this._x = startX;
    this._y = startY;
    this._orientation = Direction.Nord;
    this.movement = new PlayerMovement(this, terrain);
    this.commandProcessor = new PlayerCommandProcessor(this);
  }

  // Getters pour la position et l'orientation.
  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get orientation(): Direction { return this._orientation; }

  /**
   * Définit la nouvelle orientation du joueur.
   *
   * @param direction Nouvelle direction.
   */
  public setOrientation(direction: Direction): void {
    this._orientation = direction;
  }

  /**
   * Met à jour la position du joueur.
   *
   * @param newX Nouvelle position en X.
   * @param newY Nouvelle position en Y.
   */
  public updatePosition(newX: number, newY: number): void {
    this._x = newX;
    this._y = newY;
  }

  /**
   * Déplace le joueur vers l'avant.
   *
   * @returns Message décrivant le résultat du déplacement.
   */
  public moveForward(): string {
    return this.movement.moveForward();
  }

  /**
   * Effectue un virage à gauche.
   *
   * @returns Message indiquant la nouvelle orientation.
   */
  public turnLeftAction(): string {
    return this.movement.turnLeft();
  }

  /**
   * Effectue un virage à droite.
   *
   * @returns Message indiquant la nouvelle orientation.
   */
  public turnRightAction(): string {
    return this.movement.turnRight();
  }

  /**
   * Traite une commande de mouvement.
   *
   * @param command Commande saisie par l'utilisateur.
   * @returns Message résultant de l'exécution de la commande.
   */
  public processCommand(command: string): string {
    return this.commandProcessor.processCommand(command);
  }
}
