import { Terrain } from "../Terrain/terrain";
import { Direction } from "./Direction";
import { CellContent } from "../Terrain/case";


export class GridValidator {
  private terrain: Terrain;

  constructor(terrain: Terrain) {
    this.terrain = terrain;
  }

  public isWithinGrid(newX: number, newY: number): boolean {
    const grid = this.terrain.getGrid();
    return newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length;
  }


  public edgeMessage(direction: Direction): string {
    const dirTextMapping: Record<Direction, string> = {
      [Direction.Nord]: "Nord",
      [Direction.Sud]: "Sud",
      [Direction.Est]: "Est",
      [Direction.Ouest]: "Ouest",
    };
    return `Vous avez atteint le bord du monde. Vous ne pouvez pas aller plus au ${dirTextMapping[direction]}.`;
  }
}
