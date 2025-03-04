// src/Joueur/Joueur.ts
import { Personnage } from "../Personnage/personnage";
import { Terrain } from "../Terrain/terrain";
import { Direction, MovementManager } from "./MovementManager";

/**
 * Classe représentant un joueur dans le jeu.
 * Elle encapsule un Personnage (Mage, Guerrier, Voleur, etc.) et délègue la gestion du déplacement.
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
  
    // Définition d'un mapping des commandes à leurs actions associées.
    const commandActions: { [key: string]: () => string } = {
      "N": () => { this.orientation = Direction.Nord; return this.move(this.orientation); },
      "S": () => { this.orientation = Direction.Sud; return this.move(this.orientation); },
      "E": () => { this.orientation = Direction.Est; return this.move(this.orientation); },
      "O": () => { this.orientation = Direction.Ouest; return this.move(this.orientation); },
      "A": () => this.move(this.orientation),
      "G": () => { this.turnLeft(); return `Vous faites maintenant face à ${this.orientation}.`; },
      "D": () => { this.turnRight(); return `Vous faites maintenant face à ${this.orientation}.`; },
    };
  
    // Exécute l'action correspondant à la commande ou retourne un message d'erreur.
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
   * @return {string} Message décrivant le résultat du déplacement.
   */
  private move(direction: Direction): string {
    // Calcul de la nouvelle position.
    const { newX, newY } = this.movementManager.calculateNewPosition(this.x, this.y, direction);
  
    // Vérification des limites de la grille.
    if (!this.movementManager.isWithinGrid(newX, newY)) {
      return this.movementManager.edgeMessage(direction);
    }
  
    // Récupération de la grille pour vérifier la case actuelle.
    const grid = this.movementManager['terrain'].getGrid();
    const currentCase = grid[this.y][this.x];
  
    // Vérification si un mur bloque le déplacement.
    if (this.movementManager.isBlocked(currentCase, direction)) {
      return "Un obstacle vous bloque le passage. Vous ne pouvez pas aller par là.";
    }
  
    // Vérification du contenu de la case destination.
    const destinationMessage = this.movementManager.checkDestination(newX, newY);
    if (destinationMessage !== "") {
      // Si c'est un monstre, ne pas mettre à jour la position.
      if (destinationMessage.includes("monstre")) {
        return destinationMessage;
      }
      // Si un trésor est trouvé, mettre à jour la position et retourner le message.
      this.updatePosition(newX, newY);
      return `${destinationMessage} Vous êtes maintenant en position (${this.x}, ${this.y}).`;
    }
  
    // Déplacement normal, mise à jour de la position.
    this.updatePosition(newX, newY);
    return `Vous êtes maintenant en position (${this.x}, ${this.y}).`;
  }
  


/**
 * Change l'orientation du joueur vers la gauche.
 */
private turnLeft(): void {
    // Ordre des directions pour tourner à gauche.
    const leftOrder: Direction[] = [Direction.Nord, Direction.Ouest, Direction.Sud, Direction.Est];
    const currentIndex = leftOrder.indexOf(this.orientation);
    this.orientation = leftOrder[(currentIndex + 1) % leftOrder.length];
  }
  
  /**
   * Change l'orientation du joueur vers la droite.
   */
  private turnRight(): void {
    // Ordre des directions pour tourner à droite.
    const rightOrder: Direction[] = [Direction.Nord, Direction.Est, Direction.Sud, Direction.Ouest];
    const currentIndex = rightOrder.indexOf(this.orientation);
    this.orientation = rightOrder[(currentIndex + 1) % rightOrder.length];
  }
  
}
