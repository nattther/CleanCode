import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";

/**
 * Action qui fait tourner le joueur vers la gauche.
 */
export class TurnLeftAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.turnLeftAction();
  }
}
