import { IMovementAction } from "./IMovementAction";
import { Joueur } from "../Joueur/Joueur";
import { Direction } from "./Direction";

export class SouthAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Sud);
    return joueur.moveForward();
  }
}
