import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";
import { IMovementAction } from "./IMovementAction";

export class TurnLeftAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    return handler.turnLeft();
  }
}
