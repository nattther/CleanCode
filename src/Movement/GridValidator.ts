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


  public checkDestination(newX: number, newY: number): string {
    const grid = this.terrain.getGrid();
    const destinationCase = grid[newY][newX];
    const destinationMapping: Record<string, string> = {
      [CellContent.Monstre]: "Un monstre bloque votre chemin ! Vous devez le vaincre pour avancer.",
      [CellContent.Tresor]: "Vous avez trouvé un trésor !",
      [CellContent.Mur]: "Un obstacle vous bloque le passage. Vous ne pouvez pas aller par là.",
    };
    return destinationMapping[destinationCase.content] || "";
  }
}
