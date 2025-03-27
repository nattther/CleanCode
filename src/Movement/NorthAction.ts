import { IMovementAction } from "./IMovementAction";
import { Direction } from "./Direction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";


export class NorthAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Nord);
    return handler.moveForward();
  }
}
