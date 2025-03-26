import { IMovementAction } from "./IMovementAction";

import { Direction } from "./Direction";
import { Joueur } from "../Joueur/Joueur";


export class NorthAction implements IMovementAction {
  public execute(joueur: Joueur): string {
    joueur.setOrientation(Direction.Nord);
    return joueur.moveForward();
  }
}
