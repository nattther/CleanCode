import { Joueur } from "./Joueur";
import { Terrain } from "../Terrain/terrain";
import { MovementManager } from "../Movement/MovementManager";
import { Direction } from "../Movement/Direction";

export class PlayerMovement {
  private player: Joueur;
  private movementManager: MovementManager;

  constructor(player: Joueur, terrain: Terrain) {
    this.player = player;
    this.movementManager = new MovementManager(terrain);
  }


  public moveForward(): string {
    const { newX, newY } = this.movementManager.calculateNewPosition(
      this.player.x,
      this.player.y,
      this.player.orientation
    );
    if (!this.movementManager.isWithinGrid(newX, newY)) {
      return this.movementManager.edgeMessage(this.player.orientation);
    }
    const destinationMessage = this.movementManager.checkDestination(newX, newY);
    if (destinationMessage) {

      if (destinationMessage.includes("monstre") || destinationMessage.includes("obstacle")) {
        return destinationMessage;
      }
      this.player.updatePosition(newX, newY);
      return `${destinationMessage} Vous êtes maintenant en position (${newX}, ${newY}).`;
    }
    this.player.updatePosition(newX, newY);
    return `Vous êtes maintenant en position (${newX}, ${newY}).`;
  }


  public turnLeft(): string {
    const leftOrder: Direction[] = [Direction.Nord, Direction.Ouest, Direction.Sud, Direction.Est];
    const currentIndex = leftOrder.indexOf(this.player.orientation);
    const newOrientation = leftOrder[(currentIndex + 1) % leftOrder.length];
    this.player.setOrientation(newOrientation);
    return `Vous faites maintenant face à ${newOrientation}.`;
  }


  public turnRight(): string {
    const rightOrder: Direction[] = [Direction.Nord, Direction.Est, Direction.Sud, Direction.Ouest];
    const currentIndex = rightOrder.indexOf(this.player.orientation);
    const newOrientation = rightOrder[(currentIndex + 1) % rightOrder.length];
    this.player.setOrientation(newOrientation);
    return `Vous faites maintenant face à ${newOrientation}.`;
  }
}
