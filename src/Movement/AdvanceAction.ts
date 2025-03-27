import { IMovementAction } from "./IMovementAction";
import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";

export class AdvanceAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    return handler.moveForward();
  }
}
