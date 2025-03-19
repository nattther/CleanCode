import { IMovementAction } from "./IMovementAction";

import { Direction } from "./Direction";
import { Joueur } from "../Joueur/Joueur";

/**
 * Action qui change l'orientation du joueur vers le Nord et avance.
 */
export class NorthAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Nord);
    return joueur.moveForward();
  }
}
