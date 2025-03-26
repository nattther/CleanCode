import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";

export class TurnLeftAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.turnLeftAction();
  }
}
