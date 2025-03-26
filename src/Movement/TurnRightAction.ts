import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";

export class TurnRightAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    return joueur.turnRightAction();
  }
}
