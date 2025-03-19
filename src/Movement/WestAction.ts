import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";
import { Direction } from "./Direction";

/**
 * Action qui change l'orientation du joueur vers l'Ouest et avance.
 */
export class WestAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Ouest);
    return joueur.moveForward();
  }
}
