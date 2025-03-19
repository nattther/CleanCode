import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";
import { Direction } from "./Direction";

/**
 * Action qui change l'orientation du joueur vers l'Est et avance.
 */
export class EastAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Est);
    return joueur.moveForward();
  }
}
