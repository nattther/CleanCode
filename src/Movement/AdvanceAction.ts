import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";

/**
 * Action qui avance dans la direction actuelle du joueur.
 */
export class AdvanceAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.moveForward();
  }
}
