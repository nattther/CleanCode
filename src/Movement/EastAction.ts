
import { IMovementAction } from "./IMovementAction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";
import { Direction } from "./Direction";

export class EastAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Est);
    return handler.moveForward();
  }
}
