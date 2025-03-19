import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";

/**
 * Action qui fait tourner le joueur vers la droite.
 */
export class TurnRightAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.turnRightAction();
  }
}
