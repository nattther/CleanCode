import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";
import { Direction } from "./Direction";

/**
 * Action qui change l'orientation du joueur vers le Sud et avance.
 */
export class SouthAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Sud);
    return joueur.moveForward();
  }
}
