import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction, MovementManager } from "./MovementManager";

/**
 * Classe représentant un joueur dans le jeu.
 * Elle encapsule un Personnage et délègue la gestion du déplacement.
 */
export class Joueur {
  public personnage: Personnage;
  public x: number;
  public y: number;
  public orientation: Direction;
  private movementManager: MovementManager;

  /**
   * Crée une nouvelle instance de Joueur.
   *
   * @param personnage L'instance de Personnage (Mage, Guerrier, Voleur, etc.)
   * @param terrain Le terrain sur lequel le joueur évolue.
   * @param startX Position initiale en X (colonne), par défaut 0.
   * @param startY Position initiale en Y (ligne), par défaut 0.
   */
  constructor(personnage: Personnage, terrain: Terrain, startX: number = 0, startY: number = 0) {
    this.personnage = personnage;
    this.x = startX;
    this.y = startY;
    this.orientation = Direction.Nord;
    // Injection de la dépendance MovementManager via le terrain.
    this.movementManager = new MovementManager(terrain);
  }

  /**
   * Traite une commande de déplacement ou de rotation.
   *
   * @param command La commande à traiter.
   * @returns Un message décrivant l'action effectuée.
   */
  public processCommand(command: string): string {
    command = command.toUpperCase();

    // Mapping des commandes aux actions associées.
    const commandActions: { [key: string]: () => string } = {
      "N": () => {
        this.orientation = Direction.Nord;
        return this.move(this.orientation);
      },
      "S": () => {
        this.orientation = Direction.Sud;
        return this.move(this.orientation);
      },
      "E": () => {
        this.orientation = Direction.Est;
        return this.move(this.orientation);
      },
      "O": () => {
        this.orientation = Direction.Ouest;
        return this.move(this.orientation);
      },
      "A": () => this.move(this.orientation),
      "G": () => {
        this.turnLeft();
        return `Vous faites maintenant face à ${this.orientation}.`;
      },
      "D": () => {
        this.turnRight();
        return `Vous faites maintenant face à ${this.orientation}.`;
      },
    };

    const action = commandActions[command];
    return action ? action() : "Commande invalide.";
  }

  /**
   * Met à jour la position du joueur.
   *
   * @param newX Nouvelle position en X.
   * @param newY Nouvelle position en Y.
   */
  private updatePosition(newX: number, newY: number): void {
    this.x = newX;
    this.y = newY;
  }

  /**
   * Déplace le joueur dans la direction donnée.
   *
   * @param direction La direction du déplacement.
   * @returns Message décrivant le résultat du déplacement.
   */
  private move(direction: Direction): string {
    const { newX, newY } = this.movementManager.calculateNewPosition(this.x, this.y, direction);

    // Vérifie si la nouvelle position est dans les limites du terrain.
    if (!this.movementManager.isWithinGrid(newX, newY)) {
      return this.movementManager.edgeMessage(direction);
    }

    // Vérifie le contenu de la case destination.
    const destinationMessage = this.movementManager.checkDestination(newX, newY);
    if (destinationMessage !== "") {
      // Bloque le déplacement en cas de monstre ou d'obstacle.
      if (destinationMessage.includes("monstre") || destinationMessage.includes("obstacle")) {
        return destinationMessage;
      }
      // Pour un trésor, on met à jour la position et renvoie le message approprié.
      this.updatePosition(newX, newY);
      return `${destinationMessage} Vous êtes maintenant en position (${this.x}, ${this.y}).`;
    }

    // Déplacement classique sans événement particulier.
    this.updatePosition(newX, newY);
    return `Vous êtes maintenant en position (${this.x}, ${this.y}).`;
  }

  /**
   * Change l'orientation du joueur vers la gauche.
   */
  private turnLeft(): void {
    const leftOrder: Direction[] = [Direction.Nord, Direction.Ouest, Direction.Sud, Direction.Est];
    const currentIndex = leftOrder.indexOf(this.orientation);
    this.orientation = leftOrder[(currentIndex + 1) % leftOrder.length];
  }

  /**
   * Change l'orientation du joueur vers la droite.
   */
  private turnRight(): void {
    const rightOrder: Direction[] = [Direction.Nord, Direction.Est, Direction.Sud, Direction.Ouest];
    const currentIndex = rightOrder.indexOf(this.orientation);
    this.orientation = rightOrder[(currentIndex + 1) % rightOrder.length];
  }
}
