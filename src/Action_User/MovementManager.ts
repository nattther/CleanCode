import { Terrain } from "../Terrain/terrain";
import { CellContent } from "../Terrain/case";

/**
 * Enumération des directions pour l'orientation du joueur.
 */
export enum Direction {
  Nord = "N",  // Représente le Nord.
  Est = "E",   // Représente l'Est.
  Sud = "S",   // Représente le Sud.
  Ouest = "O", // Représente l'Ouest.
}

/**
 * Classe qui gère la logique de déplacement sur le terrain.
 */
export class MovementManager {
  private terrain: Terrain;

  /**
   * Initialise le gestionnaire avec le terrain de jeu.
   *
   * @param terrain Le terrain sur lequel le déplacement se fait.
   */
  constructor(terrain: Terrain) {
    this.terrain = terrain;
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
