import { Terrain } from "../Terrain/terrain";
import { Direction } from "./Direction";
import { GridValidator } from "./GridValidator";


export class MovementManager {
  private terrain: Terrain;
  private gridValidator: GridValidator;

  constructor(terrain: Terrain) {
    this.terrain = terrain;
    this.gridValidator = new GridValidator(terrain);
  }


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


   public clearCell(x: number, y: number): void {
    this.terrain.clearCell(x, y);
  }

  public getTerrain(): Terrain {
    return this.terrain;
  }
}
