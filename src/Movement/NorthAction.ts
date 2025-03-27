import { IMovementAction } from "./IMovementAction";
import { Direction } from "./Direction";
import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";


export class NorthAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Nord);
    return handler.moveForward();
  }
}
