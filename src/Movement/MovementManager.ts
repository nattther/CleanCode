import { Terrain } from "../Terrain/terrain";
import { Direction } from "./Direction";
import { GridValidator } from "./GridValidator";

/**
 * Classe qui gère la logique de déplacement sur le terrain.
 */
export class MovementManager {
  private terrain: Terrain;
  private gridValidator: GridValidator;

  /**
   * Initialise le gestionnaire avec le terrain de jeu.
   *
   * @param terrain Le terrain sur lequel le déplacement se fait.
   */
  constructor(terrain: Terrain) {
    this.terrain = terrain;
    this.gridValidator = new GridValidator(terrain);
  }

  /**
   * Calcule la nouvelle position en fonction de la position actuelle et de la direction.
   *
   * @param x Position actuelle en X.
   * @param y Position actuelle en Y.
   * @param direction La direction du déplacement.
   * @returns Un objet contenant les nouvelles coordonnées { newX, newY }.
   */
  public calculateNewPosition(
    x: number,
    y: number,
    direction: Direction
  ): { newX: number; newY: number } {
    const offsets: Record<Direction, { dx: number; dy: number }> = {
      [Direction.Nord]: { dx: 0, dy: 1 },
      [Direction.Sud]: { dx: 0, dy: -1 },
      [Direction.Est]: { dx: 1, dy: 0 },
      [Direction.Ouest]: { dx: -1, dy: 0 },
    };

    const offset = offsets[direction];
    return { newX: x + offset.dx, newY: y + offset.dy };
  }

  public isWithinGrid(newX: number, newY: number): boolean {
    return this.gridValidator.isWithinGrid(newX, newY);
  }

  public edgeMessage(direction: Direction): string {
    return this.gridValidator.edgeMessage(direction);
  }

  public checkDestination(newX: number, newY: number): string {
    return this.gridValidator.checkDestination(newX, newY);
  }
}
