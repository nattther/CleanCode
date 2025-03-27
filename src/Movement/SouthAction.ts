import { IMovementAction } from "./IMovementAction";
import { Direction } from "./Direction";
import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";

export class SouthAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Sud);
    return handler.moveForward();
  }
}
