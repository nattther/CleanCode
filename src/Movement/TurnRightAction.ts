import { IMovementAction } from "./IMovementAction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";

export class TurnRightAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    return handler.turnRightAction();
  }
}
