import { Terrain } from "../Terrain/terrain";
import { Direction } from "./Direction";
import { CellContent } from "../Terrain/case";

/**
 * Classe responsable de la validation du terrain et de la gestion des messages liés aux cases.
 */
export class GridValidator {
  private terrain: Terrain;

  /**
   * Initialise le validateur avec le terrain.
   *
   * @param terrain Le terrain sur lequel la validation est effectuée.
   */
  constructor(terrain: Terrain) {
    this.terrain = terrain;
  }

  /**
   * Vérifie si la nouvelle position se trouve dans les limites du terrain.
   *
   * @param newX Nouvelle position en X.
   * @param newY Nouvelle position en Y.
   * @returns True si la position est valide, sinon false.
   */
  public isWithinGrid(newX: number, newY: number): boolean {
    const grid = this.terrain.getGrid();
    return newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length;
  }

  /**
   * Retourne un message indiquant que le bord du terrain est atteint.
   *
   * @param direction La direction tentée.
   * @returns Le message d'erreur approprié.
   */
  public edgeMessage(direction: Direction): string {
    const dirTextMapping: Record<Direction, string> = {
      [Direction.Nord]: "Nord",
      [Direction.Sud]: "Sud",
      [Direction.Est]: "Est",
      [Direction.Ouest]: "Ouest",
    };
    return `Vous avez atteint le bord du monde. Vous ne pouvez pas aller plus au ${dirTextMapping[direction]}.`;
  }

  /**
   * Vérifie le contenu de la case destination et retourne un message adapté.
   *
   * @param newX Nouvelle position en X.
   * @param newY Nouvelle position en Y.
   * @returns Un message si la case contient un monstre, un trésor ou un mur, sinon une chaîne vide.
   */
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
