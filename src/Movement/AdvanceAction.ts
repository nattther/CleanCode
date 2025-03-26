import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";


export class AdvanceAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.moveForward();
  }
}
