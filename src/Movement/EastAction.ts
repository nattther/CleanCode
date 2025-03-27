
import { IMovementAction } from "./IMovementAction";
import { Direction } from "./Direction";
import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";

export class EastAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Est);
    return handler.moveForward();
  }
}
