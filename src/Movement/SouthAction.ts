import { IMovementAction } from "./IMovementAction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";
import { Direction } from "./Direction";

export class SouthAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Sud);
    return handler.moveForward();
  }
}
