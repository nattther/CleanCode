import { IMovementAction } from "./IMovementAction";
import { Direction } from "./Direction";
import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";

export class WestAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Ouest);
    return handler.moveForward();
  }
}
