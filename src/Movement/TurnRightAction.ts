import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";
import { IMovementAction } from "./IMovementAction";

export class TurnRightAction implements IMovementAction {
  public execute(handler: ExplorationCommandHandler): string {
    return handler.turnRight();
  }
}
