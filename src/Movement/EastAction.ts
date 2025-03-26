import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";
import { Direction } from "./Direction";


export class EastAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Est);
    return joueur.moveForward();
  }
}
